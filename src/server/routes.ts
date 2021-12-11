import * as express from 'express';
import { channels, users } from '../shared';
import { Channel } from './db';
import {UserStatus} from "../shared/types/enums/userStatus";


const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.use('/channel/create/:channelID/:name/:participants',({params:{channelID,name,participants}},res)=>{
    const channel: Channel = {
        id:channelID,
        name,
        participants:JSON.parse(participants),
        messages:[]
    };
    channels.push(channel);
    res.status(300).json(channel);
});

router.use('/channel/:id',(req,res)=>{
    res.json(channels.find(channel=>channel.id === req.params.id));
});

router.use('/user/activeChannel/:userID/:channelID', ({params:{userID, channelID}},res)=>{
    users.find(user=> user.id === userID).activeChannel = channelID;
    res.status(200).send(true);
});

router.use('/user/:id',(req,res)=>{
    res.json(users
      .map(({name,id})=>({name,id}))
      .find(user=>user.id === req.params.id));
});

router.use('/status/:id/:status',({params:{id,status}},res)=>{
    if (![`ONLINE`,`OFFLINE`,`AWAY`].includes(status)) {
        return res.status(403).send();
    }
    const user = users
      .find(user=>user.id === id);
    if (user) {
        user.status = status as UserStatus;
        res.status(200).send();
    } else {
        res.status(404).send();
    }
});

export const createMessage = ({userID,channelID,messageID,input}:{userID: string, channelID:string, messageID:string, input:string }) =>{
    const channel = channels.find(channel=>channel.id === channelID);

    const message = {
        id:messageID,
        content:{
            text: input
        },
        owner:userID
    };

    channel.messages.push(message);
};

router.use('/input/submit/:userID/:channelID/:messageID/:input',({params:{userID,channelID,messageID,input}},res)=>{
    const user = users.find(user=>user.id === userID);

    if (!user) {
        return res.status(404).send();
    }

    createMessage({userID,channelID,messageID,input});
    res.status(300).send();
});
export default router;

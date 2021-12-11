import {Collection, fromJS} from 'immutable'
import {channels} from '../shared';

import {Channel, User} from './db';
import {FetchStatus} from "../shared/types/enums/fetchStatus";
import {IAppState} from "../shared/types/Interfaces/AppState";

export const getDefaultState = (currentUser: User): Collection<IAppState, IAppState>=>{

    const defaultState = {
        currentUser:{} as User,
        channels:[] as Channel[],
        userInfo: [] as User[],
    };

    const userChannels = channels.filter(channel=>channel.participants.includes(currentUser.id));
    const activeChannel =  Channel.getChannel(currentUser.activeChannel);
    defaultState.currentUser = currentUser;
    defaultState.channels = userChannels.map(channel=>{
        if (channel.id === activeChannel.id) {
            return { ...channel, fetchStatus:FetchStatus.FETCHED}
        } else {
            return {
                id:channel.id,
                name:channel.name,
                messages:[],
                fetchStatus: FetchStatus.NOT_FETCHED,
                participants:channel.participants
            }
        }
    });

    defaultState.userInfo = [currentUser,...activeChannel.participants.map(User.getUser), ...currentUser.contacts.map(User.getUser)].map(user=>({
        name:user.name,
        fetchStatus: FetchStatus.FETCHED,
        id:user.id,
        status:user.status
    }));

    return fromJS(defaultState) as any
};

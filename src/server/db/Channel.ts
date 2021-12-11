import { channels } from "../../shared";
import {IMessage} from "../../shared/types/Interfaces/Message";


export class Channel {
    public id: string
    public name: string
    public participants: string[]
    public messages: IMessage[]
    public static getChannel(id: string) {
        const channel = channels.find(channel=>channel.id===id);
        if (!channel) {
            throw new Error(`Could not find channel with ID ${id}`);
        }
        return channel;
    }
}

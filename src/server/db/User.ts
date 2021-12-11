import {FetchStatus} from "../../shared/types/enums/fetchStatus";
import {UserStatus} from "../../shared/types/enums/userStatus";
import { Channel } from '.';
import {users} from "../../shared";
export class User {
    public id: string
    public name: string
    public contacts?: string[]
    public fetchStatus?:  FetchStatus
    public channels?: Channel[]
    public status: UserStatus
    public activeChannel?: string
    public static getUser(id:string) {
        const user = users.find(user=>user.id===id);
        if (!user) {
            throw new Error(`Could not find user with ID ${id}`);
        }
        return user;
    }
}


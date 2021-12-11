import {Channel, User} from "../../../server/db";

export interface IAppState {
  currentUser: User,
  channels: Channel[],
  userInfo: User[],
}

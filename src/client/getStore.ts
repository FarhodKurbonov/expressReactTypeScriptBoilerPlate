import {createStore} from 'redux';
import {getDefaultState} from '../server/getDefaultState';
import {initializeDB} from "../server/db/initializeDB";
import { users } from '../shared';
import {IAppState} from "../shared/types/Interfaces/AppState";
import {Collection} from "immutable";

initializeDB();
const currentUser = users[0];
const defaultState = getDefaultState(currentUser)
console.info(defaultState)
const reducer = (state: Collection<IAppState, IAppState>) => state
const store = createStore(reducer);
export const getStore = () => store;

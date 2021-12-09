import * as express from 'express';
import apiRouter from './routes';



import {
  users
} from './db/User';

const app = express();

import { getDefaultState } from './getDefaultState'
import { initializeDB } from './db/initializeDB';

initializeDB();
const currentUser = users[0];
app.use(express.static('public'));
app.use(apiRouter);
app.use((req,res,next)=>{
  const delay = 297;
  setTimeout(next,delay);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));

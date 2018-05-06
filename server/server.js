
import {} from 'dotenv/config';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import httpErrors from 'http-errors';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import schema from './graphql/schema';
import graphiql from 'graphiql';
import Competition from './models/competition-model';
const BASE_URL = 'mongodb://localhost:27017/';

const MONGO_URL = `${BASE_URL}${process.env.TEST_DB || 'graphql'}`;
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';
const SECRET = process.env.SECRET_KEY;
console.log('value of SECRET in server;js: ', SECRET);

let app = express();
app.use(cors('*'));

const appUser = async(req) => {
  try{
    const token = req.headers.authorization;
    //add this here:  if the token is a falsey value, go to sign up page  to create user
    console.log('token in AppUser: ', token);
    const {userName, userId} = await jwt.verify(token, SECRET);
    console.log('id of user in appUser: ', userId);
    req.user = {userName, userId};
    console.log('req.user in appUser: ', req.user);
  } catch(err){
    console.log(err);
  }
  req.next();
};

app.use(appUser);
/** below, we are defining the route "./graphql" for express server.
 * Any requests to this route are fed to the graphql-express middleware "graphqlHTTP".
  */
app.use('/graphql', graphqlHTTP(req =>({
  schema,
  context:{
    secret: SECRET,
    user: req.user,
    req: req,
  },
  pretty: true,
  graphiql: true, 
  formatError: (error) => {
    console.log(
    `message:  ${error.message},
    locations: ${error.locations},
    stack: ${error.stack},
    path: ${error.path}`
    );
  }
})));

mongoose.connect(MONGO_URL);
const db = mongoose.connection;
// const competitions = db.collection('competitions');
db.on('error', () => {console.log('-------FAILED to connect to mongoose'); });
db.on('open', () => { console.log('-------CONNECTED to mongoose-----'); });


let server = app.listen(8080, () => {
  console.log(`http server listening at port  ${server.address().port}
  ----------- in ${process.env.NODE_ENV}-------------`);
});
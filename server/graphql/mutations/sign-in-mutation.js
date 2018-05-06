
import userModel from '../../models/user-model';
import UserType from '../types/user-type';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';


import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from 'graphql';

//attribution: Ben Awad https://www.youtube.com/watch?v=eu2VJ9dtwiY

const signInMutations = {
  signInUser: {
    type: GraphQLString,
    args: {
      userName: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (prevValue, {userName,password}, {secret}) => {
      console.log('entered resolve for signin');
      console.log('value of userName: ', userName);
      console.log('values of SECRET in signin: ', secret);
      const user =  await userModel.findOne({userName: userName});
        if(!user){
          throw new Error('No user with that username');
        }
        console.log('user: ', user);
        const passwordIsValid = await bcrypt.compare(password, user.password);
        console.log('passwordIsValid:  ', passwordIsValid);
        if(!passwordIsValid){
          throw new Error('Incorrect password');
        }
        const token = await jwt.sign(
          {userName: user.userName, userId: user._id},
           secret,
          {expiresIn: '180d'}
        );
        console.log('token:  ', token);
        return token;
      }
    }
  };

export {
  signInMutations,
}
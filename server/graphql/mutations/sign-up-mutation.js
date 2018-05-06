
import userModel from '../../models/user-model';
import UserType from '../types/user-type';
import bcrypt from 'bcrypt';
import crypto from 'crypto';


import {
  GraphQLSchema,
  GraphqlQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from 'graphql';

const signUpMutations = {
  createUser: {
    type: UserType,
    args: {
      userName: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      },
      nraNumber: {
        type: GraphQLInt
      },
      nraQualification: {
        type: GraphQLString
      },
      firstName: {
        type: GraphQLString
      },
      lastName: {
        type: GraphQLString
      },
      nameSuffx: {
        type:  GraphQLString
      }
    },
    resolve: async (prevValue, args, {}) => {
      const user =  await userModel.findOne({userName: args.userName});
        if(user){
          throw new Error('choose another username');
        }
      console.log('entered resolve for createUser');
      args.password = await bcrypt.hash(args.password, 12);
      console.log('password: ', args.password);
      const findHash = await crypto.randomBytes(256).toString('hex');
      console.log('findhash: ', findHash);

      return userModel.create({
          userName: args.userName, 
          password: args.password,
          findHash: findHash, 
          nraNumber: args.nraNumber, 
          nraQualification: args.nraQualification, 
          firstName: args.firstName, 
          lastName: args.lastName, 
          nameSuffix: args.nameSuffix, 
        });
      }
    }
  }

export {
  signUpMutations,
}
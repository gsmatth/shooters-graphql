import RifleType from '../types/rifle-type';
import rifleModel from '../../models/rifle-model';
import httpErrors from 'http-errors';

import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

  const rifleQueries = {

  getRifle: {
    type: RifleType,
    args: {
      rifleName: {
        type: GraphQLString
      }
    },
    resolve: async (prevValue, args, {user}) => {
      if(!user){
        throw Error('invalid user was provided');
      }
      console.log('entered getRifle');
      const rifle = await rifleModel.findOne({'rifleName': args.rifleName, userId: user.userId});
      return rifle;
    },
    }, 

  getAllRifles: {
    type: new GraphQLList(RifleType),
    resolve: async (prevValue, _ , {user}) => {
      if(!user){
        throw Error('invalid user was provided');
      }
      console.log('entered getAllRifles');
        const rifles = await rifleModel.find({userId: user.userId});
        return rifles;
      }
    }
  };

export {
  rifleQueries,
};

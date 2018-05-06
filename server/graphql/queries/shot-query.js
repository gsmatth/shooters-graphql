import MatchType from '../types/match-type';
import ShotType from '../types/shot-type';
import shotModel from '../../models/shot-model';
import httpErrors from 'http-errors';

import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLFloat,
  GraphQLBoolean
} from 'graphql';


  const shotQueries = {

  getshot: {
    type: ShotType,
    args: {
      _id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (prevValue, args, {user}) => {
      if(!user){
        throw Error('invalid user was provided');
      }
      const shot = await shotModel.findOne({'_id': args._id, userId: user.userId});
      return shot;
      }
    }, 

  getMatchShots: {
    type: new GraphQLList(ShotType),
    args: {
      matchId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (prevValue, args , {user}) => {
      if(!user){
        throw Error('invalid user was provided');
      }
      console.log('entered getMatchShots');
      const shots = await shotModel.find({'matchId': args.matchId, userId: user.userId});
      return shots;
      }
    },
 

  getBarrelShots: {
    type: new GraphQLList(ShotType),
    args: {
      barrelName: {
        type: GraphQLString
      }
    },
    resolve: async (prevValue, args, {user}) => {
      if(!user){
        throw Error('invalid user was provided');
      }
      const shots = await shotModel.find({barrelName: args.barrelName, userId: user.userId});
      return shots;
    }
  }

};


export {
  shotQueries,
};

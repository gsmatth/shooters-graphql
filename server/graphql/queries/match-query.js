import competitionModel from '../../models/competition-model';
import CompetitionType from '../types/competition-type';
import matchModel from '../../models/match-model';
import MatchType from '../types/match-type';
import httpErrors from 'http-errors';

import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';


  const matchQueries = {

  getMatch: {
    type: MatchType,
    args: {
      _id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (prevValue, args, {user}) => {
      if(!user){
        throw Error('invalid user was provided');
      }
      const match= await matchModel.findOne({'_id': args._id, userId: user.userId});
      return match;
    }
    },

  getAllMatchesByCompetitionId: {
    type: new GraphQLList(MatchType),
    args: {
      competitionId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (prevValue, args, {user}) => {
      if(!user){
        throw Error('invalid user was provided');
      }
      const matches = await matchModel.find({'competitionId': args.competitionId, userId: user.userId});
      return matches;
    }
  },

  getAllMatches: {
    type: new GraphQLList(MatchType),
    resolve: async (prevValue, _ , {user}) => {
      if(!user){
        throw Error('invalid user was provided');
      }
    console.log('entered getAllMatchs');
    const matches = await matchModel.find({userId: user.userId} );
    return matches;
    }
  }
};

export {
  matchQueries,
};

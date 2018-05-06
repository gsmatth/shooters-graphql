import CompetitionType from '../types/competition-type';
import matchModel from '../../models/match-model';
import MatchType from '../types/match-type';
import httpErrors from 'http-errors';


import {
  GraphQLSchema,
  GrpahQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';

const matchMutations = {
  createMatch: {
    type: MatchType,
    args: {
      competitionId: {
        type: new GraphQLNonNull(GraphQLID)
      },
      matchNumber: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      targetNumber: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      distanceToTarget: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      relay: {
        type: GraphQLInt
      },
      startTime: {
        type: GraphQLString
      },
      temperature: {
        type: GraphQLFloat
      },
      windClockDirection: {
        type: GraphQLInt
      },
      windSpeed: {
        type: GraphQLInt
      },
      lightClockDirection: {
        type: GraphQLInt
      },
      weather: {
        type: GraphQLString
      }
    },
    resolve: async (prevValue, args, {user}) => {
      console.log('entered resolve for createMatch');
      console.log('values of args in createMatch: ', args);
      const match = await matchModel.create({
        userId: user.userId,
        competitionId: args.competitionId, 
        matchNumber: args.matchNumber, 
        targetNumber: args.targetNumber, 
        distanceToTarget: args.distanceToTarget, 
        relay: args.distanceToTarget, 
        startTime: args.startTime, 
        temperature: args.temperature, 
        windClockDirection: args.windClockDirection, 
        windSpeed: args.windSpeed, 
        lightClockDirection: args.lightClockDirection, 
        weather: args.weather
      });
      console.log('match in createMatch: ', match);
      return match;
    }
  },
  updateMatch: {
    type: MatchType,
    args: {
      _id: {
        type: GraphQLID
      },
      competitionId: {
        type: GraphQLID
      },
      matchNumber: {
        type: GraphQLInt
      },
      targetNumber: {
        type: GraphQLInt
      },
      distanceToTarget: {
        type: GraphQLInt
      },
      relay: {
        type: GraphQLInt
      },
      startTime: {
        type: GraphQLString
      },
      temperature: {
        type: GraphQLFloat
      },
      windClockDirection: {
        type: GraphQLInt
      },
      windSpeed: {
        type: GraphQLInt
      },
      lightClockDirection: {
        type: GraphQLInt
      },
      weather: {
        type: GraphQLString
      }
    },
    resolve: async (prevValue, args, {user}) => {
      args.userId = user.userId;
      console.log('entered resolve for updateMatch');
      console.log('values of args in updateMatch: ', args);
      const match = await matchModel.findByIdAndUpdate(args._id, args, {new:true});
      console.log('match in updateMatch: ', match);
      return match;
    }
  },
  deleteMatch: {
    type: MatchType,
    args: {
      _id: {
        type: GraphQLID
      }
    },
    resolve: async (prevValue, args, {user}) => {
      console.log('entered resolve for deleteMatch');
      let match = await matchModel.findOne({_id: args._id, userId: user.userId});
      if(user.userId != match.userId){
        throw new Error('cannot remove match due to invalid user id');
      }
      console.log('values of args in deleteMatch: ', args);
      match = await matchModel.findByIdAndRemove(args._id);
      console.log('match in deleteMatch: ', match);
      return match;
    }
  }
};

export {
  matchMutations,
}
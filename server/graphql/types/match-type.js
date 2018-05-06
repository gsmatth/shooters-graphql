import {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLID, 
  GraphQLNonNull, 
  GraphQLInt,
  GraphQLList,
  GraphQLFloat} from 'graphql';
import CompetitionType from './competition-type';
import httpErrors from 'http-errors';
import ShotType from './shot-type';
import shotModel from '../../models/shot-model';
import shotQueries from '../queries/shot-query';

export default  new GraphQLObjectType({
  name: 'MatchType',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
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
    },
    competition: {
      type: CompetitionType
    },
    shots: {
      type: new GraphQLList(ShotType),
      resolve: async (MatchType, _, {user}) => {
      const shots = await shotModel.find({'matchId': MatchType._id, userId: user.userId});
      return shots;
      }
    },
  })
});
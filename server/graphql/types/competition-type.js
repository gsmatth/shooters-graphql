'use strict';

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList} from 'graphql';

import MatchType from './match-type';
import {matchQueries} from '../queries/match-query'
import matchModel from '../../models/match-model';
import {getAllMatchesByCompetitionId}  from '../queries/match-query';

export default  new GraphQLObjectType({
  name: 'CompetitionType',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    location: {
      type: new GraphQLNonNull(GraphQLString)
    },
    rifleName: {
      type: GraphQLString
    },
    action: {
      type: new GraphQLNonNull(GraphQLString)
    },
    caliber: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    dateOf: {
      type: GraphQLString
    },
    matches: {
      type: new GraphQLList(MatchType),
      resolve:  async (CompetitionType, _, {user}) => {
          const matches = await matchModel.find({'competitionId': CompetitionType._id, userId: user.userId});
          return matches;
      }
    }
  }),
});

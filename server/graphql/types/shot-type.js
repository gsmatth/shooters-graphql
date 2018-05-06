import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt, GraphQLFloat, GraphQLNonNull} from 'graphql';

export default new GraphQLObjectType({
  name: 'ShotType',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    userId: {
      type: GraphQLID
    },
    matchId: {
      type: GraphQLID
    },
    barrelName: {
      type: GraphQLString
    },
    isXValue: {
      type: GraphQLBoolean
    },
    score: {
      type: GraphQLString
    },
    dateOf: {
      type: GraphQLString
    },
    shotNumber: {
      type: GraphQLInt
    },
    // polarCoords: {type: Array},
    // cartesianCoords: {type: Array},
    elevation: {
      type: GraphQLFloat
    },
    windage: {
      type: GraphQLFloat
    },
    practice: {
      type: GraphQLBoolean
    },
    sighter: {
      type: GraphQLBoolean
    },
    record: {
      type: GraphQLBoolean
    }
   
  }
});
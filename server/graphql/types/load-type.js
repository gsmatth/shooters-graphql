import {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLID, 
  GraphQLNonNull, 
  GraphQLInt, 
  GraphQLFloat} from 'graphql';


export default  new GraphQLObjectType({
  name: 'LoadType',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    loadName: {
      type: GraphQLString
    },
    brassBrand: {
      type: GraphQLString
    },
    brassCaliber: {
      type: GraphQLInt
    },
    brassLot: {
      type: GraphQLString
    },
    powderBrand: {
      type: GraphQLString
    },
    powderName: {
      type: GraphQLString
    },
    powderWeight: {
      type: GraphQLFloat
    },
    powderLot: {
      type:GraphQLString
    },
    bulletBrand: {
      type: GraphQLString
    }, 
    bulletCaliber: {
      type: GraphQLInt
    },
    bulletWeight: {
      type: GraphQLInt
    },
    bulletLot: {
      type: GraphQLString
    },
    primerBrand: {
      type: GraphQLString
    },
    primerName: {
      type: GraphQLString
    },
    primerLot: {
      type: GraphQLString
    },
    roundOAL: {
      type: GraphQLFloat
    }
  })
});
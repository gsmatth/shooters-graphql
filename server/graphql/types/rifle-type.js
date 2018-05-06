import BarrelType from './barrel-type';
import barrelModel from '../../models/barrel-model';


import {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLID, 
  GraphQLNonNull, 
  GraphQLInt, 
  GraphQLFloat} from 'graphql';



export default  new GraphQLObjectType({
  name: 'RifleType',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    rifleName: {
      type: GraphQLString
    },
    rifleBrand: {
      type: GraphQLString
    },
    rifleModel: {
      type: GraphQLString
    },
    rifleAction: {
      type: GraphQLString
    },
    rifleCategory: {
      type: GraphQLString
    },
    barrelName: {
      type: GraphQLString
    },
    barrel: {
      type: BarrelType,
      resolve: async (RifleType, _ , {user}) => {
        const barrel = await barrelModel.findOne({userId: user.userId, barrelName: RifleType.barrelName});
        return barrel;
      }
    }
  }),
});
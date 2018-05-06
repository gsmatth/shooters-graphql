import rifleModel from '../../models/rifle-model';
import RifleType from '../types/rifle-type';
import barrelModel from '../../models/barrel-model';
import httpErrors from 'http-errors';


import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from 'graphql';

const rifleMutations = {
  createRifle: {
    type: RifleType,
    args: {
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
      }
    },
    resolve: async (prevValue, args, {user}) => {
      console.log('entered resolve for createRifle');
      console.log('values of args in createRifle: ', args);
      const barrelId = await barrelModel.findOne({userId: user.userId, barrelName: args.barrelName});
      const rifle = await rifleModel.create({
        UserId: user.userId,
        rifleName: args.rifleName,
        rifleBrand: args.rifleBrand, 
        rifleModel: args.rifleModel, 
        rifleAction: args.rifleAction, 
        rifleCategory: args.rifleCategory,
        barrelName: args.barrelName,
        barrelId: barrelId,
        userId: user.userId,
      });
      console.log('newly created rifle: ', rifle);
      return rifle;
    }
  },
  updateRifle: {
    type: RifleType,
    args: {
      _id: {
        type: GraphQLID
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
      }
    },
    resolve: async (prevValue, args, {user}) => {
      console.log('entered resolve for updateRifle');
      const barrel = await barrelModel.findOne({userId: user.userId, barrelName: args.barrelName});
      args.barrelId = barrel._id;
      args.userId = user.userId;
      const rifle = await rifleModel.findByIdAndUpdate(args._id, args, {new:true});
      console.log('newly updated rifle: ', rifle);
      return rifle;
    }
  },
  deleteRifle: {
    type: RifleType,
    args: {
      _id: {
        type: GraphQLID
      }
    },
    resolve: async (prevValue, args, {user}) => {
      console.log('entered resolve for deleteRifle');
      let rifle = await rifleModel.findOne({_id: args._id, userId: user.userId});
      if(user.userId != rifle.userId){
        throw new Error('cannot delete rifle, due to invalid user id');
      }
      rifle = await rifleModel.findByIdAndRemove(args._id);
      console.log('newly deleted rifle: ', rifle);
      return rifle;
    }
  }
};

export {
  rifleMutations,
}
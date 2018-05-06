
import LoadType from '../types/load-type';
import loadModel from '../../models/load-model';
import httpErrors from 'http-errors';


import {
  GraphQLSchema,
  GrpahQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} from 'graphql';

const loadMutations = {
  createLoad: {
    type: LoadType,
    args: {
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
        type: GraphQLString
      },
      bulletBrand: {
        type: GraphQLString
      },
      bulletCaliber: {
        type: GraphQLInt
      },
      bulletWeight: {
        type: GraphQLFloat
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
      },
    },
    resolve: async (prevValue, args, {user}) => {
      console.log('entered resolve for createload');
      console.log('value of user context in createload: ', user);
      console.log('values of args in createLoad: ', args);
      const load = loadModel.create({
        userId: user.userId,
        loadName: args.loadName,
        brassBrand: args.brassBrand, 
        brassCaliber: args.brassCaliber,
        brassLot: args.brassLot, 
        powderBrand: args.powderBrand, 
        powderName: args.powderName, 
        powderWeight: args.powderWeight,
        powderLot: args.powderLot, 
        bulletBrand: args.bulletBrand, 
        bulletCaliber: args.bulletCaliber, 
        bulletWeight: args.bulletWeight, 
        bulletLot: args.bulletLot,
        primerBrand: args.primerBrand, 
        primerName: args.primerName,
        primerLot: args.primerLot,
        roundOAL: args.roundOAL
      });
      console.log('returned load in createLoad: ', load);
      return load;
    }
  },
  updateLoad: {
    type: LoadType,
    args: {
      _id: {
        type: GraphQLID
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
        type: GraphQLString
      },
      bulletBrand: {
        type: GraphQLString
      },
      bulletCaliber: {
        type: GraphQLInt
      },
      bulletWeight: {
        type: GraphQLFloat
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
      },
    },
    resolve: async (prevValue, args, {user}) => {
      args.userId = user.userId;
      console.log('entered resolve for updateload');
      console.log('value of user context in updateload: ', user);
      console.log('values of args in updateLoad: ', args);
      const load = await loadModel.findByIdAndUpdate(args._id, args, {new:true});
      console.log('returned load in updateLoad: ', load);
      return load;
    }
  },
  deleteLoad: {
    type: LoadType,
    args: {
      _id: {
        type: GraphQLID
      }
    },
    resolve: async (prevValue, args, {user}) => {
      console.log('entered resolve for deleteload');
      let load = await loadModel.findOne({_id: args._id, userId: user.userId});
      console.log('load.userId: ', load.userId);
      console.log('user.userId: ', user.userId);
      if(user.userId != load.userId){
        throw new Error('cannot delete load, due to invalid user id');
      }
      load = await loadModel.findByIdAndRemove(args._id);
      console.log('returned load in deleteLoad: ', load);
      return load;
    }
  }
};

export {
  loadMutations,
}
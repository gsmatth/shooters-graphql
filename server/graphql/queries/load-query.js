import LoadType from '../types/load-type';
import loadModel from '../../models/load-model';
import RifleType from '../types/rifle-type';
import httpErrors from 'http-errors';

import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';


  const loadQueries = {

  getLoad: {
    type: LoadType,
    args: {
      loadName: {
        type: GraphQLString
      }
    },
    resolve: async (prevValue, args, {user}) => {
      if(!user){
        throw Error('invalid user was provided');
      }
      const load = await loadModel.findOne({'loadName': args.loadName, userId: user.userId});
      console.log('load: ', load);
      return load;
      }
    },

  getAllLoads: {
    type: new GraphQLList(LoadType),
    resolve: async (prevValue, _ , {user}) => {
      if(!user){
        throw Error('invalid user was provided');
      }
      console.log('entered getAllLoads')
      const loads = await loadModel.find({userId: user.userId});
      console.log('loads: ', loads);
      return loads;
    }
  }
}

export {
  loadQueries,
};

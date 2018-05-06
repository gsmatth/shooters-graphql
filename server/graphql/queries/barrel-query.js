import BarrelType from '../types/barrel-type';
import barrelModel from '../../models/barrel-model';
import shotModel from '../../models/shot-model';
import httpErrors from 'http-errors';

import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';


  const barrelQueries = {

  getBarrel: {
    type: BarrelType,
    args: {
      barrelName: {
        type: GraphQLString
      }
    },
    resolve: async (prevValue, args, {user}) => {
      if(!user){
        throw Error('invalid user was provided');
      }
      const barrel = await barrelModel.findOne({userId: user.userId, barrelName: args.barrelName, });
      const barrelRoundCount = await shotModel.count({userId: user.userId, barrelId: barrel._id});
      barrel.currentRoundCount = barrelRoundCount;
      return barrel;
      },
    }, 

  //dynamic round count not functioning
    getAllBarrels: {
    type: new GraphQLList(BarrelType),
    resolve: async (prevValue, _ , {user}) => {
      if(!user){
        throw Error('invalid user was provided');
      }
      let barrels = await barrelModel.find({userId: user.userId});
      // barrels = await barrels.forEach(function (element){
      //   const barrelRoundCount =  shotModel.count({userId: user.userId, barrelId: element._id});
      //   console.log('barrelRound: ', barrelRoundCount);
      //   element.currentRoundCount = barrelRoundCount;
      //   console.log('updated roundCount: ', element.currentRoundCount);
      //   });
      return barrels;
    }
  }
}

export {
  barrelQueries,
};

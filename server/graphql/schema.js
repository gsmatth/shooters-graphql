import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID
} from 'graphql';

import {competitionQueries} from './queries/competition-query';
import {competitionMutations} from './mutations/competition-mutation';
import {matchMutations} from './mutations/match-mutation';
import {matchQueries} from './queries/match-query';
import {shotQueries} from './queries/shot-query';
import {shotMutations} from './mutations/shot-mutation';
import {rifleQueries} from './queries/rifle-query';
import {rifleMutations} from './mutations/rifle-mutation';
import {barrelQueries} from './queries/barrel-query';
import {barrelMutations} from './mutations/barrel-mutation';
import {loadQueries} from './queries/load-query';
import {loadMutations} from './mutations/load-mutation';
import {signUpMutations} from './mutations/sign-up-mutation';
import {signInMutations} from './mutations/sign-in-mutation';


export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      ...competitionQueries,
      ...matchQueries,
      ...shotQueries,
      ...rifleQueries,
      ...barrelQueries,
      ...loadQueries,
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      ...competitionMutations,
      ...matchMutations,
      ...shotMutations,
      ...rifleMutations,
      ...barrelMutations,
      ...loadMutations,
      ...signUpMutations,
      ...signInMutations,
    })
  })
});

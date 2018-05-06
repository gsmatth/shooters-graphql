import axios from 'axios';
import signUpMutations from '../graphql/mutations/sign-up-mutation';
import testUtil from './testUtil';

// afterEach(() => {
//  testUtil.dropUserCollection();
// });

describe('sign-up-mutation', () =>{
  test('createUser', async () => {
      const response = await axios.post('http://localhost:8080/graphql?',
      { query: `
      mutation{
        createUser(
          userName:"bobbytest1234567890123",
          password: "password",
          nraNumber:234,
          nraQualification:"master",
          firstName: "bobby",
          lastName: "test",
        )
        {
         userName
         nraNumber
         nraQualification
         firstName
         lastName
        } 
      }
     `  
      });
      const { data } = response;
      console.log('data returned: ', data);
      expect (data).toMatchObject({
        "data": {
            "createUser": {
              "userName": "bobbytest1234567890123",
              "nraNumber": "234",
              "nraQualification": "master",
              "firstName": "bobby",
              "lastName": "test"
            }
          }
        });
  });
});
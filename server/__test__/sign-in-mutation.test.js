import axios from 'axios';

//create this user before test as mock data, you cannot use the same person you used as sign-up test.

describe('sign-in mutation', () => {
  test('signInUser', async () => {
      const response = await axios.post('http://localhost:8080/graphql?',
      { query: `
      mutation{
        signInUser(
          userName:"bobbytest1234567",
          password: "password",
      
        )
      }
     `  
      });
      // const { data } = response;
      const {data} = response;
      console.log('data  returned at sign-in: ', data);
      const test = data.data;
      console.log('parsed  data: ', test.signInUser);
      expect (data).toBeDefined();
  });
});
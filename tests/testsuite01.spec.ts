import { test, expect, request } from '@playwright/test';
import { APIHelper } from './APIHelpers';
import { generateRandomPostPayload } from './testData';
import dotenv from 'dotenv';


const BASE_URL= 'http://localhost:3000';

dotenv.config();

test.describe('Test suite backend V2', () => {
  let apiHelper: APIHelper;
  let xUserAuth;
  
  test.beforeAll(async () => {
    apiHelper = new APIHelper(BASE_URL);
  })

  test.beforeEach(async () => {

    const LOGIN_URL = 'http://localhost:3000/api/login';
  
    // Hämta inloggningsuppgifter från miljövariabler
    const loginCredentials = {
      'username': `${process.env.LOGIN_USERNAME}`, 
      'password': `${process.env.LOGIN_PASSWORD}`
    };
    console.log(loginCredentials);
  
    // Skicka inloggningsbegäran
    var context = await request.newContext();
    const response = await context.post(LOGIN_URL, {    
      data: loginCredentials,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    var json = await response.json();
      console.log(json);
    xUserAuth = {
      'x-user-auth': `{ "username": "tester01","token": "${json.token}"}`
    }
  });
//   Test case 01 - Log in
test('Test case 01 - Log in to testers hotel', async ({ request }) => {
  const LOGIN_URL = 'http://localhost:3000/api/login';
  
  // Hämta inloggningsuppgifter från miljövariabler
  //const loginCredentials = {
  //  'username': 'tester01', 
  //  'password': 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c'
 // };
 // console.log(loginCredentials);

  // Skicka inloggningsbegäran
  
  //const response = await request.post(LOGIN_URL, {    
 //   data: loginCredentials,
 //   headers: {
 //     'Content-Type': 'application/json'
 //   }
 // });

  // Kontrollera statuskod
  //expect(response.status()).toBe(200); // Kontrollera att status är 200 (OK)

  // Hämta och verifiera svaret
  //const responseBody = await response.json();
  //expect(responseBody).toHaveProperty('token'); // Kontrollera att token finns i svaret
  //expect(responseBody).toHaveProperty('username', loginCredentials.username); // Kontrollera att rätt användarnamn returneras

  // Valfritt: Använd token för att göra en annan begäran
  console.log(xUserAuth);
  const clientsResponse = await request.get(`${BASE_URL}/api/clients`, {
    headers: xUserAuth
  });

  // Kontrollera statuskod för clients-respons
  expect(clientsResponse.status()).toBe(200);
  const clientsBody = await clientsResponse.json();
  expect(Array.isArray(clientsBody)).toBe(true); // Kontrollera att svaret är en array
});
  
  
  



// Test case 01 - create room - post
//  Test case 02 get all created room -get
//  Testcase 03 - get all clients - get
//  Testcase 04 - create clients -post
//  Testcase 05 - delete client - delete
// Testcase 06 - create bill - post
//  Testcase 07 - update a bill - put
// Testcase 08 - get all reservation - get
// Testcase 09 - update a reservation - put
// Testcase 10 - delete a reservation - delete



  test('Test case 01 - Get all posts - v2', async ({ request }) => {
    const getPosts = await apiHelper.getAllPosts(request);
    expect(getPosts.ok()).toBeTruthy();
    console.log(getPosts);
  });

  test('Test case 02 - create r - v2', async ({ request }) => {
    const payload = generateRandomPostPayload();
    const createPostResponse = await apiHelper.createPost(request, payload);
    expect(createPostResponse.ok()).toBeTruthy();

    // verifying from the POST requestr
    expect(await createPostResponse.json()).toMatchObject({
      title: payload.title,
      views: payload.views
    })

    // verifying from GET request 
    const getPosts = await apiHelper.getAllPosts(request);
    expect(getPosts.ok()).toBeTruthy();
    expect(await getPosts.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: payload.title, 
          views: payload.views,
        })
      ])
    )
  });

  test('Test case 03 - Delete Post with Id - v2', async ({ request }) => {
    const getPosts = await apiHelper.getAllPosts(request);
    expect(getPosts.ok()).toBeTruthy();
    const allPosts = await getPosts.json();
    const lastButOneID = allPosts[allPosts.length - 2].id;

    //Delete request
    const deleteRequest = await apiHelper.deletePost(request, lastButOneID);
    expect(deleteRequest.ok()).toBeTruthy();

    // GET by ID and verify status as 404
    const getPostById = await apiHelper.getByID(request, lastButOneID);
    expect(getPostById.status()).toBe(404);
  });  
  test('Test case 04 - Delete Post with Id - v2', async ({ request }) => {





});
});
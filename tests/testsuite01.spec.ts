import { test, expect, request } from '@playwright/test';
import { APIHelper } from './APIHelpers';
import { generateNewRoom } from './testData';
import dotenv from 'dotenv';
require('dotenv').config();
dotenv.config();



const BASE_URL = process.env.BASE_URL;
let apiHelper: APIHelper;
let xUserAuth;
console.log(BASE_URL)


test.describe('Test suite backend V2', () => {
  // let apiHelper: APIHelper;
  // let xUserAuth;
  
  test.beforeAll(async () => {
  apiHelper = new APIHelper(BASE_URL ?? "");
  })

  test.beforeEach(async () => {

    const LOGIN_URL = `${process.env.LOGIN_URL}`;
    console.log(LOGIN_URL);
  
    // Hämta inloggningsuppgifter från miljövariabler
    const loginCredentials = {
      'username': `${process.env.LOGIN_USERNAME}`, 
      'password': `${process.env.LOGIN_PASSWORD}`
    };
    console.log('för att få',loginCredentials);
  
    // Skicka inloggningsbegäran
    const context = await request.newContext();
    const response = await context.post(LOGIN_URL, {    
      data: loginCredentials,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseBody = await response.text(); // Läs svaret som text
    // console.log(responseBody); // Logga svaret för felsökning
  
    if (!response.ok()) {
      console.error(`Login request failed with status: ${response.status()}`);
      return; // Avsluta om begäran misslyckades
    }

    const json = await response.json();
      // console.log(json);
    xUserAuth = {
      'x-user-auth': `{ "username": "tester01","token": "${json.token}"}`
    };
    
  });
//   Test case 01 - Log in
test('Test case 01 - Log in to testers hotel', async ({ request }) => {
  const clientsResponse = await request.get(`${BASE_URL}/api/clients`, {
    headers: xUserAuth
  });
});
  
//   // Hämta och verifiera svaret
//   //const responseBody = await response.json();
//   //expect(responseBody).toHaveProperty('token'); // Kontrollera att token finns i svaret
//   //expect(responseBody).toHaveProperty('username', loginCredentials.username); // Kontrollera att rätt användarnamn returneras

//   // Valfritt: Använd token för att göra en annan begäran
//   // console.log(xUserAuth);
//   // const clientsResponse = await request.get(`${process.env.BASE_URL}/api/clients`, {
//   //   headers: xUserAuth
//   // });

//   // Kontrollera statuskod för clients-respons
//   expect(clientsResponse.status()).toBe(200);
//   const clientsBody = await clientsResponse.json();
//   expect(Array.isArray(clientsBody)).toBe(true); // Kontrollera att svaret är en array
// });
  
// Test case 01 - create room - post
test('Test case 01 - Create room', async ({ request }) => {
  const roomdata = generateNewRoom();
  console.log('Room data to send:', JSON.stringify(roomdata, null, 2));
  const createRoomResponse = await request.post(`${BASE_URL}/api/room/new`,{
    headers: xUserAuth,
    data:roomdata
});
    console.log(`${BASE_URL}/api/room/new`);
    console.log(`Response status: ${createRoomResponse.status()}`);
    const responseText = await createRoomResponse.text();
    console.log(`Response body: ${responseText}`);

  // Verify that a room was added
    expect(createRoomResponse.status()).toBe(200);
    const roomBody = await createRoomResponse.json();
    console.log(roomBody);
});

test('Test case 02 - Get all roomposts - v2', async ({ request }) => {
    const clientsResponse = await request.get(`${process.env.BASE_URL}/api/rooms`, {
      headers: xUserAuth
    });
    const getPosts = await apiHelper.getAllRoomPosts(request);
    expect(clientsResponse.ok()).toBeTruthy();

    // To see the data 
    const roomData = await clientsResponse.json(); // Hämta JSON-data
    console.log(roomData);

  });
});

//  Testcase 03 - get all clients - get
//  Testcase 04 - create clients -post
//  Testcase 05 - delete client - delete
// Testcase 06 - create bill - post
//  Testcase 07 - update a bill - put
// Testcase 08 - get all reservation - get
// Testcase 09 - update a reservation - put
// Testcase 10 - delete a reservation - delete



  // test('Test case 01 - Get all roomposts - v2', async ({ request }) => {
  //   const clientsResponse = await request.get(`${process.env.BASE_URL}/api/clients`, {
  //     headers: xUserAuth
  //   });
  //   const getPosts = await apiHelper.getAllPosts(request);
  //   expect(getPosts.ok()).toBeTruthy();
  //   console.log(getPosts);
  // });

  // test('Test case 02 - create room -POST', async ({ request }) => {
  //   const room = generateNewRoom();
  //   const createPostResponse = await apiHelper.createPost(request, room);
  //   expect(createPostResponse.ok()).toBeTruthy();

  //   // verifying from the POST requestr
  //   expect(await createPostResponse.json()).toMatchObject({
  //     // title: payload.title,
  //     // views: payload.views
  //   })

  //   // verifying from GET request 
  //   const getPosts = await apiHelper.getAllPosts(request);
  //   expect(getPosts.ok()).toBeTruthy();
  //   expect(await getPosts.json()).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({
  //         // title: payload.title, 
  //         // views: payload.views,
  //       })
  //     ])
  //   )
  // });

  // test('Test case 03 - Delete Post with Id - v2', async ({ request }) => {
  //   const getPosts = await apiHelper.getAllPosts(request);
  //   expect(getPosts.ok()).toBeTruthy();
  //   const allPosts = await getPosts.json();
  //   const lastButOneID = allPosts[allPosts.length - 2].id;

  //   //Delete request
  //   const deleteRequest = await apiHelper.deletePost(request, lastButOneID);
  //   expect(deleteRequest.ok()).toBeTruthy();

  //   // GET by ID and verify status as 404
  //   const getPostById = await apiHelper.getByID(request, lastButOneID);
  //   expect(getPostById.status()).toBe(404);
  // });  
  // test('Test case 04 - Delete Post with Id - v2', async ({ request }) => {





// });


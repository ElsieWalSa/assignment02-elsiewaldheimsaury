import { test, expect, request } from '@playwright/test';
import { APIHelper } from './APIHelpers';
import { generateNewRoom, generateNewClient, generateNewBill } from './testData';
import dotenv from 'dotenv';
import { id_ID } from '@faker-js/faker';
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
    // console.log('för att få',loginCredentials);
  
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
    const roomResponse = await request.get(`${process.env.BASE_URL}/api/rooms`, {
      headers: xUserAuth
    });
    const getPosts = await apiHelper.getAllRoomPosts(request);
    expect(roomResponse.ok()).toBeTruthy();

    // To see the data 
    const roomData = await roomResponse.json(); 
    console.log(roomData);

  });
  test('Test case 03 - Get all clients -', async ({ request }) => {
   // const clientsResponse = await request.get(`${process.env.BASE_URL}/api/clients`, {
   //   headers: xUserAuth
   // });
    const getClients = await apiHelper.getAllClients(request);
    expect(getClients.ok()).toBeTruthy();

    // To see the data 
    const clientData = await getClients.json(); 
    console.log(clientData);

  });
  test('Test case 04 - Create client', async ({ request }) => {
    const clientdata = generateNewClient();
    console.log('client data to send:', JSON.stringify(clientdata, null, 2));
    const createclientResponse = await request.post(`${BASE_URL}/api/client/new`,{
      headers: xUserAuth,
      data:clientdata
  });
      console.log(`${BASE_URL}/api/client/new`);
      console.log(`Response status: ${createclientResponse.status()}`);
      const responseText = await createclientResponse.text();
      console.log(`Response body: ${responseText}`);
  
    // Verify that a client was added
      expect(createclientResponse.status()).toBe(200);
      const clientBody = await createclientResponse.json();
      console.log(clientBody);
      
  });
  test('Test case 05 - get Client with Id ', async ({ request }) => {
    const clientsResponse = await request.get(`${process.env.BASE_URL}/api/clients`, {
      headers: xUserAuth
    });
    const clientID = 2
    const getclientByID = await apiHelper.getClientByID(request,clientID);
    expect(clientsResponse.ok()).toBeTruthy();
    console.log('this is client number 2', getclientByID)
    
  });

  test('Test case 06 - Delete Client with Id ', async ({ request }) => {
    const clientsResponse = await request.get(`${process.env.BASE_URL}/api/clients`, {
      headers: xUserAuth
    });

    const getClients = await apiHelper.getAllClients(request);
    expect(clientsResponse.ok()).toBeTruthy();

    // To see the data 
    const clientData = await clientsResponse.json(); 
    console.log(clientData);

    // See if there a more than 2 clients
    if (clientData.length >= 2) {
      const lastButOneID = clientData[clientData.length - 2].id;

      // Sen delete to erase the second but last client
      const deleteRequest = await apiHelper.deleteClient(request, lastButOneID, xUserAuth.token);
      console.log('denna tar jag bort',deleteRequest);
      expect(deleteRequest.ok()).toBeTruthy();
      console.log(`Deleted client with ID: ${lastButOneID}`);

      const getClientById = await apiHelper.getClientByID(request, lastButOneID);
      expect(getClientById.status()).toBe(404); // Kontrollera att klienten inte längre finns
  } else {
      console.log('Det finns inte tillräckligt många klienter att radera.');
  }

    

    
  
      // const getClients = await apiHelper.getAllClients(request);
      // expect(clientsResponse.ok()).toBeTruthy();

      // console.log(`Response status: ${clientsResponse.status()}`);
      // console.log(getClients);
      
      
      
      
    //   const allClients = await getClients.json();
    //   console.log(allClients);
    //   const lastButOneID = allClients[allClients.length - 2].id;
  
    //  // Delete request
    //   const deleteRequest = await apiHelper.deleteClient(request, lastButOneID);
    //   expect(deleteRequest.ok()).toBeTruthy();
  
    // //   // GET by ID and verify status as 404
    //   const getClientById = await apiHelper.getClientByID(request, lastButOneID);
    //   expect(getClientById.status()).toBe(404);
});

// Testcase 06 - create bill - post
test('Test case 06 - Create bills', async ({ request }) => {
  const billdata = generateNewBill();
  console.log('client data to send:', JSON.stringify(billdata, null, 2));
  const createbillResponse = await request.post(`${BASE_URL}/api/bill/new`,{
    headers: xUserAuth,
    data:billdata
});
    console.log(`${BASE_URL}/api/bill/new`);
    console.log(`Response status: ${createbillResponse.status()}`);
    const responseText = await createbillResponse.text();
    console.log(`Response body: ${responseText}`);

  // Verify that a client was added
    expect(createbillResponse.status()).toBe(200);
    const clientBill = await createbillResponse.json();
    console.log(clientBill);

})




//  Testcase 07 - update a bill - put
// Testcase 08 - get all reservation - get
test('Test case 03 - Get reservation -', async ({ request }) => {
  const clientsResponse = await request.get(`${process.env.BASE_URL}/api/reservations`, {
    headers: xUserAuth
  });
  const getReservations = await apiHelper.getAllClients(request);
  expect(clientsResponse.ok()).toBeTruthy();

  // To see the data 
  const clientData = await clientsResponse.json(); 
  console.log(clientData);

});


// Testcase 09 - update a reservation - put
// Testcase 10 - delete a reservation - delete



});



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


import { test, expect, APIRequest } from '@playwright/test';
import { generateID, generateNewCar, generateNewCustomer, updateCustomer, updateCar } from './testData';
import { APIHelper } from './APIHelpers';
import dotenv from 'dotenv';

require('dotenv').config();
dotenv.config();

let apiHelper: APIHelper;

test.describe('Test suite with API', () => {

  });

  test.beforeEach(async () => {
    apiHelper = new APIHelper(); 
});

  test('Test case 01 - Get all cars', async ({ request }) => {
    const getallcars = await apiHelper.getallCarsV1(request)

    expect (getallcars.status()).toBe(200);

    // to see all the cars
    const allCars = await getallcars.json();
    console.log(allCars);
  }); 

    test('Test case 02 - Get all orders', async ({ request }) => {
      const getallorders = await apiHelper.getallOrdersV1(request)
      expect (getallorders.status()).toBe(200);

      const allorders = await getallorders.json();
      console.log(allorders);
  
});
test('Test case 03 - Put -uppdate customer', async ({ request }) => {
  // Get all customers 
  const createCustomerPutResponse = await apiHelper.getallCustomersV1(request)
      expect (createCustomerPutResponse.status()).toBe(200);
      const allorders = await createCustomerPutResponse.json();
      console.log(allorders);

      // Get the second first customer
        const secondFirstID = allorders[2].id;
        console.log(secondFirstID);

  //  Update second first customer
      const putcustomer = await apiHelper.putCustomerV1(request, secondFirstID);
      console.log(putcustomer);
      expect(putcustomer.status()).toBe(200);
      const seeallcustomer = putcustomer.json();
      console.log(seeallcustomer);
   
});
test('Test case 04 - Get all customers', async ({ request }) => {
  const getallcustomer = await apiHelper.getallCustomersV1(request)
      expect (getallcustomer.status()).toBe(200);

      const allorders = await getallcustomer.json();
      console.log(allorders);
   
});
test('Test case 05 - Delete- Create and delete customer', async ({ request }) => {
  const createCustomerResponse = await apiHelper.getallCustomersV1(request)
  expect (createCustomerResponse.status()).toBe(200);

  const customers = (await createCustomerResponse.json());
  const lastButOneID =customers[customers.length - 2].id;
  console.log(lastButOneID);

  // delete request
  const deletecustomer = await apiHelper.deleteCustomerV1(request, lastButOneID);
  console.log(deletecustomer);
  expect(deletecustomer.ok()).toBeTruthy(); 

  // Check that customer has been remowed
  const createCustomerResponse2 = await apiHelper.getallCustomersV1(request)
  const customers2 = (await createCustomerResponse2.json());

  const customerExists = customers2.some((x) => x.id === lastButOneID);
  expect(customerExists).toBeFalsy();
    
});

test('Test case 06 - post -create car', async ({ request }) => {
  const cardata = generateNewCar();
  const createCarResponse = await apiHelper.postAddCarsV1(request,cardata)
  expect (createCarResponse.status()).toBe(201);
     
});
test('Test case 07 - Delete create and cancel orders ', async ({ request }) => {
  const createOrdersResponse = await apiHelper.getallOrdersV1(request)
  expect(createOrdersResponse.status()).toBe(200);

  const orders = (await createOrdersResponse.json());
  const lastButOneID =orders[orders.length-2].id
  console.log(lastButOneID);

  // delete request
  const deleteorders = await apiHelper.deleteCarV1(request, lastButOneID);
  console.log(deleteorders);
  expect (deleteorders.ok()).toBeTruthy();

  // Check that order has been removed
  const createOrdersResponse2 = await apiHelper.getallCarsV1(request)
  const orders2 = (await createOrdersResponse2.json());

  const orderExists = orders2.some((x) => x.id === lastButOneID);
  expect(orderExists).toBeFalsy();
    
});
test('Test case 08 - post -add customer ', async ({ request }) => {
  const customerdata = generateNewCustomer();
  const createCustomerResponse3 = await apiHelper.postAddCustomerV1(request,customerdata)
  expect (createCustomerResponse3.status()).toBe(201)
    
});
test('Test case 09 - Get -customers can see which car is not booked ', async ({ request }) => {
  const getallcustomerscars = await apiHelper.getallCustomersCarsV1(request)
  expect (getallcustomerscars.status()).toBe(200);

  const allorders = await getallcustomerscars.json();
  console.log(allorders);
   
  
});
test('Test case 10 - Put- update car', async ({ request }) => {
  // Get all cars 
  const createCarPutResponse = await apiHelper.getallCarsV1(request)
      expect (createCarPutResponse.status()).toBe(200);
      const carorders = await createCarPutResponse.json();
      console.log(carorders);

      // Get the second first car
        const secondFirstID = carorders[2].id;
        console.log(secondFirstID);

  //  Update second first car
      const putcar = await apiHelper.putupdatecarV1(request, secondFirstID);
      console.log(putcar);
      expect(putcar.status()).toBe(200);
      const seeallcars = putcar.json();
      console.log(seeallcars);
   
  
});
  

import { APIRequestContext } from "@playwright/test";
import { generateNewCar, generateNewCustomer, updateCustomer, updateCar } from "./testData";
import dotenv from 'dotenv';

dotenv.config();

export class APIHelper{
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.BASE_URL ?? "";
    }
    // GET ALL CARS
    async getallCarsV1(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/allcars`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    }
    // GET ALL ORDERS
    async getallOrdersV1(request: APIRequestContext) {
    const response = await request.get(`${this.baseUrl}/orders`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response;
}
// GET ALL CUSTOMERS
    async getallCustomersV1(request: APIRequestContext) {
    const response = await request.get(`${this.baseUrl}/customers`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response;
}
// GET CUSTOMERS CARS
async getallCustomersCarsV1(request: APIRequestContext) {
    const response = await request.get(`${this.baseUrl}/cars`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response;
}
// ADD CUSTOMER
async postAddCustomerV1(request: APIRequestContext, generateNewCustomer) {
    console.log(generateNewCustomer);
    const response = await request.post(`${this.baseUrl}/addcustomer`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: generateNewCustomer  
    });
    return response;
}
// ADD CARS
async postAddCarsV1(request: APIRequestContext, generateNewCar) {
    console.log(generateNewCar);
    const response = await request.post(`${this.baseUrl}/addcar`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: generateNewCar 
    });
    return response;
}
// DELETE CUSTOMER BY ID
async deleteCustomerV1(request: APIRequestContext, generateID) {
    
    const response = await request.delete(`${this.baseUrl}/deletecustomer`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: { 'id' : generateID } 
    });
    return response;
}
// PUT UPDATE CUSTOMER
async putCustomerV1(request: APIRequestContext, updateCustomerId) {
    var data = updateCustomer(updateCustomerId);
    console.log(data);
    const response = await request.put(`${this.baseUrl}/updatecustomer`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: data  
    });

    return response;
}
// POST MY ORDER
async postMyOrdersV1(request: APIRequestContext, generateID) {
    console.log(generateID);
    const response = await request.post(`${this.baseUrl}/myorders`, {
        headers: {
            'Content-Type': 'application/json',  
        },
        data: { 'id' : generateID }  
    });
    return response;
}
// UPDATE CAR
async putupdatecarV1(request: APIRequestContext, updateCarId) {
    var data = updateCar(updateCarId);
    console.log(data);
    const response = await request.put(`${this.baseUrl}/updatecar`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: data   
    });
    return response;
}
// DELETE CAR BY ID
async deleteCarV1(request: APIRequestContext, generateID) {  
    const response = await request.delete(`${this.baseUrl}/deletecar`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: { 'id' : generateID }   
    });
    return response;
}
}

import { APIRequestContext } from "@playwright/test";
import { generateNewRoom } from "./testData";

export class APIHelper{
    private baseUrl: string;

    constructor(baseUrl: string){
        this.baseUrl = baseUrl;
    }

    // localhost:3000/posts/{ID}
    //POST, GET, PUT, DELETE
    // GET ALL ROOMS
    async getAllRoomPosts(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/rooms`);
        return response;
    }

    // async getByID(request: APIRequestContext, postId: number) {
    //     const response = await request.get(`${this.baseUrl}/posts/${postId}`);
    //     return response;
    // }

    // CREATE ROOM
    async createPost(request: APIRequestContext, generateNewRoom: object) {
        const response = await request.post(`${this.baseUrl}/room/new`, {
            headers: {
                'Content-Type': 'application/json', 
            },
            data: generateNewRoom 
        });
    
        // To see that it is correct
        console.log(`Response status: ${response.status()}`);
        const responseBody = await response.json(); 
        return response;
    }
        // Get all rooms
    async getAllRooms(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/rooms`);
        return response;
    }

    // CREATE CLIENT
    async createClient(request: APIRequestContext, generateNewClient: object) {
        const response = await request.post(`${this.baseUrl}/client/new`, {
            headers: {
                'Content-Type': 'application/json', 
            },
            data: generateNewClient 
        });
    
        // To see that it is correct
        console.log(`Response status: ${response.status()}`);
        const responseBody = await response.json(); 
        return response;
    }
        // GET ALL CLIENTS
    async getAllClients(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/clients`);
        return response;
    }

        // GET CLIENT BY ID
    async getClientByID(request: APIRequestContext, id: number, token: string) {
        const response = await request.get(`${this.baseUrl}/clients/${id}`, {
            headers: {
                'x-user-auth': `{ "username": "tester01","token": "${token}"}`,
                'Content-Type': 'application/json', 
            },
                    
        });
        if (!response.ok()) {
            console.log(`Error: ${response.status()} - ${response.statusText()}`);
            throw new Error(`Failed to fetch client by ID: ${response.status()}`);
        }
        const clientData = await response.json();
        return clientData;

    }

    // DELETE CLIENT
    async deleteClient(request: APIRequestContext, id: number, token: string, ){
        const response = await request.delete(`${this.baseUrl}/clients/${id}`, {
            headers: {
                'x-user-auth': `{ "username": "tester01","token": "${token}"}`,
                'Content-Type': 'application/json', 
    
            },
                    
        });

        console.log(`DELETE Response status: ${response.status()}`);
        const responseText = await response.text();
        console.log(`DELETE Response body: ${responseText}`);
        
        return response;
      
    }
    // CREATE BILL
    async createbill(request: APIRequestContext, generateNewBill: object) {
        const response = await request.post(`${this.baseUrl}/bill/new`, {
            headers: {
                'Content-Type': 'application/json', 
            },
            data: generateNewBill 
        });
    
        // To see that it is correct
        console.log(`Response status: ${response.status()}`);
        const responseBody = await response.json(); 
        return response;

    }
       // GET ALL CLIENTS
       async getReservations(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/reservations`);
        return response;
    }


}




//  Testcase 07 - update a bill - put
// Testcase 08 - get all reservation - get
// Testcase 09 - update a reservation - put
// Testcase 10 - delete a reservation - delete
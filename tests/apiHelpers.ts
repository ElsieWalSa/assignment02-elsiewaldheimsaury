import { APIRequestContext } from "@playwright/test";
import { generateNewRoom } from "./testData";

export class APIHelper{
    private baseUrl: string;

    constructor(baseUrl: string){
        this.baseUrl = baseUrl;
    }

    // localhost:3000/posts/{ID}
    //POST, GET, PUT, DELETE
    async getAllRoomPosts(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/rooms`);
        return response;
    }

    async getByID(request: APIRequestContext, postId: number) {
        const response = await request.get(`${this.baseUrl}/posts/${postId}`);
        return response;
    }

    async createPost(request: APIRequestContext, generateNewRoom: object) {
        const response = await request.post(`${this.baseUrl}/room/new`, {
            headers: {
                'Content-Type': 'application/json', 
            },
            data: generateNewRoom // Skicka data direkt som objekt
        });
    
        // Logga svarstatus och text för felsökning
        console.log(`Response status: ${response.status()}`);
        const responseBody = await response.json(); // Hämta JSON-svar
        console.log(responseBody); // Logga svaret för mer information
    
        // Returnera svaret för vidare användning
        return response;

    }


    async deletePost(request: APIRequestContext, postId: number){
        const response = await request.delete(`${this.baseUrl}/posts/${postId}`);
        return response;
    }

}
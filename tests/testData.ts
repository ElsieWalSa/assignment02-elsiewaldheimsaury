import { faker } from "@faker-js/faker";
import { features } from "process";

export const generateNewCar= () => {
    return {
        carpriceperday: faker.number.int({min:249, max:10000}),
        carmodel : faker.vehicle.model(), 
        carfabric : faker.vehicle.type(),
        carregestrationNumber : faker.vehicle.vrm(),
        carisbooked : faker.datatype.boolean(0.5),
    }
}
export const generateNewCustomer= () => {
    return {
        customerusername: faker.internet.userName(),
        customerufullname: faker.person.fullName(),
        customeradress: faker.location.streetAddress(),
        customeremail: faker.internet.email(),
        customerphonenumber:generateTelephoneNumber(),
    };
}
export function generateTelephoneNumber() {
    const areaCode = '07' + faker.string.numeric(1); // Generats the first bit of a swedish phonenumber 070, 073, 076, etc.
    const firstPart = faker.string.numeric(3);       // First bit for example 123
    const secondPart = faker.string.numeric(2);      // Second bit for example 45
    const thirdPart = faker.string.numeric(2);      // Third bit for example 67

    return `${areaCode}-${firstPart} ${secondPart} ${thirdPart}`;
    }

    export const generateID = () => {
        return {
        Idvalue: faker.number.int({ min: 1, max: 10}),
        
        };
    }

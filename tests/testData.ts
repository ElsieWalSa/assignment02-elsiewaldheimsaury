import { faker } from "@faker-js/faker";
import { features } from "process";

export const generateNewRoom = () => {
    return {
        category: faker.helpers.arrayElement(['Double', 'Single', 'Twin']),
        floor:faker.number.int({ min: 1, max: 5 }),
        number: faker.number.int({ min: 1, max: 10 }),
        available: faker.datatype.boolean(0.5),
        price: faker.number.int({min:100, max:10000}),
        features:faker.helpers.arrayElements(['Balcony', 'Ensuite', 'Sea View', 'Penthouse'])
    }
}
export const generateNewClient = () => {
    return {
        clientname: faker.person.fullName(),
        clientemail: faker.internet.email(),
        clientphonenumber:generateTelephoneNumber(),
    };
}
export function generateTelephoneNumber() {
    const areaCode = '07' + faker.string.numeric(1); // Generats the first bit of a swedish phonenumber 070, 073, 076, etc.
    const firstPart = faker.string.numeric(3);       // First bit for example 123
    const secondPart = faker.string.numeric(2);      // Second bit for example 45
    const thirdPart = faker.string.numeric(2);      // Third bit for example 67

    return `${areaCode}-${firstPart} ${secondPart} ${thirdPart}`;
    }

    export const generateNewBill = () => {
        return {
            clientname: faker.person.fullName(),
            clientemail: faker.internet.email(),
            clientphonenumber:generateTelephoneNumber(),
        };
        }

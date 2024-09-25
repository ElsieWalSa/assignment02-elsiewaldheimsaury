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
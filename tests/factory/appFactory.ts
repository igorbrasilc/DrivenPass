import { faker } from '@faker-js/faker';
import { CreateUserInput } from '../../src/interfaces/userTypes.js';
import { CreateUserData } from '../../src/interfaces/userTypes';

export function createUser(random: boolean = false) {
    return random
        ? <CreateUserInput> {
            email: faker.internet.email(),
            password: 'igor123456789',
            confirmPassword: 'igor123456789',
        }
        : <CreateUserInput> {
            email: 'igor@igor.com',
            password: 'igor123456789',
            confirmPassword: 'igor123456789',
        };
}

export function createUserWrongSchema() {
    return <CreateUserInput> {
        email: 'igor@igor.com',
        password: 'igor',
        confirmPassword: 'igor123456789',
    };
}

export function loginUser(random: boolean = false) {
    return random
        ? <CreateUserData> {
            email: faker.internet.email(),
            password: 'igor123456789',
        }
        : <CreateUserData> {
            email: 'igor@igor.com',
            password: 'igor123456789',
        };
}

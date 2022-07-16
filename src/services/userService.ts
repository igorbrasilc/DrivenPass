import { CreateUserData, CreateUserInput } from "../interfaces/userTypes.js"
import * as utils from '../utils/userUtils.js';
import * as repository from '../repositories/userRepository.js';
import AppError from "../config/error.js";

export async function checkIfEmailAlreadyExists(email: string, intention: 'toSignUp' | 'toSignIn') {
    const user = await repository.findByEmail(email);

    if (intention === 'toSignUp') {
        if (user) {
            throw new AppError('User already exists', 409, 'User already exists', 'This email is already taken');
        }
    }

    if (intention === 'toSignIn') {
        if (!user) {
            throw new AppError('User not found', 404, 'User not found', 'This email is not registered yet');
        }

        return user;
    }
}

export async function signUp(userData: CreateUserData) {
    await checkIfEmailAlreadyExists(userData.email, 'toSignUp');
    const hashedPassword = utils.hashPassword(userData.password);
    const objData = {
        email: userData.email,
        password: hashedPassword
    };
    await repository.createUser(objData);
    return;
}

export async function signIn(userInput: CreateUserData) {
    const userDb = await checkIfEmailAlreadyExists(userInput.email, 'toSignIn');
    await utils.unhashAndComparePasswords(userInput.password, userDb.password);
    const token = utils.generateToken(userDb);
    return token;
}
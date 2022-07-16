import joi from 'joi';
import { CreateUserData, CreateUserInput } from '../interfaces/userTypes.js';

export const signUp = joi.object<CreateUserInput>({
    email: joi.string().email().required(),
    password: joi.string().min(10).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
})

export const signIn = joi.object<CreateUserData>({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
});

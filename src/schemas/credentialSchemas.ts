import joi from 'joi';
import { CreateCredentialInput } from '../interfaces/credentialTypes.js';

export const credentialSchema = joi.object<CreateCredentialInput>({
    url: joi.string().uri().required(),
    password: joi.string().required(),
    username: joi.string().required(),
    title: joi.string().required()
});
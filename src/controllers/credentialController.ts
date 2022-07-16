import { User } from '.prisma/client';
import { Request, Response } from 'express';
import AppLog from '../events/AppLog.js';
import { CreateCredentialInput, CredentialAndUser } from '../interfaces/credentialTypes.js';
import * as services from '../services/credentialService.js';

export async function createCredential(req: Request, res: Response) {
    const user = res.locals.user as User;
    const credentialInput = req.body as CreateCredentialInput;
    const credentialAndUser = {...credentialInput, userId: user.id} as CredentialAndUser;
    await services.createCredential(credentialAndUser);
    AppLog('Controller', 'Credential created');
    res.status(201).send('Credential created!');
}
import { User } from '.prisma/client';
import { Request, Response } from 'express';
import AppLog from '../events/AppLog.js';
import { CardAndUser, CardPartial, CardPartialInput } from '../interfaces/cardTypes.js';
import * as services from '../services/cardService.js';

export async function createCard(req: Request, res: Response) {
    const user = res.locals.user as User;
    const cardInput = req.body as CardPartialInput;
    const cardAndUser = { ...cardInput, userId: user.id };
    await services.createCard(cardAndUser);
    AppLog('Controller', 'Card created');
    res.status(201).send('Card created!');
}

// export async function getCredentials(req: Request, res: Response) {
//     const user = res.locals.user as User;
//     const userCredentials = await services.getCredentials(user.id);
//     res.status(200).send(userCredentials);
// }

// export async function getCredentialById(req: Request, res: Response) {
//     const user = res.locals.user as User;
//     const { id: credentialId } = req.params;
//     const userCredential = await services.getCredentialById(user.id, Number(credentialId));
//     res.status(200).send(userCredential);
// }

// export async function deleteCredentialById(req: Request, res: Response) {
//     const user = res.locals.user as User;
//     const { id: credentialId } = req.params;
//     await services.deleteCredentialById(user.id, Number(credentialId));
//     res.sendStatus(200);
// }

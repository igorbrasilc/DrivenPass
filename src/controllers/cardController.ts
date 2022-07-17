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

export async function getCards(req: Request, res: Response) {
    const user = res.locals.user as User;
    const cards = await services.getCards(user.id);
    res.status(200).send(cards);
}

export async function getCardById(req: Request, res: Response) {
    const user = res.locals.user as User;
    const { id: cardId } = req.params;
    const userCard = await services.getCardById(user.id, Number(cardId));
    res.status(200).send(userCard);
}

export async function deleteCardById(req: Request, res: Response) {
    const user = res.locals.user as User;
    const { id: cardId } = req.params;
    await services.deleteCardById(user.id, Number(cardId));
    res.sendStatus(200);
}

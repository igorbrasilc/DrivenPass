import { Card, CardType } from '.prisma/client';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import * as repository from '../repositories/cardRepository.js';
import * as credentialUtils from '../utils/credentialUtils.js';
import AppLog from '../events/AppLog.js';
import AppError from '../config/error.js';
import { CardAndUser, CardCorrected } from '../interfaces/cardTypes.js';

dayjs.extend(customParseFormat);

export async function findCardType(type: 'debit' | 'credit' | 'both') {
    const cardType: CardType = await repository.findCardType(type);
    if (!cardType) {
        throw new AppError(
            'Type not found',
            404,
            'Type not found',
            'This type isnt found yet, it has to be credit, debit or both, if you put one of this in and still has this error, the database has to include the type',
        );
    }
    return cardType;
}

export async function createCard(data: CardAndUser) {
    const encryptedPassword = await credentialUtils.encryptPassword(data.password);
    const encryptedCVC = await credentialUtils.encryptPassword(data.CVC.toString());
    const cardType = await findCardType(data.cardType);
    AppLog('Service', 'Card type found');
    const objData: CardCorrected = {
        title: data.title,
        number: Number(data.number),
        username: data.username,
        CVC: encryptedCVC,
        expirationDate: dayjs(data.expirationDate, 'MM/YY', true).toDate(),
        password: encryptedPassword,
        isVirtual: data.isVirtual.toString() === 'true',
        cardTypeId: cardType.id,
        userId: data.userId,
    };
    await repository.createCard(objData);
    AppLog('Service', 'Card created in db');
}

export async function decryptCards(cards: Card[]) {
    return cards.forEach(
        async (card) => {
            card.password = await credentialUtils.decryptPassword(card.password);
            card.CVC = await credentialUtils.decryptPassword(card.CVC);
        },
    );
}

export async function getCards(userId: number) {
    const cards: Card[] = await repository.getCards(userId);
    await decryptCards(cards);
    AppLog('Service', 'Cards retrieved');
    return cards;
}

export async function getCardById(userId: number, cardId: number) {
    const card: Card = await repository.getCardById(userId, cardId);
    card.password = await credentialUtils.decryptPassword(card.password);
    card.CVC = await credentialUtils.decryptPassword(card.CVC);
    AppLog('Service', 'Card retrieved by id');
    return card;
}

export async function deleteCardById(userId: number, cardId: number) {
    const deletion = await repository.deleteCardById(userId, cardId);
    if (deletion.count === 0) {
        throw new AppError(
            'Not found card',
            404,
            'Not found card',
            'The card you requested doesnt exist or doesnt belong to this user',
        );
    }
    AppLog('Service', 'card deleted');
}

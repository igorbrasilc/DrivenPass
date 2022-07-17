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

export async function getCards(userId: number) {
    const cards: Partial<Card>[] = await repository.getCards(userId);
    AppLog('Service', 'Cards retrieved');
    return cards;
}

// export async function getCredentialById(userId: number, credentialId: number) {
//     const credential: Partial<Credential> = await repository.getCredentialById(userId, credentialId);
//     AppLog('Service', 'Credential retrieved by id');
//     return credential;
// }

// export async function deleteCredentialById(userId: number, credentialId: number) {
//     const deletion = await repository.deleteCredentialById(userId, credentialId);
//     if (deletion.count === 0) {
//         throw new AppError(
//             'Not found credential',
//             404,
//             'Not found credential',
//             'The credential you requested doesnt exist or doesnt belong to this user',
//         );
//     }
//     AppLog('Service', 'Credential deleted');
// }

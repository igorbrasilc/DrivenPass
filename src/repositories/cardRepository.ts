import prisma from '../config/database.js';
import { CardAndUser, CardCorrected } from '../interfaces/cardTypes.js';

export async function createCard(cardData: CardCorrected) {
    await prisma.card.create({ data: cardData });
}

export async function findCardType(type: 'credit' | 'debit' | 'both') {
    return prisma.cardType.findUnique({ where: { type } });
}

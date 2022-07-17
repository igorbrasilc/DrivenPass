import prisma from '../config/database.js';
import { CardCorrected } from '../interfaces/cardTypes.js';

export async function createCard(cardData: CardCorrected) {
    await prisma.card.create({ data: cardData });
}

export async function findCardType(type: 'credit' | 'debit' | 'both') {
    return prisma.cardType.findUnique({ where: { type } });
}

export async function getCards(userId: number) {
    return prisma.card.findMany({ where: { userId } });
}

export async function getCardById(userId: number, cardId: number) {
    return prisma.card.findFirstOrThrow({ where: { id: cardId, userId } });
}

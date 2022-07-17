import { Credential } from '.prisma/client';
import prisma from '../config/database.js';
import { CreateCredentialData, CredentialAndUser } from '../interfaces/credentialTypes.js';

export async function createCredential(credentialData: CreateCredentialData) {
    return await prisma.credential.create({data: credentialData});
}

export async function getCredentials(userId: number) {
    return await prisma.credential.findMany({where: {userId}, select: {
        id: true,
        title: true,
        url: true,
        username: true,
        userId: true,
        createdAt: true,
        updatedAt: true
    }});
}

export async function getCredentialById(userId: number, credentialId: number) {
    return await prisma.credential.findFirstOrThrow({where: {userId, id: credentialId}, select: {
        id: true,
        title: true,
        url: true,
        username: true,
        userId: true,
        createdAt: true,
        updatedAt: true
    }});
}

export async function deleteCredentialById(userId: number, credentialId: number) {
    const deletion = await prisma.credential.deleteMany({where: {
        AND: [
            { userId },
            { id: credentialId}
        ]
    }});
    return deletion;
}
import prisma from '../config/database.js';
import { CreateCredentialData } from '../interfaces/credentialTypes.js';

export async function createCredential(credentialData: CreateCredentialData) {
    return prisma.credential.create({ data: credentialData });
}

export async function getCredentials(userId: number) {
    return prisma.credential.findMany({ where: { userId } });
}

export async function getCredentialById(userId: number, credentialId: number) {
    return prisma.credential.findFirstOrThrow({ where: { userId, id: credentialId } });
}

export async function deleteCredentialById(userId: number, credentialId: number) {
    const deletion = await prisma.credential.deleteMany({
        where: {
            AND: [
                { userId },
                { id: credentialId },
            ],
        },
    });
    return deletion;
}

import prisma from '../config/database.js';
import { CreateCredentialData, CredentialAndUser } from '../interfaces/credentialTypes.js';

export async function createCredential(credentialData: CreateCredentialData) {
    return await prisma.credential.create({data: credentialData});
}
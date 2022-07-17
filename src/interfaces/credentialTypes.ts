import { Credential } from '.prisma/client';

export type CreateCredentialInput = Omit<Credential, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;

export type CreateCredentialData = Omit<Credential, 'id' | 'createdAt' | 'updatedAt'>;

export type CredentialAndUser = CreateCredentialInput & {
    userId: number;
};

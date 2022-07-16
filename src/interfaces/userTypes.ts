import { User } from '.prisma/client';

export type CreateUserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type CreateUserInput = CreateUserData & {
    confirmPassword: string
};

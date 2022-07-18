import { Wifi } from '.prisma/client';

export type WifiInput = Omit<
Wifi,
    'id' |
    'createdAt' |
    'updatedAt' |
    'userId'
>;

export type WifiInputAndUser = WifiInput & {
    userId: number;
};

import { SafeNote } from '.prisma/client';

export type SafeNotePartial = Partial<SafeNote>;

export type CreateNoteData = SafeNotePartial & { userId: number };

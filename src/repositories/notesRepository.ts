import prisma from '../config/database.js';
import { CreateNoteData } from '../interfaces/notesTypes.js';

export async function createSafeNote(data: CreateNoteData) {
    const dataCreation = {
        title: data.title,
        note: data.note,
        userId: data.userId,
    };
    return prisma.safeNote.create({ data: dataCreation });
}

export async function getSafeNotes(userId: number) {
    return prisma.safeNote.findMany({ where: { userId } });
}

export async function getSafeNoteById(userId: number, noteId: number) {
    return prisma.safeNote.findFirstOrThrow({ where: { userId, id: noteId } });
}

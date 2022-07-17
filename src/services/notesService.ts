import AppError from '../config/error.js';
import AppLog from '../events/AppLog.js';
import { CreateNoteData, SafeNotePartial } from '../interfaces/notesTypes.js';
import * as repository from '../repositories/notesRepository.js';

export async function createSafeNote(data: SafeNotePartial, userId: number) {
    const objData : CreateNoteData = { ...data, userId };
    await repository.createSafeNote(objData);
    AppLog('Service', 'Created safe note');
}

export async function getSafeNotes(userId: number) {
    const safeNotes = await repository.getSafeNotes(userId);
    AppLog('Service', 'Safe notes retrieved');
    return safeNotes;
}

export async function getSafeNoteById(userId: number, noteId: number) {
    const safeNote = await repository.getSafeNoteById(userId, noteId);
    AppLog('Service', 'Safe note retrieved by id');
    return safeNote;
}

export async function deleteNoteById(userId: number, noteId: number) {
    const deletion = await repository.deleteNoteById(userId, noteId);
    if (deletion.count === 0) {
        throw new AppError(
            'Note not found',
            404,
            'Note not found',
            'Note doesnt exist or belongs to a different user',
        );
    }
    AppLog('Service', 'Safe deleted by id');
}

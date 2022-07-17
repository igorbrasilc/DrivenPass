import AppLog from '../events/AppLog.js';
import { CreateNoteData, SafeNotePartial } from '../interfaces/notesTypes.js';
import * as repository from '../repositories/notesRepository.js';

export async function createSafeNote(data: SafeNotePartial, userId: number) {
    const objData : CreateNoteData = { ...data, userId };
    await repository.createSafeNote(objData);
    AppLog('Service', 'Created safe note');
}

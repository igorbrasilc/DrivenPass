import joi from 'joi';
import { SafeNotePartial } from '../interfaces/notesTypes.js';

export const noteSchema = joi.object<SafeNotePartial>({
    title: joi.string().max(50).required(),
    note: joi.string().max(1000).required(),
});

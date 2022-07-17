import { User } from '.prisma/client';
import { Request, Response } from 'express';
import { SafeNotePartial } from '../interfaces/notesTypes.js';
import * as services from '../services/notesService.js';

export async function createSafeNote(req: Request, res: Response) {
    const user = res.locals.user as User;
    const dataInput = req.body as SafeNotePartial;
    await services.createSafeNote(dataInput, user.id);
    res.status(201).send('Safe note created');
}

export async function temporary(req: Request, res: Response) {
    return null;
}

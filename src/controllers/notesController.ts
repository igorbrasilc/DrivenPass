import { User } from '.prisma/client';
import { Request, Response } from 'express';
import AppError from '../config/error.js';
import { SafeNotePartial } from '../interfaces/notesTypes.js';
import * as services from '../services/notesService.js';

export async function createSafeNote(req: Request, res: Response) {
    const user = res.locals.user as User;
    const dataInput = req.body as SafeNotePartial;
    await services.createSafeNote(dataInput, user.id);
    res.status(201).send('Safe note created');
}

export async function getSafeNotes(req: Request, res: Response) {
    const user = res.locals.user as User;
    const safeNotes = await services.getSafeNotes(user.id);
    res.status(200).send(safeNotes);
}

export async function getSafeNoteById(req: Request, res: Response) {
    const user = res.locals.user as User;
    const { id } = req.params;
    const safeNote = await services.getSafeNoteById(user.id, Number(id));
    res.status(200).send(safeNote);
}

export async function deleteNoteById(req: Request, res: Response) {
    const user = res.locals.user as User;
    const { id } = req.params;
    await services.deleteNoteById(user.id, Number(id));
    res.sendStatus(200);
}

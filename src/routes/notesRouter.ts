import { Router } from 'express';
import processHeader from '../middlewares/header.middleware.js';
import validateSchema from '../middlewares/schema.middleware.js';
import * as schemas from '../schemas/notesSchema.js';
import * as controllers from '../controllers/notesController.js';

const notesRouter = Router();

notesRouter.post(
    '/new-note',
    [validateSchema(schemas.noteSchema, '/new-note'),
        processHeader('/new-note')],
    controllers.createSafeNote,
);

notesRouter.get(
    '/notes',
    processHeader('/notes'),
    controllers.getSafeNotes,
);

notesRouter.get(
    '/notes/:id',
    processHeader('/notes/:id'),
    controllers.getSafeNoteById,
);

notesRouter.delete(
    '/notes/:id',
    processHeader('/notes/:id'),
    controllers.deleteNoteById,
);

export default notesRouter;

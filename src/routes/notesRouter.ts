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
    processHeader('/new-note'),
    controllers.getSafeNotes,
);

export default notesRouter;

import { Router } from 'express';
import validateSchema from '../middlewares/schema.middleware.js';
import processHeader from '../middlewares/header.middleware.js';
import * as schemas from '../schemas/cardSchema.js';
import * as controller from '../controllers/cardController.js';

const cardRouter = Router();

cardRouter.post(
    '/new-card',
    [validateSchema(schemas.cardSchema, '/new-card'),
        processHeader('new-card')],
    controller.createCard,
);

cardRouter.get(
    '/cards',
    processHeader('/cards'),
    controller.getCards,
);

// cardRouter.get(
//     '/credentials/:id',
//     processHeader('/credential/:id'),
//     controller.getCredentialById,
// );

// cardRouter.delete(
//     '/credentials/:id',
//     processHeader('/credential/:id'),
//     controller.deleteCredentialById,
// );

export default cardRouter;

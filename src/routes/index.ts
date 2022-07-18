import express from 'express';
import userRouter from '../routes/userRouter.js';
import credentialRouter from '../routes/credentialRouter.js';
import notesRouter from '../routes/notesRouter.js';
import cardRouter from '../routes/cardRouter.js';
import wifiRouter from './wifiRouter.js';

const router = express.Router();
router.use(userRouter);
router.use(credentialRouter);
router.use(notesRouter);
router.use(cardRouter);
router.use(wifiRouter);

export default router;

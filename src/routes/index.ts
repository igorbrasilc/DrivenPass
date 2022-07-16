import express from 'express';
import userRouter from '../routes/userRouter.js';
import credentialRouter from '../routes/credentialRouter.js';

const router = express.Router();
router.use(userRouter);
router.use(credentialRouter);

export default router;

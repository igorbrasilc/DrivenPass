import { Router } from "express";
import validateSchema from '../middlewares/schema.middleware.js';
import * as schemas from '../schemas/userSchema.js';
import * as controller from '../controllers/userController.js';

const userRouter = Router();
userRouter.post('/sign-up', validateSchema(schemas.signUp, '/sign-up'), controller.signUp);
userRouter.post('/sign-in', validateSchema(schemas.signIn, '/sign-in'), controller.signIn);

export default userRouter;
import { Router } from "express";
import validateSchema from '../middlewares/schema.middleware.js';
import processHeader from '../middlewares/header.middleware.js';
import * as schemas from '../schemas/credentialSchemas.js';
import * as controller from '../controllers/credentialController.js';

const credentialRouter = Router();

credentialRouter.post('/new-credential', 
[validateSchema(schemas.credentialSchema, '/new-credential'), processHeader('new-credential')], 
controller.createCredential);

credentialRouter.get('/credentials', processHeader('/credential'), controller.getCredentials);

export default credentialRouter;

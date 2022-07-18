import { Router } from 'express';
import validateSchema from '../middlewares/schema.middleware.js';
import processHeader from '../middlewares/header.middleware.js';
import * as schemas from '../schemas/wifiSchema.js';
import * as controller from '../controllers/wifiController.js';

const wifiRouter = Router();

wifiRouter.post(
    '/new-wifi',
    [validateSchema(schemas.wifiSchema, '/new-wifi'),
        processHeader('new-wifi')],
    controller.createWifi,
);

wifiRouter.get(
    '/wifis',
    processHeader('/wifis'),
    controller.getWifis,
);

wifiRouter.get(
    '/wifis/:id',
    processHeader('/wifis/:id'),
    controller.getWifiById,
);

wifiRouter.delete(
    '/wifis/:id',
    processHeader('delete /wifis/:id'),
    controller.deleteWifiById,
);

export default wifiRouter;

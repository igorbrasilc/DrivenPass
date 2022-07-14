import { Request, Response } from 'express';

import AppLog from './events/AppLog.js';
import app from './app.js';
import 'dotenv/config';

const PORT = +process.env.PORT || 4000;

app.get('/', async (_req: Request, res: Response) => res.send('Online'));
app.listen(PORT, process.env.HOST, () => AppLog('Server', `Server running on port ${PORT}`));

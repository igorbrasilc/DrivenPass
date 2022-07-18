import { Request, Response } from 'express';

import AppLog from './events/AppLog.js';
import app from './app.js';
import 'dotenv/config';

const { PORT, HOST } = process.env;
// const PORT = +process.env.PORT || 4000;
// const HOST = process.env.HOST || 'localhost';

// app.get('/', async (_req: Request, res: Response) => res.send('Online'));
app.listen(+PORT, HOST, () => AppLog('Server', `Server running on port ${PORT}`));

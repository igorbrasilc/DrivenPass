import { Request, Response, NextFunction } from 'express';
import * as userUtils from '../utils/userUtils.js';
import AppError from '../config/error.js';
import AppLog from '../events/AppLog.js';

function processHeader(endpoint?: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const header = req.header('authorization');
        const tokenInput = header?.replace('Bearer', '').trim();

        if (!header) {
            throw new AppError(
                'Missing headers',
                400,
                'Missing headers',
                'Ensure to provide the necessary headers',
            );
        }

        const tokenValidation = userUtils.validateToken(tokenInput);
        res.locals.user = tokenValidation;
        res.locals.header = header;
        AppLog('Middleware', `Header for endpoint ${endpoint} processed`);
        return next();
    };
}

export default processHeader;

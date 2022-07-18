import { User } from '.prisma/client';
import { Request, Response } from 'express';
import AppLog from '../events/AppLog.js';
import { WifiInput } from '../interfaces/wifiTypes.js';
import * as services from '../services/wifiService.js';

export async function createWifi(req: Request, res: Response) {
    const user = res.locals.user as User;
    const wifiInput = req.body as WifiInput;
    const wifiAndUser = { ...wifiInput, userId: user.id };
    await services.createWifi(wifiAndUser);
    AppLog('Controller', 'Wifi created');
    res.status(201).send('Wifi created!');
}

export async function getWifis(req: Request, res: Response) {
    const user = res.locals.user as User;
    const wifis = await services.getWifis(user.id);
    res.status(200).send(wifis);
}

export async function getWifiById(req: Request, res: Response) {
    const user = res.locals.user as User;
    const { id: wifiId } = req.params;
    const userWifi = await services.getWifiById(user.id, Number(wifiId));
    res.status(200).send(userWifi);
}

export async function deleteWifiById(req: Request, res: Response) {
    const user = res.locals.user as User;
    const { id: wifiId } = req.params;
    await services.deleteWifiById(user.id, Number(wifiId));
    res.sendStatus(200);
}

import { Wifi } from '.prisma/client';
import * as repository from '../repositories/wifiRepository.js';
import * as credentialUtils from '../utils/credentialUtils.js';
import AppLog from '../events/AppLog.js';
import AppError from '../config/error.js';
import { WifiInputAndUser } from '../interfaces/wifiTypes.js';

export async function createWifi(data: WifiInputAndUser) {
    const encryptedPassword = await credentialUtils.encryptPassword(data.password);
    const objData: WifiInputAndUser = {
        title: data.title,
        networkName: data.networkName,
        password: encryptedPassword,
        userId: Number(data.userId),
    };
    await repository.createWifi(objData);
    AppLog('Service', 'Wifi created in db');
}

export async function decryptWifis(wifis: Wifi[]) {
    return wifis.forEach(
        async (wifi) => {
            wifi.password = await credentialUtils.decryptPassword(wifi.password);
        },
    );
}

export async function getWifis(userId: number) {
    const wifis: Wifi[] = await repository.getWifis(userId);
    await decryptWifis(wifis);
    AppLog('Service', 'wifis retrieved');
    return wifis;
}

export async function getWifiById(userId: number, wifiId: number) {
    const wifi: Wifi = await repository.getWifiById(userId, wifiId);
    wifi.password = await credentialUtils.decryptPassword(wifi.password);
    AppLog('Service', 'Wifi retrieved by id');
    return wifi;
}

export async function deleteWifiById(userId: number, wifiId: number) {
    const deletion = await repository.deleteWifiById(userId, wifiId);
    if (deletion.count === 0) {
        throw new AppError(
            'Not found wifi',
            404,
            'Not found wifi',
            'The wifi you requested doesnt exist or doesnt belong to this user',
        );
    }
    AppLog('Service', 'Wifi deleted');
}

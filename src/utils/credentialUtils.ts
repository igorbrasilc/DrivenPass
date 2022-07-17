import Cryptr from 'cryptr';
import 'dotenv/config';
import AppLog from '../events/AppLog.js';

const cryptr = new Cryptr(process.env.CRYPTR_PASSWORD || 'temporary');

export async function encryptPassword(password: string) {
    const encryptedPassword = cryptr.encrypt(password);
    AppLog('Util', 'Credential password encrypted');
    return encryptedPassword;
}

export async function decryptPassword(encryptedPassword: string) {
    const decryptedPassword = cryptr.decrypt(encryptedPassword);
    return decryptedPassword;
}

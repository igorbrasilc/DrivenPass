import { Credential } from '.prisma/client';
import { CredentialAndUser } from '../interfaces/credentialTypes.js';
import * as utils from '../utils/credentialUtils.js';
import * as repository from '../repositories/credentialRepository.js';
import AppLog from '../events/AppLog.js';
import AppError from '../config/error.js';

export async function createCredential(data: CredentialAndUser) {
    const encryptedPassword = await utils.encryptPassword(data.password);
    const objData = { ...data, password: encryptedPassword };
    await repository.createCredential(objData);
    AppLog('Service', 'Credential created in db');
}

export async function getCredentials(userId: number) {
    const credentials: Partial<Credential>[] = await repository.getCredentials(userId);
    AppLog('Service', 'Credentials retrieved');
    return credentials;
}

export async function getCredentialById(userId: number, credentialId: number) {
    const credential: Partial<Credential> = await repository.getCredentialById(userId, credentialId);
    AppLog('Service', 'Credential retrieved by id');
    return credential;
}

export async function deleteCredentialById(userId: number, credentialId: number) {
    const deletion = await repository.deleteCredentialById(userId, credentialId);
    if (deletion.count === 0) {
        throw new AppError(
            'Not found credential',
            404,
            'Not found credential',
            'The credential you requested doesnt exist or doesnt belong to this user',
        );
    }
    AppLog('Service', 'Credential deleted');
}

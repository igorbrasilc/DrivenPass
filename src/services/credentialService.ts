import { CredentialAndUser } from "../interfaces/credentialTypes.js";
import * as utils from '../utils/credentialUtils.js';
import * as repository from '../repositories/credentialRepository.js';
import AppLog from "../events/AppLog.js";
import { Credential } from ".prisma/client";

export async function createCredential(data: CredentialAndUser) {   
    const encryptedPassword = await utils.encryptPassword(data.password);
    data.password = encryptedPassword;
    await repository.createCredential(data);
    AppLog('Service', 'Credential created in db');
    return;
}

export async function getCredentials(userId: number) {
    const credentials: Partial<Credential>[] = await repository.getCredentials(userId);
    AppLog('Service', 'Credentials retrieved');
    return credentials;
}
import { CredentialAndUser } from "../interfaces/credentialTypes.js";
import * as utils from '../utils/credentialUtils.js';
import * as repository from '../repositories/credentialRepository.js';
import AppLog from "../events/AppLog.js";

export async function createCredential(data: CredentialAndUser) {   
    const encryptedPassword = await utils.encryptPassword(data.password);
    data.password = encryptedPassword;
    await repository.createCredential(data);
    AppLog('Service', 'Credential created in db');
    return;
}
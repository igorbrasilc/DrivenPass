import bcrypt from "bcrypt";
import Cryptr from "cryptr";
import AppError from "../config/error.js";
import AppLog from "../events/AppLog.js";
import 'dotenv/config';

const cryptrPassword = process.env.CRYPTR_PASSWORD || 'temporary';
const cryptr = new Cryptr(cryptrPassword);

export function hashPassword(password: string) {
    const salt = 8;
    const hashedPassword = bcrypt.hashSync(password, salt);

    AppLog('Middleware', 'Hashed password');
    return hashedPassword;
}

export async function unhashAndComparePasswords(inputPassword: string, dbPassword: string) {
    const match: Boolean = await bcrypt.compare(inputPassword, dbPassword);

    if (!match) {
        throw new AppError(
            'Passwords dont match', 401, 'Passwords dont match', 'Check your password'
        )
    }

    AppLog('Middleware', 'Password matched');
    return match; 
}








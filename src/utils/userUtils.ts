import bcrypt from "bcrypt";
import AppError from "../config/error.js";
import AppLog from "../events/AppLog.js";
import 'dotenv/config';
import { User } from ".prisma/client";
import jwt from 'jsonwebtoken';

export function hashPassword(password: string) {
    const salt = 8;
    const hashedPassword = bcrypt.hashSync(password, salt);

    AppLog('Util', 'Hashed password');
    return hashedPassword;
}

export async function unhashAndComparePasswords(inputPassword: string, dbPassword: string) {
    const match: Boolean = await bcrypt.compare(inputPassword, dbPassword);

    if (!match) {
        throw new AppError(
            'Passwords dont match', 401, 'Passwords dont match', 'Check your password'
        )
    }

    AppLog('Util', 'Password matched');
    return match; 
}

export async function generateToken(data: User) {
    const token = jwt.sign(data, process.env.JWT_TOKEN || 'secret', {expiresIn: 60 * 60 * 24});
    AppLog('Util', 'Token generated');
    return token;
}

export async function decodeToken(token: string) {
    const decodedToken = jwt.decode(token);
    AppLog('Util', 'Token decoded');
    return decodedToken;
}

export function validateToken(token: string) {
        const tokenVerif = jwt.verify(token, process.env.JWT_TOKEN || 'secret');
        AppLog('Util', 'Token verified');
        return tokenVerif;
}









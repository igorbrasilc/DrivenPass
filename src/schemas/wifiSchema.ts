import joi from 'joi';
import { WifiInput } from '../interfaces/wifiTypes.js';

export const wifiSchema = joi.object<WifiInput>({
    title: joi.string().required(),
    networkName: joi.string().required(),
    password: joi.string().required(),
});

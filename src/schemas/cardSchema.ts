import JoiDate from '@hapi/joi-date';
import JoiBase from '@hapi/joi';
import { CardPartial, CardPartialInput } from '../interfaces/cardTypes.js';

const Joi = JoiBase.extend(JoiDate);

export const cardSchema = Joi.object<CardPartialInput>({
    title: Joi.string().required(),
    number: Joi.string().length(16).pattern(/^[0-9]{16}$/).required(),
    username: Joi.string().required(),
    CVC: Joi.string().length(4).pattern(/^[0-9]{4}$/).required(),
    expirationDate: Joi.date().format('MM/YY').raw().error(() => 'message')
        .required(),
    password: Joi.string().required(),
    isVirtual: Joi.boolean().required(),
    cardType: Joi.string().valid('credit', 'debit', 'both'),
});

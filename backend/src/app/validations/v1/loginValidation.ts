import { body } from 'express-validator';

const user = [
    body('name').isString(),
    body('email').isEmail().notEmpty(),
    body('password').isString()
];

const loginValidation = { user };
export default loginValidation;
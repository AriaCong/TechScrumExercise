import { body } from 'express-validator';

const ticket = [
    body('name').isString(),
    body('created_at').isString().isDate(),
    body('updated_at').isString().isDate(),
    body('category').isString()
];
const ticketValidation = { ticket };
export default ticketValidation;
import {body} from 'express-validator';
//validare date


export const registerValidation = [
    body('email', 'incorrect email').isEmail(),
    body('password', 'password contains min 5 symbols').isLength({min : 5}),
    body('fullName', 'your name').isLength({min : 3}),
    body('avatarUrl', 'incorrect Url for your avatar').optional().isURL(), //nu este necesar sa apara, dar daca apare verifica
]
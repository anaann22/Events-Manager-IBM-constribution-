import {body} from 'express-validator';
//validare date
export const loginValidation = [
    // body('email', 'Email gresit').optional().isEmail(),
    // body('password', 'parola contine minim 5 simboluri').isLength({ min: 5 }),
  ];

export const registerValidation = [
    // body('email', 'incorrect email').optional().isEmail(),
    // body('password', 'password contains min 5 symbols').isLength({min : 5}),
    // body('fullName', 'your name').isLength({min : 3}),
    // body('avatarUrl', 'incorrect Url for your avatar').optional().isURL(), //nu este necesar sa apara, dar daca apare verifica
]

export const postCreateValidation = [
    body('title', 'Numele postarii').isLength({ min: 3 }).isString(),
    body('text', 'Textul postarii').isLength({ min: 3 }).isString(),
    body('tags', 'Tag gresit').optional().isString(),
    body('imageUrl', 'Eroare incarcare imagine').optional().isString(),
  ];
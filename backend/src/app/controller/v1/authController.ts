import { Request, Response } from 'express';
import { registerUser, loginUser, logoutUser } from '../../services/v1/authService';
import { validationResult } from 'express-validator';

export function register(req: Request, res: Response) {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        const errorMessages = error.array().map(error => `${error.param}: ${error.msg}`);
        console.log(errorMessages);
        return res.status(422).json({ errors: error.array() });
    }
    registerUser(req.body);
    res.send("[controller]:loginController is called ");
}

export function login(req: Request, res: Response) {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        const errorMessages = error.array().map(error => `${error.param}: ${error.msg}`);
        console.log(errorMessages);
        return res.status(422).json({ errors: error.array() });
    }
    loginUser(req.body);
    res.send("[controller]:loginController is called");
}

export function logout(req: Request, res: Response) {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(422).json({ errors: error.array() });
    }
    logoutUser(req.body);
    // const authHeader = req.headers.authorization;
    // console.log("authHeader-->", req.headers);
    // // logoutUser(req.body);
    // if (!authHeader) {
    //     return res.status(401).json({ error: 'Authorization header is required' });
    // }

    // logoutUser(authHeader)
    //     .then(() => {
    //         res.send("[controller]: logoutController is called");
    //     })
    //     .catch((err) => {
    //         res.status(500).json({ error: err.message });
    //     });
}
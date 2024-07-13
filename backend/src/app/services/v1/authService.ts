import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator'; // this is not there???
import User from '../../model/user';
import config from '../../config/app'; // the secret key is stored here

export async function registerUser(body: {email: string, name: string, password: string}) {
    //const email = req.body.email;
    const { email =null} = body // QUESTION: Why does it need  =null ?
    console.log("------------>");
    const user = await User.findOne({email}); // email: email
    // if (user) {
    //     return { error: 'User already exists' };
    // }
    if (user) throw new Error('User already exists');
    const newUser = new User(body);
    const validationToken = jwt.sign({ id: newUser.id }, config.secret);
    newUser.token = validationToken;
    await newUser.save();
    console.log("newUser Registed-->", newUser);
    return newUser;
    return null;
}
/* Login Steps:
1. Find the user by email and password. It comes from the request body.
2. validate password in model using bcrypt.compare()
2. If the user is not found, return an error message.
3. If the user is found, generate a JWT token for the user.
4. Return the user and the token in the response.
5. Back to the controller. and compare
*/

export async function loginUser(req: Request) {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findByCredentials(email, password);
    if (!user) {
        return { error: 'Invalid login credentials' };
    }
    const token = await user.generateJWTToken(); // this function is defined in the model
    return { user, ...{token: token } };
}
/* Log out steps:
1. Get the JWT token
2. Decode the user ID
3. Reset token field to empty string
4. User.save()
*/
export async function logoutUser(req: Request) {
    const decode: any = jwt.verify(req.headers.authorization as string, config.secret);
    const userId = decode.id;
    const user = await User.findById(userId);
    if(!user) {
        throw new Error('User not found');
    }
    user.token = '';
    user.save();
}
// TODO: Clarify the steps to login and logout

/*
    Destructuring Assignment: This syntax allows you to extract properties from objects and assign them to variables. 
    In this case, req.body is expected to be an object, and you're trying to extract the email property from it.

    Default Value: The = null part is setting a default value for the email variable. 
    If the email property does not exist in req.body, or if it is undefined, email will be set to null.

    const email = req.body.email !== undefined ? req.body.email : null;

    const req = {
        body: {
            email: "user@example.com"
        }
    };

    const { email = null } = req.body;
    console.log(email); // Output: "user@example.com"

    const req = {
        body: {}
    };

    const { email = null } = req.body;
    console.log(email); // Output: null

    And if email is not present in req.body:
    const req = {
        body: {}
    };
    const { email = null } = req.body;
    console.log(email); // Output: null

    This approach is useful for ensuring that you have a default value (in this case, null) 
    if the expected property (email) is not provided in the object (req.body).



*/




// export function loginService() {
//     console.log("♡♡♡♡♡♡♡[service]:loginService successfully accessed ♡♡♡♡♡♡♡");
// }


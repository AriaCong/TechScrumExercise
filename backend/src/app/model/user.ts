import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../app/config/app"

//TypeScript interface for User model
/*
    IUser: Defines the structure of a user document, including fields and methods.
    IUserModel: Defines static methods for the user model.
*/
interface IUser extends Document{name: string, email: string, password: string, token: string, generateJWTToken: ()=>Promise<string>};
interface IUserModel extends mongoose.Model<IUser> {
    findByCredentials: (email: string, password: string) => Promise<IUser>;
  }
// user schema
/*
    userSchema: Defines the structure of user documents in MongoDB, including fields and their types.
    timestamps: Adds createdAt and updatedAt fields to the schema.

*/
const userSchema = new mongoose.Schema <IUser>(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
);
// pre-save middleware to hash the password before saving the user
/*
    pre("save"): Middleware that runs before saving a user document.
    bcrypt.hash: Hashes the password if it has been modified.
*/
userSchema.pre("save", async function(next) {
    const user = this;

    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
});
// instance method to JSON
/*
    toJSON: Removes the password field from the user object before sending it as a response.
*/
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}
// static method (findByCredentials) to find user by credentials: Finds a user by email and checks if the password matches.
userSchema.statics.findByCredentials = async function (email: string, password: string) {
    const user = await User.findOne({email});
    if(!user) {
        return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return null;
    }
    return user;
}
// instance method (generateJWTToken) to generate JWT token for the user and saves it to the database.
userSchema.methods.generateJWTToken = async function(){
    const user = this;
    
    if(!user) {
        return;
    }
    const token = jwt.sign({_id: user._id.toString()}, config.secret);
    user.token = token;
    await user.save();
    return token;
};

// Creating the model: 
// mongoose.model: Creates a Mongoose model named "User" using the userSchema.
const User = mongoose.model <IUser, IUserModel> (
    "User", userSchema
);
export default User;

// const mongoose = require('mongoose');
// module.exports = User;
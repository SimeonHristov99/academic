import { Request, Response } from 'express';
import { Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user';
import { UserDocument } from '../models/user';
import IUser from '../models/interfaces/IUser';

export default class UserController {
    construct() {}   

    public async findUser(email: string): Promise<UserDocument> {
        return User.findOne({ email: email }).exec();
    }

    public async createUser(user: IUser): Promise<void> {
        bcrypt.hash(user.password, 10, async (error: Error, hash: string) => {
            if (error) {
                return error;
            }

            const newUser = new User({
                email: user.email,
                password: hash,
                firstname: user.firstname,
                lastname: user.lastname,
                birthDate: user.birthDate,
                type: user.type,
            });

            await newUser.save();
        });
    };

    public validateUser(user: IUser): string[] {
        const errors: string[] = [];
    
        if (!user.email) {
          errors.push('Email is empty');
        }
    
        if (!user.password.match(/^[a-zA-Z0-9*.!@#$%^&(){}[\]:;<>,.?\/~_+-=|].{8,}$/)) {
          errors.push('Password must be at least 8 symbols');
        }
    
        return errors;
      }
}
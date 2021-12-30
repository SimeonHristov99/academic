import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user';
import { UserDocument } from '../models/user';
import IUser from '../models/interfaces/IUser';
import generateToken from './generate-token';

export default class UserController {
  construct() { }

  findUser = async (email: string): Promise<UserDocument> => {
    return User.findOne({ email: email }).exec();
  }

  validateUser = (user: IUser): string[] => {
    const errors: string[] = [];

    if (!user.email) {
      errors.push('Email is empty');
    }

    if (!user.password.match(/^[a-zA-Z0-9*.!@#$%^&(){}[\]:;<>,.?\/~_+-=|].{8,}$/)) {
      errors.push('Password must be at least 8 symbols');
    }

    return errors;
  }

  createUser = async (user: IUser): Promise<void> => {
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
        role: user.role,
      });

      await newUser.save();
    });
  };

  register = async (req: Request, res: Response, next: () => void) => {
    const userExist: IUser = await this.findUser(req.body.email);

    if (userExist) {
      res.status(400).json({ success: false, error: 'Email is already taken' });
    } else {
      await this.createUser(req.body).catch((error) => {
        res.status(400).json({ success: false, error: 'Invalid email or password' });
      });

      generateToken(res, req.body.email);
      res.status(200).json({ success: true, message: 'User created' });
    }
  };

  login = async (req: Request, res: Response, next: () => void) => {
    const { email, password } = req.body;

    try {
      const user = await this.findUser(email);

      if (user) {
        bcrypt.compare(password, user.password, (error: Error, result: boolean) => {
          if (error) {
            res.status(400).json({ success: false, error: error });
          }

          if (result) {
            generateToken(res, email);
            res.status(200).json({ success: true });
          } else {
            res.status(401).json({ success: false, error: 'Invalid password' });
          }
        });
      } else {
        res.status(401).json({ success: false, error: 'Invalid email' });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ success: false, error: 'Invalid email' });
    }
  };
}
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user';
import { UserDocument } from '../models/user';
import IUser from '../models/interfaces/IUser';
import generateToken from './generate-token';
import { Course } from '../models/course';

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

  createUser = async (user: IUser): Promise<UserDocument> => {
    const hash = await bcrypt.hash(user.password, 10);

    const newUser = new User({
      email: user.email,
      password: hash,
      firstname: user.firstname,
      lastname: user.lastname,
      birthDate: user.birthDate,
      role: user.role,
    });

    return await newUser.save();
  };

  register = async (req: Request, res: Response, next: () => void) => {
    const user = req.body;
    const userExist: IUser = await this.findUser(user.email);

    if (userExist) {
      res.status(400).json({ success: false, error: 'Email is already taken' });
    } else {
      await this.createUser(user).then(newUser => {
        generateToken(res, user.email);
        res.status(200).json({ id: newUser.id, role: user.role });
      }).catch((err) => {
        res.status(400).json({ error: '1111 Invalid email or password' });
      });
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
            const resBody = {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              role: user.role,
            }
            res.status(200).json(resBody);
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

  logout = async (req: Request, res: Response) => {
    res.clearCookie('auth');
    res.status(200).json({ success: true });
  };

  deleteUser = async (req: Request, res: Response, next: () => void) => {
    const email = req.body.email;

    try {
      const user = await this.findUser(email);

      if (user) {
        user.remove((err: Error, _) => {
          if (err) {
            console.log(err);
            res.status(401).json({ success: false, error: err });
          }
          res.status(200).json({ success: true });
        });
      } else {
        res.status(401).json({ success: false, error: 'Invalid email' });
      }
    } catch (error) {
      res.status(401).json({ success: false, error: 'Invalid email' });
    }
  }

  getUserCourses = async (req: Request, res: Response) => {
    const user = res.locals.user;

    if (user.role === 'user') {
      this.getEnrolledCourses(user, res);
    } else {
      this.getOrganisationCourses(user, res);
    }
  }

  getEnrolledCourses = async (user: IUser, res: Response) => {
    const ids = user.courses.map(course => course.courseId);

    const courses = await Course
      .find({ "_id": { $in: ids } })
      .select('-usersEnrolled -__v');

    res.status(200).json(courses);
  }

  getOrganisationCourses = async (user: IUser, res: Response) => {
    const courses = await Course
      .find({ "createdBy": user._id })
      .select('-usersEnrolled -__v');

    res.status(200).json(courses);
  }

  getUsers = async (req: Request, res: Response) => {
    const users = await User
      .find({})
      .select('email firstname lastname createdAt');

    res.status(200).json(users);
  }
}
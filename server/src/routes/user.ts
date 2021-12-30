
import { Request, Response, Router } from 'express';
import UserController from '../controllers/user-controller';
import validateUser from '../middleware/validate-user';
import IUser from '../models/interfaces/IUser';


const user = Router();
const userController: UserController = new UserController();

user.post('/register', validateUser, userController.register);

user.post('/login', validateUser, userController.login);

export default user;
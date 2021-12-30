import { Router } from 'express';
import UserController from '../controllers/user-controller';
import validateUser from '../middleware/validate-user';

const user = Router();
const userController: UserController = new UserController();

user.post('/register', validateUser, userController.register);

user.post('/login', validateUser, userController.login);

export default user;
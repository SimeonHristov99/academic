import { Request, Response, Router } from 'express';
import UserController from '../controllers/user-controller';
import validateUser from '../middleware/validate-user';
import verifyAuth from '../middleware/verifyAuth';

const user = Router();
const userController: UserController = new UserController();

user.post('/register', validateUser, userController.register);

user.post('/login', validateUser, userController.login);

user.post('/logout', verifyAuth, async (req: Request, res: Response) => {
  res.clearCookie('auth');
  res.status(200).json({ success: true });
});

export default user;
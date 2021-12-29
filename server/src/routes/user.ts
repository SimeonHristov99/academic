
import { Request, Response, Router } from 'express';
import UserController from '../controllers/user-controller';
import validateUser from '../middleware/validate-user';
import IUser from '../models/interfaces/IUser';


const user = Router();
const userController: UserController = new UserController();

user.post('/register', validateUser, async (req: Request, res: Response) => {
  const userExist: IUser = await userController.findUser(req.body.email);

  if (userExist) {
    res.status(400).json({ success: false, error: 'Email is already taken' });
  } else {
    userController.createUser(req.body).catch((error) => {
      res.status(400).json({ success: false, error: 'Invalid email or password' });
    });
    
    // await generateToken(res, req.body.email);
    res.status(200).json({ success: true, message: 'User created' });
  }
});

export default user;
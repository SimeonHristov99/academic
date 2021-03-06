import { Router } from 'express';
import UserController from '../controllers/user-controller';
import validateUser from '../middleware/validate-user';
import authorization from '../middleware/authorization';
import roleValidator from '../middleware/role-validator';

const user = Router();
const userController: UserController = new UserController();

user.post('/register', validateUser, userController.register);

user.post('/login', validateUser, userController.login);

user.post('/logout', authorization, userController.logout);

user.delete('/delete', authorization, roleValidator(['admin']), userController.deleteUser);

user.get('/user/courses', authorization, userController.getUserCourses);

user.get('/users', authorization, roleValidator(['admin']), userController.getUsers);

user.post('/user/course/task', authorization, userController.addTask);

user.put('/user/course/task', authorization, userController.addTask);

user.post('/user/course/mark', authorization,
  roleValidator(['admin', 'organisation']), userController.addMark)

export default user;
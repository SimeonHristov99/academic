import { Router } from 'express';
import CourseController from '../controllers/course-controller';
import authorization from '../middleware/authorization';
import roleValidator from '../middleware/role-validator';

const course = Router();
const courseController: CourseController = new CourseController();

course.get('/courses', courseController.listCourses);

course.post('/course', authorization,
  roleValidator(['organisation', 'admin']),
  courseController.createCourse);

export default course;
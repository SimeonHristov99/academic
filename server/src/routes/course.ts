import { Router } from 'express';
import CourseController from '../controllers/course-controller';
import authorization from '../middleware/authorization';
import roleValidator from '../middleware/role-validator';

const course = Router();
const courseController: CourseController = new CourseController();

course.get('/courses', courseController.listCourses);

course.get('/courses/by-price', courseController.sortCoursesByPrice);

course.get('/courses/by-level', courseController.sortCoursesByLevel);

course.get('/courses/by-rating', courseController.sortCoursesByRating);

course.post('/course',
  authorization,
  roleValidator(['organisation', 'admin']),
  courseController.createCourse);

course.post('/courses/search',
  authorization,
  roleValidator(['organisation', 'admin']),
  courseController.searchCoursesByName);

course.post('/course/users', 
  authorization,
  roleValidator(['organisation', 'admin']),
  courseController.getEnrolledUsers);

course.post('/course/delete', 
  authorization,
  roleValidator(['organisation', 'admin']),
  courseController.deleteCourse);

course.post('/course/update', 
  authorization,
  roleValidator(['organisation', 'admin']),
  courseController.updateCourse);

export default course;
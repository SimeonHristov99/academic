import { Request, Response } from 'express';
import { Course } from '../models/course';
import ICourse from '../models/interfaces/ICourse';
import course from '../routes/course';

export default class CourseController {
  construct() { }

  listCourses = async (req: Request, res: Response) => {
    const courses1 = Course.find({}, '-__v',
      (err: Error, courses: Array<ICourse>) => {
        if (!err) {
          return res.status(200).json(courses);
        }

        res.status(404).json({ success: false, error: 'No courses found' });
      });

    // const courses = Course.aggregate([{ $project: { usersEnrolled: { $size: '$usersEnrolled' } } }]);
    // res.status(200).json(courses);
  }

  createCourse = async (req: Request, res: Response) => {
    const course: ICourse = req.body.course;
    course.createdBy = res.locals.user.id;

    const newCourse = new Course(course);

    newCourse.save((err: Error, _) => {
      if (err) {
        return res.status(500).json({ success: false, error: 'Can not create course' });
      }
      res.status(200).json({ success: true });
    });
  };
}
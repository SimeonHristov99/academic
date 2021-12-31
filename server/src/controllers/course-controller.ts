import { Request, Response } from 'express';
import { Course } from '../models/course';
import ICourse from '../models/interfaces/ICourse';

export default class CourseController {
  construct() { }

  listCourses = async (req: Request, res: Response) => {
    const courses = await Course.aggregate([{
      $addFields: {
        "usersEnrolled": {
          $size: "$usersEnrolled"
        }
      }
    },
    {
      $unset: "__v"
    }
    ]);

    res.status(200).json(courses);
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
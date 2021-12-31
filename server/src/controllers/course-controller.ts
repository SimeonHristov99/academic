import { Request, Response } from 'express';
import { Course } from '../models/course';
import ICourse from '../models/interfaces/ICourse';
import course from '../routes/course';

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
    let course: ICourse = req.body;
    console.log(course);
    course.createdBy = res.locals.user.id;

    const newCourse = new Course(course);

    newCourse.save((err: Error, _) => {
      if (err) {
        return res.status(500).json({ success: false, error: 'Can not create course because' + err });
      }
      res.status(200).json({ success: true });
    });
  };

  updateCourse = async (req: Request, res: Response) => {
    const course: ICourse = req.body;

    Course.findOneAndUpdate( {_id: course._id}, course, {new: true}, function(err, data) {
      if(err){
        return res.status(500);
     } else {
        return res.status(200).send(data);
     }
    });

  };

  deleteCourse = async (req: Request, res: Response, next: () => void) => {
    const course_id = req.body.id;
    console.log(course_id);
    try {
      const course = await Course.findOne({_id: course_id}).exec();

      if (course) {
        course.remove((err: Error, _) => {
          if (err) {
            console.log(err);
            res.status(401).json({ success: false, error: err });
          }
          res.status(200).json({ success: true });
        });
      } else {
        res.status(401).json({ success: false, error: 'Invalid course id' });
      }
    } catch (error) {
      res.status(401).json({ success: false, error: 'Invalid course id' });
    }
  };
}
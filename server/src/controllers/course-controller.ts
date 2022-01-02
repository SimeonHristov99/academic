import { Request, Response } from 'express';
import { Course, CourseDocument } from '../models/course';
import ICourse from '../models/interfaces/ICourse';
import { User } from '../models/user';

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

  getEnrolledUsers = async (req: Request, res: Response) => {
    const _id = req.body._id;

    const users = await Course.findOne({ _id: _id }).select('usersEnrolled')
      .populate({ path: 'usersEnrolled', select: 'email firstname lastname' })
      .exec();

    res.status(200).json(users.usersEnrolled);
  }

  sortCoursesByPrice = async (req: Request, res: Response) => {
    Course.aggregate([{
      $addFields: {
        "usersEnrolled": {
          $size: "$usersEnrolled"
        }
      }
    },
    {
      $unset: "__v"
    }
    ]).sort({ price: 1 })
      .then(course => { res.status(200).json(course) })
      .catch(err => { res.status(500).json({ success: false, error: 'Can not get courses: ' + err }) });
  }

  sortCoursesByLevel = async (req: Request, res: Response) => {
    Course.aggregate([{
      $addFields: {
        "usersEnrolled": {
          $size: "$usersEnrolled"
        },
        "priority": {
          $switch: {
            branches: [
              {
                case: { $eq: ["$level", "beginner"] },
                then: 1
              },
              {
                case: { $eq: ["$level", "intermediate"] },
                then: 2
              },
              {
                case: { $eq: ["$level", "advanced"] },
                then: 3
              }
            ],
            default: -1
          }
        }
      }
    },
    {
      $unset: "__v"
    }
    ]).sort({ priority: 1 })
      .then(course => { res.status(200).json(course) })
      .catch(err => { res.status(500).json({ success: false, error: 'Can not get courses: ' + err }) });
  }

  sortCoursesByRating = async (req: Request, res: Response) => {
    Course.aggregate([{
      $addFields: {
        "usersEnrolled": {
          $size: "$usersEnrolled"
        }
      }
    },
    {
      $unset: "__v"
    }
    ]).sort({ rating: 1 })
      .then(course => { res.status(200).json(course) })
      .catch(err => { res.status(500).json({ success: false, error: 'Can not get courses: ' + err }) });
  }

  searchCoursesByName = async (req: Request, res: Response) => {
    const searchName = req.body.name;
    Course.find({ title: { $regex: `${searchName}`, $options: "i" } })
      .then(course => { res.status(200).json(course) })
      .catch(err => { res.status(500).json({ success: false, error: 'Can not get courses: ' + err }) });
  }

  createCourse = async (req: Request, res: Response) => {
    let user = res.locals.user;
    let course = req.body;

    // course.createdBy = res.locals.user.id;
    // course.usersEnrolled = [user.id];

    await new Course(course).save((err: Error, course) => {
      if (err) {
        return res.status(500).json({ success: false, err });
      } else {
        // user.courses.push(course.id);
        // user.save();

        res.status(200).json({ success: true });
      }
    })
  };

  updateCourse = async (req: Request, res: Response) => {
    const course: ICourse = req.body;

    Course.findOneAndUpdate({ _id: course._id }, course, { new: true }, function (err, data) {
      if (err) {
        return res.status(500);
      } else {
        return res.status(200).send(data);
      }
    });

  };

  deleteCourse = async (req: Request, res: Response, next: () => void) => {
    const course_id = req.body._id;

    try {
      const course = await Course.findOne({ _id: course_id }).exec();

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

  courseEnroll = async (req: Request, res: Response, next: () => void) => {
    const courseId: string = req.body.course_id;
    const user = res.locals.user;

    const course = await Course.findOneAndUpdate(
      { _id: courseId },
      { $addToSet: { usersEnrolled: user } }, { returnNewDocument: true }
    );

    user.courses.push(course);
    await user.save();

    res.status(200).json({ success: true });
  }
}
import { Request, Response } from 'express';
import { Course } from '../models/course';
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
      $lookup: {
        "from": User.collection.name,
        let: { createdById: "$createdBy" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$createdById"] } }, },
          {
            $project: { "organization": "$firstname", }
          },
        ],
        as: "createdByName"
      }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$createdByName", 0] }, "$$ROOT"] } }
    },
    {
      $project: { createdByName: 0 }
    },
    {
      $unset: ["__v", "content"]
    }
    ]);
    console.log(courses);
    res.status(200).json(courses);
  }

  getEnrolledUsers = async (req: Request, res: Response) => {
    const _id = req.body._id;

    const users = await Course.findOne({ _id: _id }).select('usersEnrolled')
      .populate({ path: 'usersEnrolled', select: 'email firstname lastname' })
      .exec();

    res.status(200).json(users.usersEnrolled);
  }

  getContent = async (req: Request, res: Response) => {
    Course.findOne({ _id: req.body.id }).select('content')
      .then(course => { res.status(200).json(course) })
      .catch(err => { res.status(500).json({ success: false, error: 'Can not get content in course: ' + err }) });
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
      $lookup: {
        "from": User.collection.name,
        let: { createdById: "$createdBy" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$createdById"] } }, },
          {
            $project: { "organization": "$firstname", }
          },
        ],
        as: "createdByName"
      }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$createdByName", 0] }, "$$ROOT"] } }
    },
    {
      $project: { createdByName: 0 }
    },
    {
      $unset: ["__v", "content"]
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
      $lookup: {
        "from": User.collection.name,
        let: { createdById: "$createdBy" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$createdById"] } }, },
          {
            $project: { "organization": "$firstname", }
          },
        ],
        as: "createdByName"
      }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$createdByName", 0] }, "$$ROOT"] } }
    },
    {
      $project: { createdByName: 0 }
    },
    {
      $unset: ["__v", "content"]
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
      $lookup: {
        "from": User.collection.name,
        let: { createdById: "$createdBy" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$createdById"] } }, },
          {
            $project: { "organization": "$firstname", }
          },
        ],
        as: "createdByName"
      }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$createdByName", 0] }, "$$ROOT"] } }
    },
    {
      $project: { createdByName: 0 }
    },
    {
      $unset: ["__v", "content"]
    }
    ]).sort({ rating: 1 })
      .then(course => { res.status(200).json(course) })
      .catch(err => { res.status(500).json({ success: false, error: 'Can not get courses: ' + err }) });
  }

  searchCoursesByName = async (req: Request, res: Response) => {
    const searchName = req.body.name;
    await Course.find({ title: { $regex: `${searchName}`, $options: "i" } })
    .exec(function (err, courses) {
      if (err) {
        res.status(500).json({ success: false, error: 'Can not get courses' });
      }
      res.status(200).json(courses);
    });
  }

  createCourse = async (req: Request, res: Response) => {
    let user = res.locals.user;
    let course = req.body;

    course.createdBy = res.locals.user.id;

    await new Course(course).save((err: Error, course) => {
      if (err) {
        return res.status(500).json({ success: false, err });
      } else {
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

    user.courses.push({
      courseId: course,
      mark: 0,
      url: '',
    });
    await user.save();

    res.status(200).json({ success: true });
  }

  rateCourse = async (req: Request, res: Response, next: () => void) => {
    const newRating = req.body.rating;
    const courseId = req.body.id;

    const courseWithTottals = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        $inc: {
          totalRating: newRating,
          totalRatingCount: 1,
        },
          $div: ["$totalRating", "$totalRatingCount"]

      },
      {new: true});

    courseWithTottals.rating = (courseWithTottals.totalRating as number) / (courseWithTottals.totalRatingCount as number);
    await courseWithTottals.save((err, data) => { 
      if(err){
          return res.status(500).json({ success: false, error: 'Could not rate course: ' + err });
      } else {
          return res.status(200).send(data);
    }
  })

  }

  filterCourses = async (req: Request, res: Response, next: () => void) => {
    const level_search = req.body.level ? req.body.level : /.*/;
    const free_search = req.body.free ? req.body.free : false;
    const rating_search = req.body.rating ? req.body.rating : 0;

    let filterCriteria;
    if (free_search) {
      filterCriteria = {
        level: level_search,
        price: 0,
        rating: {
          $gte: rating_search
        }
      }
    } else {
      filterCriteria = {
        level: level_search,
        rating: {
          $gte: rating_search
        }
      }
    }

    const courses = await Course.find(filterCriteria).exec();

    if (courses) {
      res.status(200).json(courses);
    }
    else {
      res.status(500).json({ success: false, error: 'Could not filter courses' });
    }
  }
}
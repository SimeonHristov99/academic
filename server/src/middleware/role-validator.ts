import { Request, Response } from 'express';

const roleValidator = (roles: Array<string>) => {
  return (req: Request, res: Response, next: () => void): void => {
    const user = res.locals.user;

    if (roles.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Unauthorized' });
    }
  };
}

export default roleValidator;
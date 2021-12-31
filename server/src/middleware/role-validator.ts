import { Request, Response } from 'express';

const roleValidator = (role: string) => {
  return (req: Request, res: Response, next: () => void): void => {
    const user = res.locals.user;

    if (user.role === role) {
      next();
    }
    res.status(403).json({ success: false, message: 'Unauthorized' });
  };
}

export default roleValidator;
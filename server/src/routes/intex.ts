import { Router, Request, Response } from 'express';
import course from './course';
import user from './user';
import note from './note';

const routes = Router();

routes.use('', user);
routes.use('', course);
routes.use('', note);

routes.all('*', (req: Request, res: Response) => {
    res.status(404).json({ success: false, error: 'No resource' })
});

export default routes;
import { Router, Request, Response } from 'express';
import user from './user';

const routes = Router();

routes.use('', user);

routes.get('/', (req: Request, res: Response) => {
    const rememberUser: string = req.cookies.user;
    console.log(rememberUser);
    if (rememberUser) {
        console.log('redirect');
        res.redirect('courses');
    } else {
        res.location('/login');
    }
});

// routes.all('*', (req: Request, res: Response) => {
//     res.status(404).json({ success: false, error: 'No resource' })
// });

export default routes;
import * as express from 'express';
import * as cors from 'cors';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

import connectDb from './db/index';
import routes from './routes/intex';

require('dotenv').config();

const SERVER_PORT = process.env.SERVER_PORT || 3001;

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.use(session({
  secret: process.env.SESSION_SECRET,
  proxy: true,
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
}));

connectDb()
  .then(() => {
    console.log('Database connection is successful');

    app.listen(SERVER_PORT, () => {
      console.log(`Server is listening on port ${SERVER_PORT}`);
    });
  })
  .catch((err) => console.error(err));
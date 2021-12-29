import * as express from 'express';

require('dotenv').config();

import connectDb from './db/index';

const SERVER_PORT = process.env.SERVER_PORT || 3001;

const app = express();

connectDb()
  .then(() => {
    console.log('Database connection successful');

    app.listen(SERVER_PORT, () => {
      console.log(`Server is listening on port ${SERVER_PORT}`);
    });
  })
  .catch((err) => console.error(err));
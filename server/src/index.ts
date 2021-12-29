import * as express from 'express';

require('dotenv').config();

const SERVER_PORT = process.env.SERVER_PORT || 3001;

const app = express();

app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port ${SERVER_PORT}`);
});
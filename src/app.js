const path = require('path')
const express = require('express');
require('dotenv').config({ path: path.resolve(__dirname, `../config/${process.env.ENVIRONMENT}.env`)}); // required when using environmental variables .env file
require('./db/mongoose'); // ensure that file runs, and conenct to db
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

const app = express();

app.use(express.json()); // Always call JSON.stringify (on response)
app.use(userRouter);
app.use(taskRouter);

module.exports = app
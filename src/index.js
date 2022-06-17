const express = require('express');
require('./db/mongoose'); // ensure that file runs, and conenct to db
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Always call JSON.stringify (on response)
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log('Server is up on port localhost:' + port);
});
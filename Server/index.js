const express = require('express');
const app = express();
require('dotenv').config()
require('./models/db')
const bodyParser = require('body-parser')
const Port = process.env.PORT;
const cors = require('cors')
const AuthRouter = require('./routes/authRouters')
const QuestionRouter = require('./routes/questionRouters')

app.use(bodyParser.json())

app.use(cors())
app.use('/auth',AuthRouter)
app.use('/auth/questions', QuestionRouter)


app.listen(Port, () => {
  console.log(`Server is running at http://localhost:${Port}`);
});

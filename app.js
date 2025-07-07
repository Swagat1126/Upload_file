const express = require('express'); //step 1
const app = express(); //step 2
const userRouter = require('./routes/user.routes'); 
const dotenv = require('dotenv');
dotenv.config();
const connectTODB = require('./config/db');
connectTODB();
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.routes');
const user = require('./models/user.models');






app.set('view engine','ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/',indexRouter);
app.use('/user',userRouter);





app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
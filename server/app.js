const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

// OWN FILES
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');

const app = express();
app.use(cors());
app.use(cookieParser());

// serve static file
app.use(express.static(path.join(__dirname, 'public')));
// run if process is in development
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello world', new Date().toDateString());
  next();
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/category', categoryRouter);

app.all('*', (req, res, next) => {
  try {
    throw new Error(`Can't fetch ${req.originalUrl}`);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
  next();
});

module.exports = app;

const express = require('express');
var mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const userRouter = require('./routes/user');
const quizRouter = require('./routes/quiz');
const videoRouter = require('./routes/video');
const videoHistoryRouter = require('./routes/videoHistory');
const viewHistoryRouter = require('./routes/viewHistory');

const { sequelize } = require('./models');
const passportConfig = require('./passport');

//swagger docs
var bodyParser = require("body-parser");
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

passportConfig();
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "vadvxcvcxvadsvasd",
  cookie: {
      httpOnly: true,
      secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());


//swagger
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Quizkids API",
        version: "0.1.0",
        description:
          "Quiz app",
        contact: {
          name: "서윤혁",
          email: "dbsgur6896@naver.com",
        },
      },
      servers: [
        {
          url: "http://localhost:4000",
        },
      ],
    },
    apis: [
        "./swagger/user.js",
        "./swagger/quiz.js",
        "./swagger/video.js",
        "./swagger/videoHistory.js",
    ],
};
  
const specs = swaggerJsdoc(options);
  app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

app.use('/api/users', userRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/videos', videoRouter);
app.use('/api/videoHistories', videoHistoryRouter);
app.use('/api/viewHistories', viewHistoryRouter);

//swagger
app.use("/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.listen(port, () => console.log(`Server listening on port ${port}`));

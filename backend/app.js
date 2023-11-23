const express = require('express');
var mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const userRouter = require('./routes/user');
const quizRouter = require('./routes/quiz');
const videoRouter = require('./routes/video');
const videoHistoryRouter = require('./routes/videoHistory');
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
        title: "Quiz App API",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "test",
          url: "https://test.com",
          email: "info@email.com",
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

//swagger
app.use("/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.listen(port, () => console.log(`Server listening on port ${port}`));

const express = require('express');
var mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');
const userRouter = require('./routes/user');
const quizRouter = require('./routes/quiz');
const videoRouter = require('./routes/video');
const { sequelize } = require('./models');

//swagger docs
var bodyParser = require("body-parser");
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

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

const cors = require('cors');
app.use(cors())
app.use(express.json());

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

//swagger
app.use("/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.listen(port, () => console.log(`Server listening on port ${port}`));

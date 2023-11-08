const express = require('express');
var mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');
const userRouter = require('./routes/user');
const { sequelize } = require('./models');

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

app.use('/api/users', userRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));

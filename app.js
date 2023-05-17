const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


const app = express();
app.use(cors())
app.use(express.json());

const routes = require('./routes/routes');

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

app.use('/api', routes)
app.use("/", indexRouter);
app.use("/api/users", usersRouter);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
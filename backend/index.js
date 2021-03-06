const express = require("express");
const {json} = require("body-parser");
const cors = require("cors");
const { queryParser } = require("express-query-parser");
const app = express()

const studentRoutes = require("./routes/studentRouter");
const classRoutes = require("./routes/classRouter");
const courseRoutes = require("./routes/courseRouter");

app.use(json())
app.use(cors())

app.use(
    queryParser({
        parseNull: true,
        parseUndefined: true,
        parseBoolean: true,
        parseNumber: true
    })
)

app.use('/api/student', studentRoutes);
app.use('/api/class', classRoutes);
app.use('/api/course', courseRoutes);

app.listen(3001, () => console.log(`Server started at http://localhost:3001`))
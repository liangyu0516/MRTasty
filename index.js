require('dotenv').config({path: './process.env'});
const express = require('express');
var bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/v1', require('./backend/routes/user_route'))
app.use('/api/v1', require('./backend/routes/restaurant_route'))
app.use('/api/v1', require('./backend/routes/review_route'))
app.use('/api/v1', require('./backend/routes/tag_route'))
app.use('/api/v1', require('./backend/routes/collect_route'))

app.listen(PORT, console.log("Server listening on port: " + PORT))

module.exports = app;
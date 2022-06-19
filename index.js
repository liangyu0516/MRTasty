require('dotenv').config({path: './process.env'});
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");

app.use(cors());

app.use('/api/v1', require('./backend/routes/restaurant_route'))

app.listen(PORT, console.log("Server listening on port: " + PORT))

module.exports = app;
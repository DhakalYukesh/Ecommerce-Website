const express = require('express');
const app = express();
const mongoDB = require('./db')
require('dotenv').config();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello!');
})

app.listen(port, ()=> {
    console.log(`Server has started! ${port}`);
    mongoDB();
})
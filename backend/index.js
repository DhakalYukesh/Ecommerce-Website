const express = require('express');
const app = express();
const mongoDB = require('./db')
require('dotenv').config();

const port = process.env.PORT || 5000;

// Cors middleware
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.get('/', (req, res) => {
    res.send('Hello!');
})

// Middleware
app.use(express.json());
app.use('/api', require('./routes/UserCreate'));

app.listen(port, ()=> {
    console.log(`Server has started! ${port}`);
    mongoDB();
})
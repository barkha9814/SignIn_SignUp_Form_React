const dotenv = require("dotenv");
const express = require('express');
const userRoutes = require('../src/routes/userRoutes');
var cookies = require("cookie-parser");

dotenv.config();
const app = express();



const port = process.env.PORT || 5000;

require('./db/connection');

app.use(express.json());
app.use(cookies());
app.use('/api/', userRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello');
// })

// app.get('/signup', middleware, (req, res) => {
//     res.send('Signup form');
// })

app.listen(port, () => {
    console.log(`Server is running at port no. ${port}`);
})
const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use('/movie', require('./routes/movie'))

app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));
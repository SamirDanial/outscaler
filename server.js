const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const http = require('http');
const { init } = require('./socket');

const app = express();
app.use(cors());

connectDB();

const server = http.createServer(app);
init(server); // Initialize Socket.IO

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use('/movies', require('./routes/movie'));
app.use('/user', require('./routes/user'));
app.use('/auth', require('./routes/auth'));

server.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

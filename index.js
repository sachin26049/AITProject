const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();


//routing
Test=require('./routes/test');
User=require('./routes/user');
// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
/*app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
*/
//using respective files in routes
app.use('/test',Test);
app.use('/users',User);


// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
server=app.listen(port, () => {
  console.log('Server started on port '+port);
});






const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/mevn-database', {
        useNewUrlParser: true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

// Settings
app.set('port', process.env.PORT || 3000);


// MiddleWares
app.use(morgan('dev'));
app.use(express.json());


// Routes
app.use('/tasks', require('./routes/tasks'))


// Static Files
app.use(express.static(__dirname + '/public'));

// Server Listening
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
})
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');

const WSServer = require('./WSServer');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();
const http = require('http').createServer(app);
new WSServer(http);

app.use(cors());
app.use(require('morgan')('dev'));
app.use(express.json({ extended: false }));

if (!isProduction) {
  app.use(require('errorhandler')());
}

if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  try {
    mongoose.connect('mongodb+srv://admin:admin@jeacluster-fyjhd.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
      console.log('Database connected');
    });
  } catch (e) {
    console.log(e);
  }
  mongoose.set('debug', true);
}

glob.sync('./models/*.js').forEach(file => {
  require(path.resolve(file));
});

app.use(require('./routes'));

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// DEV error handler
if (!isProduction) {
  app.use(function (err, req, res) {
    console.log(err.stack);

    res.status(err.status || 500);
    res.json({
      error: err,
      message: err.message
    });
  })
} 

// PROD error handler
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message
  });
});

const server = http.listen(process.env.PORT || 8000, () => {
  console.log('Server listening on http://127.0.0.1:' + server.address().port);
});

const WSServer = require('./WSServer');

const app = require('express')();
const http = require('http').createServer(app);

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello world');
});

const wsServer = new WSServer(http);

http.listen(port, () => {
  console.log('Server listening on http://127.0.0.1:' + port);
});

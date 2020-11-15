
const config = require('./configure/config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();

const PORT = config.PORT;

server.use(bodyParser.json());
server.use(cors());
// server.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

server.use(express.static(path.join(__dirname, '/../frontend/build')))

// .use when you are passing middleware
server.use('/api', require('./routes/api'));

// code below the last one to execute
server.use('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
})


server.listen(PORT, () => {
  console.log(`Express Server listening on port ${PORT}`)
})

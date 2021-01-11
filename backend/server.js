const config = require("./configure/config");
const express = require("express");
const path = require("path");
const cors = require("cors");
const server = express();

const PORT = config.PORT || 5000;

server.use(express.json());
server.use(cors());

// server.use(express.static(path.join(__dirname, "/../frontend/build")));

// .use when you are passing middleware
server.use("/api", require("./routes/api"));

// code below the last one to execute
// server.use("*", (req, res) => {
//   res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
// });

server.listen(PORT, () => {
  console.log(`Express Server listening on port ${PORT}`);
});

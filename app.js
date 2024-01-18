const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const { routesInit } = require("./routes/config_routes");

const app = express();

app.use(cors());

app.use(express.json());

// definition public folder as main folder
app.use(express.static(path.join(__dirname, "public")));

routesInit(app);

const server = http.createServer(app);

let port = process.env.PORT || 3002;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
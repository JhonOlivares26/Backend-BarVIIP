const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors")
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors())
app.use(fileupload({ tempFileDir: "./tmp" }));
// IMPORTAR ROUTER
const router = require("./src/routers");
const ConfigService = require("./src/services/ConfigService");
const config = new ConfigService();

app.use(router);
const PORT = config.get('port')
app.listen(PORT, () => {
  console.log(`Api run: http://localhost:${PORT}`);
});
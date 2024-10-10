const express = require("express");
require("dotenv").config;
const app = express();
const pingRouter = require("./routes/ping");
const carsRoutes = require("./routes/carsRouters");
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(pingRouter);

app.use("/cars", carsRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

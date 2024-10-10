const express = require("express");
const pingController = require("../controllers/ping");
const router = express.Router();

router.get("/", pingController.pingServers);

module.exports = router;

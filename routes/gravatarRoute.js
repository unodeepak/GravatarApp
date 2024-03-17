const express = require("express");
const routes = express.Router();
const gravatarCon = require("../controllers/gravatarController");
const checkBody = require("../middleware/validationMethod");

routes.get("/getImage", checkBody.getImageBody, gravatarCon.getImage);
routes.get("/getSpinnerText", checkBody.getTextBody, gravatarCon.getSpinnerText);

module.exports = routes;

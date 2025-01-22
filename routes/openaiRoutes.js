const express = require("express");
const {summaryController,paragraphController,chatbotController,jsconverterController} = require('../controllers/openaiController');

const router = express.Router();

//route
router.post("/summary", summaryController);
router.post("/paragraph", paragraphController);
router.post("/chatbot", chatbotController);
router.post("/js-converter", jsconverterController);


module.exports = router;
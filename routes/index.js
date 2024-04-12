var express = require('express');
var router = express.Router();
const digital_health_tool = require("../controller/digital_health_tool_controller.js")


/* GET home page. */
router.get('/', digital_health_tool.digital_health_main_page);

module.exports = router;

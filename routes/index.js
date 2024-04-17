var express = require('express');
var router = express.Router();
const digital_health_tool = require("../controller/digital_health_tool_controller.js")


/* GET home page. */
router.get('/', digital_health_tool.digital_health_main_page);

router.get('/add-tool', digital_health_tool.add_new_tool_get);

router.post('/add-tool', digital_health_tool.add_new_tool_post);

router.get('/:id',digital_health_tool.company_instance_id);

router.get('/:id/delete', digital_health_tool.company_delete_get);

router.get('/:id/update', digital_health_tool.company_update_get);

module.exports = router;

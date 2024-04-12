var express = require('express');
var router = express.Router();

const digitalHealthTools = [
  { id: 1, name: 'Tool 1', description: 'Description 1' },
];

/* GET home page. */
router.get('/', function(req, res, next) {
  const query = req.query.search;
  const filteredTools = query ?
    digitalHealthTools.filter(tool => tool.name.toLowerCase().includes(query.toLowerCase())) : digitalHealthTools;
  res.render('index', { tools: filteredTools, searchQuery: query || '' });
});

module.exports = router;

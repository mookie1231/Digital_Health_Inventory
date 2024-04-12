const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const digitalHealthTools = [
    { id: 1, name: 'Tool 1', description: 'Description 1' },
  ];

exports.digital_health_main_page = asyncHandler(async (req, res, next) => {
   const query = req.query.search;
    const filteredTools = query ?
    digitalHealthTools.filter(tool => tool.name.toLowerCase().includes(query.toLowerCase())) : digitalHealthTools;
    res.render('index', { tools: filteredTools, searchQuery: query || '' });
});
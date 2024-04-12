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

exports.add_new_tool_get = asyncHandler( async (req, res, next) => {
    res.render('add_tool')
})

exports.add_new_tool_post = asyncHandler( async (req,res,next) => {
    try {
        const { name, description } = req.body;
        const newTool = new Tool({ name, description });
        await newTool.save();
        res.redirect('/');
      } catch (err) {
        res.status(500).send("Error saving new tool.");
      }
})


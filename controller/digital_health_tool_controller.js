const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const digitalHealthTools = [
    {id: 1, name: 'Linus', description: 'Cognitive assessment based on digitized clock drawing test'},
    {id: 2, name: 'Cognoa', description: 'Medical diagnostic device to assist in autism diagnosis using computer vision on patients'},
    {id: 3, name: 'Blueberry', description: 'On demand virtual pediatric care with physicians for 15$ a month'},
    {id: 4, name: 'Curai', description: 'Virtual PCP entirely run by AI to augment provider workflow'},
    {id: 5, name: 'Origin Health', description: 'Diagnotic tool for real time detection of fetal anomolies using ultrasound scans'}
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


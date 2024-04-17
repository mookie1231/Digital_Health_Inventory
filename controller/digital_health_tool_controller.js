const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const Company = require("../models/companies")
const {body, validationResult} = require('express-validator');

const digitalHealthTools = [
    {id: 1, name: 'Linus', description: 'Cognitive assessment based on digitized clock drawing test'},
    {id: 2, name: 'Cognoa', description: 'Medical diagnostic device to assist in autism diagnosis using computer vision on patients'},
    {id: 3, name: 'Blueberry', description: 'On demand virtual pediatric care with physicians for 15$ a month'},
    {id: 4, name: 'Curai', description: 'Virtual PCP entirely run by AI to augment provider workflow'},
    {id: 5, name: 'Origin Health', description: 'Diagnotic tool for real time detection of fetal anomolies using ultrasound scans'}
  ];

exports.digital_health_main_page = asyncHandler(async (req, res, next) => {
  const allCompanies = await Company.find({}, "name description")
  .sort({ name: 1 })
  .exec();

  res.render("index", { title: "Mookies Book List", company_list: allCompanies });
});

exports.add_new_tool_get = asyncHandler( async (req, res, next) => {
    res.render('add_tool')
})

exports.add_new_tool_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified."),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified."),
  
  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data
    const company = new Company({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("error_page");
      return;

    } else {
      // Data from form is valid.

      // Save author.
      await company.save();
      // Redirect to new author record.
      res.redirect("/")
      
    }
  }),
];


exports.company_instance_id = asyncHandler(async (req,res,next) => {
    const companyinfo = await Company.findById(req.params.id)
      .exec();
  
    if (companyinfo === null) {
      // No results.
      const err = new Error("Book copy not found");
      err.status = 404;
      return next(err);
    }
  
    res.render("companyinstance", {
      company: companyinfo,
    });
})

exports.company_update_get = asyncHandler(async (req, res, next) => {
  const [company] = await Promise.all([
    Company.findById(req.params.id).exec(),
  ]);

  if (company === null) {
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  res.render("company_update", {
    title: "Update Company Info",
    company: company,
  });
});



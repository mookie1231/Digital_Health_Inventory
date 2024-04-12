const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  company_name: { type: String, required: true, maxLength: 10000 },
  company_description: {type: String, required: true},
  number_of_employees: {type: Int32},
  family_name: { type: String, required: true, maxLength: 100 },
  date_founded: { type: Date },
});
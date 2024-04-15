const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: { type: String, required: true, maxLength: 10000 },
  description: {type: String, required: true},
});

companySchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/${this._id}`;
});

// Export model
module.exports = mongoose.model("companies", companySchema);


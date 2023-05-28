const mongoose = require("mongoose");
const constants = require('../utils/constants');
mongoose.set("strictQuery", false);
const mongoDB = constants.mongoDbConnectionString;

module.exports = mongoose.connect(mongoDB);

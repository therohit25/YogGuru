const mongoose = require("mongoose");

require("dotenv").config({
  path: "./data/config.env",
});
mongoose.connect(process.env.MONGO_URI);

module.exports = mongoose;

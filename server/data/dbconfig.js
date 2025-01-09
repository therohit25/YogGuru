const mongoose = require("mongoose");

require("dotenv").config({
  path: "./data/config.env",
});
try {
  mongoose.connect(process.env.MONGO_URI);
} catch (error) {
  console.error(error);
}

module.exports = mongoose;

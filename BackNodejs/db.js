const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(config.mongoDBConfig.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });

module.exports = mongoose.connection;

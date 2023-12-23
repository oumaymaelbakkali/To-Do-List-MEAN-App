"use strict";
const dotenv = require("dotenv");
const assert = require("assert");
const { MongoClient } = require("mongodb");

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  MONGODB_URI,
  MONGODB_DATABASE,
} = process.env;

assert(PORT, "PORT is required");
assert(HOST, "HOST is required");

module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  mongoDBConfig: {
    uri: MONGODB_URI,
    database: MONGODB_DATABASE,
  },
  async connectToMongoDB() {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    } finally {
      
    }
  },
};

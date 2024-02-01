const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<username>", process.env.USER).replace(
  "<password>",
  process.env.PASSWORD
);

// const DB = "mongodb://localhost:27017/";

mongoose
  .connect(DB)
  .then(function (i) {
    console.log("Database is Connected");
  })
  .catch(function (err) {
    console.log(err);
  });

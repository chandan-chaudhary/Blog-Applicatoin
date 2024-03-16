const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = require("./app");

// console.log(process.env);

const database = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(database).then(() => {
  console.log("databse connected");
});
const port = 5500;
const server = app.listen(port, () => {
  console.log("backend connect through " + port);
});

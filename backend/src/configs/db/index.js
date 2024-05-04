const mongoose = require("mongoose");
const { env } = require("../../configs/environment");

async function connect() {
  try {
    await mongoose.connect(env.MONGODB_URL);
    console.log("Connect Successfully");
  } catch (err) {
    console.log("Connect False");
  }
}

module.exports = { connect };

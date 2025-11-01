const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User"); // path to your User model
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

async function createUser() {
  const hashedPassword = await bcrypt.hash("123456", 10); // your test password
  const user = new User({
    name: "Edison",
    email: "edison@example.com",
    password: hashedPassword
  });

  await user.save();
  console.log("User created!");
  mongoose.disconnect();
}

createUser();

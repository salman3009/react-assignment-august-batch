var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      async validator(value) {
        const emailexist = await checkEmailExists(User, value);
        return !emailexist;
      },
      message: "Email already exists",
    },
  },
});

const User = mongoose.model("User", userSchema);

async function checkEmailExists(User, email) {
  const count = await User.countDocuments({ email });
  // console.log(email);
  // console.log(count);
  return count !== 0;
}

module.exports = User;

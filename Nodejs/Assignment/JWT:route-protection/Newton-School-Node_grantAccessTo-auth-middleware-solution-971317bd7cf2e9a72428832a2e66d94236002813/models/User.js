const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (value.length < 4) {
          throw new Error("username must be at least 4 characters long");
        }
        if (/\s/.test(value)) {
          throw new Error("username cannot contain spaces");
        }
        if (/[^a-zA-Z0-9]/.test(value)) {
          throw new Error("username cannot contain special characters");
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (value.length < 8) {
          throw new Error("password should be at least 8 characters long");
        }
      },
    },
    role: {
      type: String,
      default: "guest",
      enum: ["guest", "user", "admin", "superadmin"],
    },
  },
  { timestamps: true }
);

// pre-save hook to hash password before saving to the database
userSchema.pre("save", async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

module.exports = mongoose.model("User", userSchema);

var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      async validator(value) {
        const nameexist = await checknameExists(Product, value);
        return !nameexist;
      },
      message: "Product Name already exists",
    },
  },
  description:{
    type: String,
    required:true
  },
  price:{
      type: Number,
      required:true
  }
});

const Product = mongoose.model("User", productSchema);

async function checknameExists(User, name) {
  const count = await User.countDocuments({ name });
  console.log(name);
  console.log(count);
  return count !== 0;
}

module.exports = Product;

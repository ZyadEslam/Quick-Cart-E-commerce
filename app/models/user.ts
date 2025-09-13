import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cart: [
    {
      _id: String,
      name: String,
      description: String,
      rating: Number,
      price: Number,
      oldPrice: Number,
      discount: String,
      category: String,
      brand: String,
      color: String,
      quantity: Number,
      quantityInCart: Number,
      imgSrc: [String],
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: [],
    },
  ],
});
const User = mongoose.models.User || mongoose.model("User", userSchema); // see if the user is already exist & if not create a new one
export default User;

import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone Number is required"],
  },
  pinCode: {
    type: String,
    required: [true, "Pin Code is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  city: {
    type: String,
    required: [true, "City is Required"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Address =
  mongoose.models.Address || mongoose.model("Address", addressSchema); // see if the user is already exist & if not create a new one
export default Address;

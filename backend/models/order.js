import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const OrderSchema = new mongoose.Schema({
  billingDetails: {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postcode: { type: String, required: true },
  },
  orderno: {
    type: String,
    default: () => `Claws${uuidv4()}`, // Prefix with "Claws" and generate a UUID
    unique: true,
  },
  razorpayOrderId: { type: Object },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  deliveryDate: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setDate(date.getDate() + 6); // Set delivery date to 6 days after the current date
      return date;
    },
  },
  total: { type: Number, required: true },
  user: { type: String, required: true },
  cartData: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      images: [{ type: String, required: true }],
      colors: [{ type: String, required: true }],
      size: [{ type: String, required: true }],
    },
  ],
},
{
  timestamps: true,
},);

export default mongoose.model("Order", OrderSchema);

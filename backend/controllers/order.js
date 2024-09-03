import Order from "../models/order.js";
import Razorpay from "razorpay";
import Product from "../models/product.js";
import crypto from "crypto";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const OrdersController = {
  getOrders: async (req, res) => {
    try {
      // if (!req.query.page || !req.query.limit)
      //   throw new Error("Page, Limit is required !");

      const skipUsers = (req.query.page - 1) * req.query.limit;
      const ITEM_PER_PAGE = req.query.page * req.query.limit;

      const orders = await Order.find({
        ...(req.query.isDelivered
          ? { isDelivered: req.query.isDelivered === "true" ? true : false }
          : {}),
        ...(req.query.isPaid
          ? { isPaid: req.query.isPaid === "true" ? true : false }
          : {}),
        ...(req.query.mode ? { mode: req.query.mode } : {}),
      })
        .sort({ priority: -1, createdAt: -1 })
        .skip(skipUsers)
        .limit(req.query.limit);

      const totalOrders = await Order.find({
        ...(req.query.isDelivered
          ? { isDelivered: req.query.isDelivered === "true" ? true : false }
          : {}),
        ...(req.query.isPaid
          ? { isPaid: req.query.isPaid === "true" ? true : false }
          : {}),
        ...(req.query.mode ? { mode: req.query.mode } : {}),
      }).count();

      res.status(200).send({
        succss: true,
        message: orders,
        totalOrders,
        hasNextPage: ITEM_PER_PAGE < totalOrders,
        hasPreviousPage: req.query.page > 1,
      });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  getOrder: async (req, res) => {
    try {
      const data = await Order.find({user: req.params._id});
      return res.status(200).json({ message: data });
    } catch (error) {
      res.status(400).json({ message: err.message });
    }
  },
  createOrder: async (req, res) => {
    try {
      const { billingDetails, total, cartData, user } = req.body;
  
      // Validate the request body
      if (!billingDetails || !total || !cartData || !user) {
        throw new Error("billingDetails, total, and cartData are required!");
      }
  
      // Calculate total amount for verification (optional step)
      const calculatedTotal = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
      // Ensure the total from the client matches the calculated total
      // if (total !== calculatedTotal - 0) {
      //   throw new Error("Total amount mismatch!");
      // }
  
      // Create Razorpay order
      const razorpayOptions = {
        amount: total * 100, // amount in paise
        currency: 'INR',
        receipt: `receipt_order_${Date.now()}`,
      };
  
      const razorpayOrder = await razorpayInstance.orders.create(razorpayOptions);
      console.log(razorpayOrder);
  
      // Save the order details in the database
      const order = await Order.create({
        billingDetails,
        total,
        cartData,
        user,
        razorpayOrderId: razorpayOrder, // Save Razorpay order ID for later verification
      });
  
      // Return a success response to the client with Razorpay order ID
      return res.status(201).json({
        message: "Order created successfully",
        order_id: razorpayOrder.id, // Send Razorpay order ID to the client
      });
  
    } catch (err) {
      // Handle errors
      res.status(400).json({ message: err.message });
    }
  },
  
  updateOrder: async (req, res) => {
    try {
      let params = { ...req.body };

      const updatedOrder = await Order.findByIdAndUpdate(
        req.params._id,
        params,
        { new: true }
      );

      return res.status(200).json({ message: updatedOrder, status: true });
    } catch (error) {
      res.status(400).json({ message: err.message });
    }
  },
  paymentVerification: async (req, res) => {
    try {
      const { paymentId, orderId, razorpaySignature } = req.body;

      if (!paymentId || !orderId || !razorpaySignature){
        return res.status(400).json({ message: "paymentId, orderId or razorpaySignature is missing in body!" });
      }
       
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(orderId + "|" + paymentId)
        .digest("hex");

      if (expectedSignature !== razorpaySignature)
        throw new Error("Payment Not Verifed! Something went wrong");

      await Order.findOneAndUpdate(
        {
          orderId,
        },
        {
          isPaid: true,
        }
      );

      res.status(200).json({ message: "your payment is verified" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
  getKey: async (req, res) => {
    try {
      return res.status(200).json({ key: process.env.RAZORPAY_API_KEY });y
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
};

export default OrdersController;

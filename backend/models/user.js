import mongoose from "mongoose";

let validations = (type, extras) => {
  return {
    type,
    ...extras,
  };
};

const userSchema = mongoose.Schema(
  {
    name: { ...validations(String) },
    address: { ...validations(String) },
    number: { ...validations(Number) },
    images: [{ ...validations(String) }],
    email: { ...validations(String, { lowercase: true }) },
    role: {
      ...validations(String, {
        enum: ["ADMIN", "USER"],
        default: "USER"
      }),
    },
    password: { ...validations(String) },
    couponCode: { ...validations(String, {required: false}) },
    couponPrice: { ...validations(Number, {required: false}) },
    tokenVersion: { ...validations(Number, { default: 0 }) },
    resetToken: String,
    expireToken: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
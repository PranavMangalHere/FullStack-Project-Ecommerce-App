const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
    items: [{
      productId: { type: String, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
    }],
  },
);

module.exports = mongoose.model("Cart", cartSchema);
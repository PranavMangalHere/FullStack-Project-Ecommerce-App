const express = require("express");
const Cart = require("../models/cart");

const router = express.Router();

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const cart = await Cart.findOne({ username });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/abc", async (req, res) => {
  const { username, items } = req.body;

  if (!username || !items) {
    return res.status(400).json({ message: "User ID and items are required" });
  }

  try {
    let cart = await Cart.findOne({ username });

    if (cart) {
      
      cart.items = items;
    } else {
      // Create a new cart
      cart = new Cart({ username, items });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove an Item from the Cart
router.delete("/:username/:productId/:size", async (req, res) => {
  const { username, productId, size } = req.params;

  try {
    const cart = await Cart.findOne({ username });

    if (cart) {
      cart.items = cart.items.filter(
        (item) => !(item.productId === productId && item.size === size)
      );

      await cart.save();
      return res.json(cart);
    }

    res.status(404).json({ message: "Cart not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
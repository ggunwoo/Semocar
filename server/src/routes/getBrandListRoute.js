import express from "express";
import Brand from "../models/brand.js";

const router = express.Router();

router.get("/brands", async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.json(brands);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;

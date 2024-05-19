import express from "express";
import Brand from "../models/brand.js";

const router = express.Router();

router.get('/brands/:id', async (req, res) => {
  try {
    const brandId = req.params.brand;
    const brand = await Brand.findById(brandId);
    if (!brand) {
      return res.status(404).send({ message: '브랜드를 찾을 수 없습니다.' });
    }
    res.send(brand);
  } catch (err) {
    res.status(500).send({ message: '브랜드 데이터를 가져오는 중 오류가 발생했습니다.', error: err.message });
  }
});

export default router;
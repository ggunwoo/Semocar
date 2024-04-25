import express  from "express";
import Brand from "../models/brand.js"; // Model

const router = express.Router();

// 브랜드 생성 POST 요청
router.post('/create/brand', async (req, res) => {
  try {
    const { name, english_name, id, logo_path} = req.body;
    const newBrand = new Brand({
      name,
      english_name,
      logo_path,
      id,
    });

    await newBrand.save();
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.write("<script>alert('전송완료')</script>");
    res.write("<script>window.location=\"/create\"</script>");
} catch (error) {
    res.write(`<script>alert('전송실패' ${error})</script>`);
    res.status(500).send(error.message);
}
})

export default router;
import express, { Request, Response }  from "express";
import Brand from "../models/brand"; // Model

const router = express.Router();

// 브랜드 생성 POST 요청
router.post('/brand', async (req: Request, res:Response) => {
  try {
    const { kr, en, id, logo_path, tagline} = req.body;
    const newBrand = new Brand({
      name: {kr, en},
      logo_path,
      tagline,
      id,
    });

    await newBrand.save();
    res.redirect('/');  // 성공 시 메인 페이지로 리다이렉트
} catch (error: any) {
    res.status(500).send(error.message);
}
})

export default router;
import mongoose from "mongoose";

// Brand 생성 스키마
const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  english_name: { type: String, required: true },
  logo_path: { type: String, required: true },
  id: {type: Number, required: true}
});

const Brand = mongoose.model("Brand", BrandSchema);

export default Brand;

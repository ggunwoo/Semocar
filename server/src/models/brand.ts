import mongoose, { Schema, Document } from "mongoose";

// Brand 생성 인터페이스
interface IBrand extends Document {
  name: string;
  english_name: string;
  id: Number;
  img: String;
  logo_path: String;
  tagline: String;
}

// Brand 생성 스키마
const BrandSchema: Schema = new Schema({
  name: { type: String, required: true },
  english_name: { type: String, required: true },
  logo_path: { type: String, required: true },
  id: {type: Number, required: true}
});

const Brand = mongoose.model<IBrand>("Brand", BrandSchema);

export default Brand;

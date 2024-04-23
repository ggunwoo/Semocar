import mongoose, { Schema, Document } from "mongoose";

// Brand 인터페이스
interface IBrand extends Document {
  name: { kr: string; en: string };
  id: Number;
  img: String;
  logo_path: String;
  tagline: String;
}

const BrandSchema: Schema = new Schema({
  name: {
    kr: { type: String, required: true },
    en: { type: String, required: true },
  },
  logo_path: { type: String, required: true },
  tagline: { type: String, required: true},
  id: {type: Number, required: true}
});

const Brand = mongoose.model<IBrand>("Brand", BrandSchema);

export default Brand;

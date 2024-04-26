import mongoose from "mongoose";

// 임시 모델
const adminSchema = new mongoose.Schema({
  password: String,
});

const User = mongoose.model("User", adminSchema);

export default User;

import axios from "axios";
import { serverUrl } from "./getCarData";

const verifyPassword = async (pw: string) => {

  try {
    console.log(serverUrl)
    const response = await axios.post(
      `${serverUrl}/api/verify-password`, // 어드민 비밀번호 검증 요청
      {
        password: pw,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error verifying password:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};

export default verifyPassword;

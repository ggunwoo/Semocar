import axios from "axios";

const verifyPassword = async (pw: string) => {

  const serverUrl = process.env.WEB_SERVER_URL
  
  try {
    console.log(serverUrl)
    const response = await axios.post(
      `${serverUrl}/api/verify-password`,
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

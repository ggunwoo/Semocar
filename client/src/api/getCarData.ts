import axios from "axios";

const serverUrl = process.env.LOCAL_SERVER_URL

export const getCarData = async () => {
  try {
    const response = await axios.get(
      "https://gist.githubusercontent.com/ggunwoo/3bec1be58457d14aab3e04fea8434458/raw/4076fd0af826abcdecc5a931d43f886a2c78f704/CarData.json"
    );
    return response.data;
  } catch (error) {
    console.log("error car data", error);
    return null;
  }
};

export const getBrands = async () => {
  try {
    const response = await axios.get(`${serverUrl}/brands`)
    return response.data;
  } catch (error) {
    console.log("error get brand", error);
    return null;
  }
};
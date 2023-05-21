import axios from 'axios';

export const getCarData = async () => {
  try {
    const response = await axios.get('https://gist.githubusercontent.com/pgw6541/90d2ef96af5ee04f47091e3f506cf9f5/raw/01a1f90c50bba521c61cd6817d9e26339b42df89/carData.json');
    return response.data;
  } catch (error) {
    console.log('error carinfo', error);
    return null;
  }
};

export const getCarBrands = async () => {
  try {
    const response = await axios.get('https://gist.githubusercontent.com/pgw6541/9db3dd7dc7fe2c28d1c529e47b7d062b/raw/8da4d58d4b959f86d7d189897ff0507489515fb0/brand');
    return response.data;
  } catch (error) {
    console.log('error brand', error);
    return null;
  }
};
import axios from 'axios';

export const getCarData = async () => {
  try {
    const response = await axios.get('https://gist.githubusercontent.com/pgw6541/9db3dd7dc7fe2c28d1c529e47b7d062b/raw/c520d0421ce181d6d9bd1e57cafdfcf17f7caf27/carData.json');
    return response.data;
  } catch (error) {
    console.log('error car data', error);
    return null;
  }
};

export const getCarBrands = async () => {
  try {
    const response = await axios.get('https://gist.githubusercontent.com/pgw6541/9db3dd7dc7fe2c28d1c529e47b7d062b/raw/5878bf8542383ad4c2e0bda6dbe19fdcb9d8ca9b/brand.json');
    return response.data;
  } catch (error) {
    console.log('error brand data', error);
    return null;
  }
};
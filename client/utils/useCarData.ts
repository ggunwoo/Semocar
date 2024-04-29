import { useEffect, useState } from 'react';
import { getCarData, getCarBrands } from './getCarData';
import * as type from '../src/types/types'

export const useCarData = () => {
  const [carData, setCarData] = useState<type.Car[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCarData();
        setCarData(data);
      } catch (error) {
        console.log('Error fetching car data:', error);
      }
    };

    fetchData();
  }, []);

  return carData;
};

export const useCarBrands = () => {
  const [carBrands, setCarBrands] = useState<type.Brands[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCarBrands();
        setCarBrands(data);
      } catch (error) {
        console.log('Error fetching car data:', error);
      }
    };
    fetchData();
  }, []);

  return carBrands
}
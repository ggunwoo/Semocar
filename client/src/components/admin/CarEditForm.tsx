import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCar } from "../../store/slice/useCarSlice";
import * as type from "../../types/types";

export default function CarEditForm({ carId }) {
  const dispatch = useAppDispatch();
  const [carData, setCarData] = useState<type.CarType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCarData = async () => {
      setIsLoading(true);
      const response = await dispatch(fetchCar(carId)).unwrap();
      setCarData(response);
      setIsLoading(false);
    };

    loadCarData();
  }, [carId, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!carData) {
    return <p>차량 데이터를 불러오지 못했습니다.</p>;
  }

  console.log(carData);

  return (
    <article className={`detail_article`}>
      <dl>
        <dt>id :</dt>
        <dd>{carData.id}</dd>

        <dt>모델명 : </dt>
        <dd>{carData.model}</dd>

        <dt>브랜드 : </dt>
        <dd>{typeof carData.brand === "string" ? carData.brand : (carData.brand as type.BrandType).name}</dd>

        <dt>차량명 : </dt>
        <dd>{carData.name}, {carData.english_name}</dd>

        <dt>이니셜 : </dt>
        <dd>{carData.model_initial}</dd>

        <dt>이미지 URL : </dt>
        <dd>{carData.image_path}</dd>

        <dt>차급 : </dt>
        <dd>{carData.segment}</dd>

        <dt>출시일 : </dt>
        <dd>{carData.date.year}.{carData.date.month.toString().length === 1 ? "0"+carData.date.month : carData.date.month }</dd>

        <dt>연료 종류 : </dt>
        <dd>{carData.fuel_types.map(ft=>( ft.name+", " ))}</dd>

        <dt>등급 </dt>
        <dd>{carData.grades.map(grade => (grade.name+", "))}</dd>
      </dl>

      <dl>
        <dt></dt>
        <dd></dd>
      </dl>
    </article>
  );
}

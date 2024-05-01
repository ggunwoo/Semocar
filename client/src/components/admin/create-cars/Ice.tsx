import { useEffect } from "react";
import axios from "axios"
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { fetchBrands } from "../../../store/slice/brands";

export default function CreateICEPage(){
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBrands()); // Redux => Brands fetch함수 실행
  }, []);

  const handleSubmit = () => {

  }

  return (
    <article className="grid gap-4 place-content-center text-center">
      <h1 className="text-2xl">가솔린, 디젤, LPG, 하이브리드 차량</h1>
      {/* ■■■■ 차량 제원 전송 폼 ■■■■*/}
      <form>
        <label htmlFor=""></label>
        <input type="text" />
      </form>
    </article>
  )
}
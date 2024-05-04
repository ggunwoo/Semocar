import "../../../styles/components/form.scss";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { submitFormData } from "../../../store/slice/formDataSlice";
import BaseCarForm from "./baseForm";
import Grades_Trims_Form from "./gradesForm";

export default function CreateCarPage() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(state => state.formSlice.formData);
  const [submitEnable, setSubmitEnable] = useState(false);

  // --FormData 변화를 감지하고 값이 전부 할당되면 전송버튼 활성화
  useEffect(() => {
    handleSubmitEnable();
  }, [formData]);

  const handleSubmitEnable = () => {
    // formData에 값들이 전부 존재할때(빈 값이 존재하지않을 때) submit 버튼 활성화하기
    const allFilled = Object.values(formData).every(x => {
      if (typeof x === "string") return x.trim() !== "";
      if (typeof x === "number") return x !== 0;
      if (Array.isArray(x)) return x.length > 0 && x.every(item => item.name && item.name.trim() !== "");
      return true;
    });
    setSubmitEnable(allFilled);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitFormData());
  };

  return (
    <div>
      <section>
        <p className="text-1xl">차량 정보 등록</p>
        {/* 차량 제원 전송 폼 */}
        <form onSubmit={handleSubmit} className="form">
          <BaseCarForm />

          {/* Grades+TrimsForm */}
          <Grades_Trims_Form />
          
          <button type="submit" className="submit" disabled={!submitEnable}>
            {/* ■ 전송 버튼 ■ */}
            DB전송
          </button>
        </form>
      </section>

    </div>
  );
}

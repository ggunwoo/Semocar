import "../../../styles/components/form.scss";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { submitFormData } from "../../../store/slice/formDataSlice";
import BaseCarForm from "./baseForm";
import Grades_Trims_Form from "./gradesForm";

export default function CreateCarPage() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(state => state.baseForm.formData);


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
          {/* 기본제원 Form */}
          <BaseCarForm />

          {/* 등급별 트림(Grades, Trims) Form */}
          <Grades_Trims_Form />
        </form>
      </section>

    </div>
  );
}

import "../../../styles/components/form.scss";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { submitFormData } from "../../../store/slice/createCarSlice";
import BaseCarForm from "./baseForm";
import Grades_Trims_Form from "./gradeForm";

export default function CreateCarPage() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(state => state.createCar.formData);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitFormData());
  };

  return (
    <div>
      <section>
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

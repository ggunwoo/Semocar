import "../../../styles/form.scss";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { submitFormData } from "../../../store/api/carApi";
import BaseCarForm from "./BaseForm";
import Grades_Trims_Form from "./GradeForm";

export default function CreateCarPage() {
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitFormData());
  };
  return (
    <section>
      {/* 차량 제원 전송 폼 */}
      <form onSubmit={handleSubmit} className="form">
        {/* 기본제원 Form */}
        <BaseCarForm />

        {/* 등급별 트림(Grades, Trims) Form */}
        <Grades_Trims_Form />
      </form>
    </section>
  );
}

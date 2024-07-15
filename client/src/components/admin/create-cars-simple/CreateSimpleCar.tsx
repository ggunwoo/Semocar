import "../../../styles/form.scss";
import { useAppDispatch } from "../../../store/hooks";
import { submitSimpleFormData } from "../../../store/api/carApi";
import BaseCarSimpleForm from "./BaseSimpleForm";
import Grades_Trims_SimpleForm from "./GradeSimpleForm";

export default function CreateCarPage() {
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitSimpleFormData());
  };
  return (
    <section>
      {/* 차량 제원 전송 폼 */}
      <form onSubmit={handleSubmit} className="form">
        {/* 기본제원 Form */}
        <BaseCarSimpleForm />

        {/* 등급별 트림(Grades, Trims) Form */}
        <Grades_Trims_SimpleForm />
      </form>
    </section>
  );
}

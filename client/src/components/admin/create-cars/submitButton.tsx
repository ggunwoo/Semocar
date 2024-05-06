import { useState, useEffect } from "react";
import { useAppSelector } from "../../../store/hooks";

export default function SubmitButton() {
  const formData = useAppSelector(state => state.baseForm.formData);
  const [submitEnable, setSubmitEnable] = useState(false);

  //--FormData 변화를 감지하고 값이 전부 할당되면 전송버튼 활성화
  useEffect(() => {
    handleSubmitEnable();
  }, [formData]);

  const handleSubmitEnable = () => {
    //--formData에 값들이 전부 존재할때(빈 값이 존재하지않을 때) submit 버튼 활성화하기
    const allFilled = Object.values(formData).every(v => {
      if (typeof v === "string") return v.trim() !== ""; //--빈 문자열 체크
      if (typeof v === "number") return v !== 0; //--숫자 0 체크
      if (Array.isArray(v)) return v.length > 0 && v.every(item => item.name && item.name.trim() !== ""); //--빈배열 및 배열 이름이 빈 문자열인지 체크
      return true;
    });
    setSubmitEnable(allFilled);
  };

  return (
    <button type="submit" className="submit" disabled={!submitEnable}>
      DB전송
    </button>
  );
}

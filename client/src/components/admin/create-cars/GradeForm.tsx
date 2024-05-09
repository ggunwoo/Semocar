import "../../../styles/components/form.scss";
import TrimForm from "./TrimFrom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateField, addGrade, removeGrade } from "../../../store/slice/createCarSlice";

// TODO : 하단에 grades 추가 버튼으로 grades 개수를 늘릴수 있게끔 구현
// TODO : grades안에 마찬가지로 Trims를 추가할 수 있는 버튼 구현
// TODO : grades객체들을 배열로 할당 후 id값으로 오름차순 정렬 trims 또한 마찬가지

export default function GradesForm() {
  const dispatch = useAppDispatch();
  const grades = useAppSelector(state => state.createCar.formData.grades);

  // --TODO--
  // grades index는 객체 id로 할당,
  // grades는 grades state에 배열로 저장(push),
  // 새로 추가된 grades는 다음 배열아이템이 되도록 설계
  // index는 배열에 자릿값으로 사용하기,
  // --------
  // --formData state 변경 처리 함수
  const handleChange = (e, type) => {
    const { name, value } = e.target;
    //  --type에 따른 value변환 후 값 전달
    if (type === "string") dispatch(updateField({ name: name, value: String(value) }));
    if (type === "number" && !isNaN(value)) dispatch(updateField({ name: name, value: Number(value) }));
  };

  const handleAddGrades = () => {
    dispatch(addGrade());
  };
  const handleRemoveGrades = id => {
    dispatch(removeGrade(id));
  };

  return (
    <article className="right-form-container">
      {grades.map((grade, index) => (
        <section key={index} className="grades">
          <article className="head">
            <h2>Grade {grades[index].id}</h2>
            {grades[index].id !== 1 && (
              <button
                type="button"
                onClick={() => {
                  handleRemoveGrades(grades[index].id);
                }}>
                X
              </button>
            )}
          </article>
          <label>
            name:
            <input
              type="text"
              name={`grades.${index}.name`}
              value={grades[index].name}
              onChange={e => {
                handleChange(e, "string");
              }}></input>
          </label>
          <label>
            id:
            <input readOnly type="text" name={`grades.${index}.id`} value={grades[index].id}></input>
          </label>
          <TrimForm gradeIdx={index} />
        </section>
      ))}
      <button type="button" onClick={handleAddGrades}>
        Grades 추가 버튼
      </button>
    </article>
  );
}

import { useState } from "react";
import "../../../styles/components/form.scss";
import TrimesForm from "./TrimsFrom";

// TODO : 하단에 grades 추가 버튼으로 grades 개수를 늘릴수 있게끔 구현
// TODO : grades안에 마찬가지로 Trims를 추가할 수 있는 버튼 구현
// TODO : grades객체들을 배열로 할당 후 id값으로 오름차순 정렬 trims 또한 마찬가지

export default function GradesForm() {
  const [gradesCount, setGradesCount] = useState<number>(1);
  const [grades, setGrades] = useState(new Array(gradesCount).fill([]));

  console.log(gradesCount);
  console.log(grades);

  const handleChange = (e, index) => {};

  return (
    <article className="right-form-container">
      {Array(gradesCount)
        .fill(0)
        .map((_, index) => (
          <section>
            <h2>Grades</h2>
            <label>
              name:
              <input></input>
            </label>
            <label>
              id:
              <input></input>
            </label>
            <TrimesForm id={index} />
          </section>
        ))}
      <button
        type="button"
        onClick={() => {
          setGradesCount(gradesCount + 1);
        }}>
        Grades 추가 버튼
      </button>
      <button
        type="button"
        onClick={() => {
          setGradesCount(gradesCount - 1);
        }}>
        Grades 삭제 버튼
      </button>
    </article>
  );
}

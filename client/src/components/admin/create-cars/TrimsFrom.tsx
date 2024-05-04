import { useState } from "react";
import "../../../styles/components/form.scss";

// TODO : props.id 값은 grades에 index값
export default function TrimesForm(id) {
  const [trimsCount, setTrimsCount] = useState<number>(1);
  const [trims, setTrims] = useState([]);

  console.log(trimsCount);

  return (
    <article>
      {Array(trimsCount).fill(
        <section>
          <h3>Trims</h3>
          <label>
            name:
            <input></input>
          </label>
          <label>
            id:
            <input></input>
          </label>
        </section>
      )}
      <button
        type="button"
        onClick={() => {
          setTrimsCount(trimsCount + 1);
        }}>
        Trims 추가 버튼
      </button>
      <button
        type="button"
        onClick={() => {
          setTrimsCount(trimsCount - 1);
        }}>
        Trims 삭제 버튼
      </button>
    </article>
  );
}

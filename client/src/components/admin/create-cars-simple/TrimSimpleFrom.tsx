// import "../../../styles/components/form.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateFieldSP, addTrimSP, removeTrimSP } from "../../../store/slice/createCarSimpleSlice";
import { useEffect, useState } from "react";

// TODO : props.id 값은 grades에 index값
export default function TrimeForm({ gradeIdx }) {
  const dispatch = useAppDispatch();
  const grade = useAppSelector(state => state.createCarSimple.formData.grades[gradeIdx]); // --grade로 부터 index값을 받아와 해당 trim이 존재하는 grade로 접근
  const trims = grade.trims; // --grade 접근 후 trim배열에 접근
  const [isShowField, setIsShowfield] = useState([]);
  // TODO:: true일때만 field 보여주기

  useEffect(() => {
    setIsShowfield(Array(trims.length).fill(false));
  }, [trims.length]);

  const toggleDropdown = index => {
    setIsShowfield(isShowField.map((field, idx) => (idx === index ? !field : field)));
  };

  // --formData state 변경 처리 함수
  const handleChange = (e, type) => {
    const { name, value } = e.target;
    //  --type에 따른 value변환 후 값 전달
    if (type === "string") dispatch(updateFieldSP({ name: name, value: String(value) }));
    if (type === "number" && !isNaN(value)) dispatch(updateFieldSP({ name: name, value: Number(value) }));
  };

  const handleAddTrim = gradeId => {
    dispatch(addTrimSP(gradeId));
  };
  const handleRemoveTrim = (gradeIdx, id) => {
    dispatch(removeTrimSP({ gradeIdx, id }));
  };

  return (
    <article className="trims">
      {trims?.map((trim, index) => (
        <section key={index} className="section-trim">
          <article className="head">
            <h4>Trim {trim.id}</h4>
            <button
              type="button"
              onClick={() => {
                handleRemoveTrim(gradeIdx, trim.id);
              }}>
              X
            </button>
            <button
              type="button"
              onClick={() => {
                toggleDropdown(index);
              }}>
              {isShowField[index] ? "up" : "down"}
            </button>
          </article>
          <article className={`field ${isShowField[index] ? `show` : "hide"}`}>
            {/* TODO : 연료 종류에서 체크된 연료만 유형에 나오게끔 설계 */}
            <label>
              유형 선택
              <select
                name={`grades.${gradeIdx}.trims.${index}.field`}
                value={grade.trims[index].field}
                onChange={e => {
                  handleChange(e, "string");
                }}>
                <option value="ICE">ICE</option>
                <option value="HEV">HEV</option>
                <option value="PHEV">PHEV</option>
                <option value="EV">EV</option>
              </select>
            </label>
            {/* 전 차량 필수 필드 */}
            <label>
              id: <input readOnly type="text" value={trim.id} className="id" />
            </label>
            <label>
              트림명:
              <input
                type="text"
                name={`grades.${gradeIdx}.trims.${index}.name`}
                value={trim.name}
                onChange={e => {
                  handleChange(e, "string");
                }}
                className="name"
              />
            </label>
            <label>
              가격:
              <input
                type="number"
                name={`grades.${gradeIdx}.trims.${index}.price`}
                value={trim.price !== 0 ? trim.price : ""}
                onChange={e => {
                  handleChange(e, "number");
                }}
                className="price"
              />
              만원
            </label>
          </article>
          <button
            type="button"
            style={{ margin: "6px 0" }}
            onClick={() => {
              toggleDropdown(index);
            }}>
            {isShowField[index] ? "up" : "down"}
          </button>
        </section>
      ))}
      {/* TODO : 트림 추가 버튼 */}
      <button
        type="button"
        onClick={() => {
          handleAddTrim(grade.id);
        }}>
        Trim 추가
      </button>
    </article>
  );
}

import "../../../styles/components/form.scss";
import * as types from "../../../types/types";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { fetchBrands } from "../../../store/slice/brands";
import { segments, months } from "../../../../utils/constants"; // 상수 데이터 불러오기
import { updateField, addFuelType, removeFuelType } from "../../../store/slice/formDataSlice";
import SubmitButton from "./submitButton";
// ===============================================================
//
// ===============================================================
// --TODO : 기본 스키마 -> grades -> trims 전송 폼 설계, grades와 trims의 개수는 상이하며 배열 데이터로 전송
// --TODO : grades와 trims 추가 버튼으로 배열 개수
// --TODO : formData api 설계

export default function BaseCarForm() {
  const dispatch = useAppDispatch();
  // checkbox와 배열 정렬을 위한 복사데이터
  const [fuelTypes, setFuelTypes] = useState([
    { name: "가솔린", id: 1, checked: false },
    { name: "디젤", id: 2, checked: false },
    { name: "LPG", id: 3, checked: false },
    { name: "하이브리드", id: 4, checked: false },
    { name: "전기", id: 5, checked: false },
    { name: "수소", id: 6, checked: false },
  ]);
  const brandsSlice = useAppSelector(state => state.brands);
  const formData = useAppSelector(state => state.baseForm.formData);
  const getFuelTypes = useAppSelector(state => state.baseForm.formData.fuel_types);

  useEffect(() => {
    if (brandsSlice.status === "idle") {
      dispatch(fetchBrands()); // --Redux => Brands fetch함수 실행
    }
  }, []);

  // --formData state 변경 처리 함수
  const handleChange = e => {
    const { name, value } = e.target;
    dispatch(updateField({ name: name, value }));
  };

  // TODO : 정렬된 배열 만들기
  const copy = [];
  const handleChangeFuelType = (e, fuelType, index) => {
    const { name } = e.target;

    // TODO : 만약에(if) checkbox 클릭시 필드안에 데이터가있으면 체크 해제 없으면 체크
    if (!getFuelTypes.some(ft => ft.id === fuelTypes[index].id)) {
      dispatch(addFuelType({ name: name, fuelType }));
    } else if (getFuelTypes.some(ft => ft.id === fuelTypes[index].id)) {
      dispatch(removeFuelType({ name: name, fuelTypeId: fuelType.id }));
    }

    // 체크
    if (fuelTypes[index].checked) {
      const copyArr = [...fuelTypes]; // 배열 복사
      copyArr[index].checked = copyArr[index].checked = false; // 복사한 배열에 checked 값 수정
      setFuelTypes(copyArr); // 복사한 배열으로 수정
    } else {
      const copyArr = [...fuelTypes];
      copyArr[index].checked = copyArr[index].checked = true;
      setFuelTypes(copyArr);
    }
  };

  console.log(formData);

  return (
    <article className="left-form-container">
      <p className="text-1xl">차량 정보 등록</p>
      {/* ■■■■■■ 브랜드 선택(ObjectId) ■■■■■■ */}
      <label>
        brand(브랜드):
        <select name="brand" required onChange={handleChange}>
          <option value={null}>-선택-</option>
          {brandsSlice.items.map(brand => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>
      </label>
      {/*■■■■■■ 한글이름(string) ■■■■■■*/}
      <label>
        한글이름:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      {/*■■■■■■ 영어이름(string) ■■■■■■*/}
      <label>
        영어이름:
        <input type="text" name="english_name" value={formData.english_name} onChange={handleChange} />
      </label>
      {/*■■■■■■ ID(number) ■■■■■■*/}
      <label>
        id:
        <input type="number" name="id" value={formData.id} onChange={handleChange} />
      </label>
      {/*■■■■■■ 차급(String) ■■■■■■*/}
      <label className="seg">
        차급:
        <select name="segment" required onChange={handleChange}>
          {segments.map((seg, index) => (
            <option key={index} value={seg}>
              {seg}
            </option>
          ))}
        </select>
      </label>
      {/*■■■■■■ 차량사진개수(객체 number) ■■■■■■*/}
      <label>
        차량 사진 개수(외관, 내관):
        {/* --외관 */}
        <input
          type="number"
          name="photo_count.exterior"
          value={formData.photo_count.exterior}
          onChange={handleChange}
        />
        {/* --내관 */}
        <input
          type="number"
          name="photo_count.interior"
          value={formData.photo_count.interior}
          onChange={handleChange}
        />
      </label>
      {/*■■■■■■ 가격(객체 number) ■■■■■■*/}
      <label>
        가격:
        {/* --최소 */}
        <input type="number" name="price.min" value={formData.price.min} onChange={handleChange} />
        {/* --최대 */}
        <input type="number" name="price.max" value={formData.price.max} onChange={handleChange} />
      </label>
      {/*■■■■■■ 출시일(객체 string) ■■■■■■*/}
      <label>
        출시일:
        <input type="number" name="date.year" value={formData.date.year} onChange={handleChange} />
        <select name="date.month" required onChange={handleChange}>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </label>
      {/*■■■■■■ 연비(객체 number) ■■■■■■*/}
      <label>
        연비(최소, 최대):
        <input
          type="number"
          name="gas_mileage.min"
          value={formData.gas_mileage.min}
          onChange={handleChange}
          placeholder="최소"
        />
        <input
          type="number"
          name="gas_mileage.max"
          value={formData.gas_mileage.max}
          onChange={handleChange}
          placeholder="최대"
        />
      </label>
      {/*■■■■■■ 연료 종류(객체배열) ■■■■■■*/}
      <label>
        연료 종류:
        {fuelTypes.map((ft, index) => (
          <label className="ft" key={index}>
            <input
              type="checkbox"
              name="fuel_types"
              value={ft.name}
              checked={ft.checked}
              onChange={event => {
                {
                  handleChangeFuelType(event, { name: ft.name, id: ft.id }, index);
                }
              }}
            />
            {ft.name}
          </label>
        ))}
      </label>
      <SubmitButton />
    </article>
  );
}

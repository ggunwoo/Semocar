// import "../../../styles/components/form.scss";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { fetchBrands } from "../../../store/api/brandApi";
import {
  MONTHS,
  SEGMENT_SIZE_LIST,
  SEGMENT_BODY_LIST,
  SEGMENT_SIZE_IDS,
  SEGMENT_BODY_IDS,
  BRAND_IDS,
  FUELTYPE_LIST,
} from "../../../../utils/constants"; // 상수 데이터 불러오기
import { updateFieldSP, addFuelTypeSP, removeFuelTypeSP } from "../../../store/slice/createCarSimpleSlice";
import SubmitButton from "./SimpleSubmitButton";
// ===============================================================
//
// ===============================================================
// --TODO : 기본 스키마 -> grades -> trims 전송 폼 설계, grades와 trims의 개수는 상이하며 배열 데이터로 전송
// --TODO : grades와 trims 추가 버튼으로 배열 개수
// --TODO : formData api 설계
export default function BaseCarForm() {
  const dispatch = useAppDispatch();
  // checkbox와 배열 정렬을 위한 복사데이터
  const [fuelTypes, setFuelTypes] = useState([]);
  const useBrands = useAppSelector(state => state.brandList);
  const formData = useAppSelector(state => state.createCarSimple.formData);
  const getFuelTypes = useAppSelector(state => state.createCarSimple.formData.fuel_types);
  const [brand, setBrand] = useState("");
  const [segmentSize, setSegmentSize] = useState("");
  const [segmentBody, setSegmentBody] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [generateId, setGenerateId] = useState("");

  useEffect(() => {
    if (useBrands.status === "idle") {
      dispatch(fetchBrands()); // --Redux => Brands fetch함수 실행
    }
  }, []);

  useEffect(() => {
    const addChecked = FUELTYPE_LIST.map(fuel => ({ ...fuel, checked: false }));
    setFuelTypes(addChecked);
  }, []);

  // --formData state 변경 처리 함수
  const handleChange = (e, type) => {
    const { name, value, checked } = e.target;
    //  --type에 따른 value변환 후 값 전달
    if (type === "boolean") dispatch(updateFieldSP({ name: name, value: checked }));
    if (type === "string") dispatch(updateFieldSP({ name: name, value: String(value) }));
    if (type === "number" && !isNaN(value)) dispatch(updateFieldSP({ name: name, value: Number(value) }));
  };

  // TODO : 상수데이터 brand, segment 그리고 출시년도 뒷 두자리를 이용해 ID값 자동생성
  const getBrandName = brandId => {
    const getBrand = useBrands.items.find(item => item._id === brandId);
    setBrand(getBrand.name);
  };
  const generateBaseId = () => {
    const getbrandIds = BRAND_IDS[brand] || "";
    const getsegSizeIds = SEGMENT_SIZE_IDS[segmentSize] || "";
    const getsegBodyIds = SEGMENT_BODY_IDS[segmentBody] || "";
    const getYearSlice = releaseYear.slice(-2);

    const newId = `${getbrandIds}${getsegSizeIds}${getsegBodyIds}${getYearSlice}`;

    setGenerateId(newId);
    dispatch(updateFieldSP({ name: "id", value: newId }));
  };

  useEffect(() => {
    generateBaseId();
  }, [brand, segmentSize, segmentBody, releaseYear]);

  // TODO : 정렬된 배열 만들기
  const handleChangeFuelType = (e, fuelType, index) => {
    const { name } = e.target;
    // TODO : 만약에(if) checkbox 클릭시 필드안에 데이터가있으면 체크 해제 없으면 체크
    if (!getFuelTypes.some(ft => ft.id === fuelTypes[index].id)) {
      const copyArr = [...fuelTypes]; // 배열 복사
      copyArr[index].checked = copyArr[index].checked = true; // 복사한 배열에 checked 값 수정
      setFuelTypes(copyArr); // 복사한 배열으로 수정
      dispatch(addFuelTypeSP({ name: name, fuelType }));
    } else if (getFuelTypes.some(ft => ft.id === fuelTypes[index].id)) {
      const copyArr = [...fuelTypes];
      copyArr[index].checked = copyArr[index].checked = false;
      setFuelTypes(copyArr);
      dispatch(removeFuelTypeSP({ name: name, fuelTypeId: fuelType.id }));
    }
  };

  return (
    <article className="left-form-container">
      <p className="text-1xl">차량 정보 등록&#40;심플&#41;</p>
      {/* TODO :: 브랜드, 차급, 출시년도 선택하면 id값 자동화설정 */}
      {/* 브랜드, 차급은 상수데이터(두자릿수 숫자)로 출시년도 뒷두자리, 2022면 22만 배열에 할당 후 join() number() + 숫자 타입 1을 뒤에 붙이고 */}
      {/* db에 같은 데이터가 있다면 1을 1이 증감된 2를 할당하기 */}
      <label>
        id 자동생성 :
        <input
          type="text"
          readOnly
          name="id"
          value={formData.id}
          placeholder="ID 자동 생성"
          style={{ width: "150px" }}
        />
        <p style={{ color: "#777", fontSize: "11px" }}>
          * 브랜드 | 차급 | 출시년도 | (서버 사이드에서 sequence number 추가)
        </p>
      </label>
      <label>
        brand(브랜드):
        <select
          name="brand"
          onChange={e => {
            handleChange(e, "string");
            getBrandName(e.target.value);
          }}>
          <option value={null}>=선택=</option>
          {useBrands.items.map(brand => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        모델명:
        <input
          type="text"
          name="model.name"
          value={formData.model.name}
          placeholder="한글"
          onChange={e => {
            handleChange(e, "string");
          }}
        />
        <input
          type="text"
          name="model.english_name"
          value={formData.model.english_name}
          placeholder="영어"
          onChange={e => {
            handleChange(e, "string");
          }}
        />
      </label>
      <label>
        한글이름:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={e => {
            handleChange(e, "string");
          }}
        />
      </label>
      <label>
        영어이름:
        <input
          type="text"
          name="english_name"
          value={formData.english_name}
          onChange={e => {
            handleChange(e, "string");
          }}
        />
      </label>
      <label>
        모델 이니셜:
        <input
          type="text"
          name="model_initial"
          value={formData.model_initial}
          onChange={e => {
            handleChange(e, "string");
          }}
        />
      </label>
      <label>
        페이스리프트
        <input
          type="checkbox"
          name="is_facelift"
          checked={formData.is_facelift}
          onChange={e => {
            handleChange(e, "boolean");
          }}
        />
      </label>
      <label>
        이미지 URL:
        <textarea
          name="image_path"
          value={formData.image_path}
          style={{ width: "100%", height: "50px" }}
          onChange={e => {
            handleChange(e, "string");
          }}
        />
      </label>
      {/* 이미지 확인 */}
      <img className="check-img" src={`${formData.image_path}/model_image.png`} alt="이미지 url확인" />
      <label className="seg">
        차급:
        <select
          name="segment.size"
          onChange={e => {
            handleChange(e, "string");
            setSegmentSize(e.target.value);
          }}>
          <option value={null}>=선택=</option>
          {SEGMENT_SIZE_LIST.map((segSize, index) => (
            <option key={index} value={segSize}>
              {segSize}
            </option>
          ))}
        </select>
        <select
          name="segment.body"
          onChange={e => {
            handleChange(e, "string");
            setSegmentBody(e.target.value);
          }}>
          <option value={null}>=선택=</option>
          {SEGMENT_BODY_LIST.map((segBody, index) => (
            <option key={index} value={segBody}>
              {segBody}
            </option>
          ))}
        </select>
      </label>
      <label>
        출시일:
        <input
          type="number"
          name="date.year"
          value={formData.date.year !== 0 ? formData.date.year : ""}
          onChange={e => {
            handleChange(e, "number");
            setReleaseYear(e.target.value);
          }}
          placeholder="  - - - - 년"
        />
        <select
          name="date.month"
          required
          onChange={e => {
            handleChange(e, "number");
          }}>
          {MONTHS.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </label>
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

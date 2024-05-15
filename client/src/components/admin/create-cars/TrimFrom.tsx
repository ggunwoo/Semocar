import "../../../styles/components/form.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateField, addTrim, removeTrim } from "../../../store/slice/createCarSlice";
import { useEffect, useState } from "react";

// TODO : props.id 값은 grades에 index값
export default function TrimeForm({ gradeIdx }) {
  const dispatch = useAppDispatch();
  const grade = useAppSelector(state => state.createCar.formData.grades[gradeIdx]); // --grade로 부터 index값을 받아와 해당 trim이 존재하는 grade로 접근
  const trims = grade.trims; // --grade 접근 후 trim배열에 접근
  const [isShowField, setIsShowfield] = useState([]);
  // TODO:: true일때만 field 보여주기

  useEffect(() => {
    setIsShowfield(Array(trims.length).fill(true));
  }, [trims.length]);

  const toggleDropdown = index => {
    setIsShowfield(isShowField.map((field, idx) => (idx === index ? !field : field)));
  };

  // --formData state 변경 처리 함수
  const handleChange = (e, type) => {
    const { name, value } = e.target;
    //  --type에 따른 value변환 후 값 전달
    if (type === "string") dispatch(updateField({ name: name, value: String(value) }));
    if (type === "number" && !isNaN(value)) dispatch(updateField({ name: name, value: Number(value) }));
  };

  const handleAddTrim = gradeId => {
    dispatch(addTrim(gradeId));
  };
  const handleRemoveTrim = (gradeIdx, id) => {
    dispatch(removeTrim({ gradeIdx, id }));
  };

  const trimFieldDefaults = {
    ICE: {
      motor_power: 0,
      motor_torque: 0,
      battery_type: "",
      battery_volume: 0,
      battery_voltage: 0,
      ev_mileage: 0,
      urban_ev_mileage: 0,
      highway_ev_mileage: 0,
      range: 0,
      urban_range: 0,
      highway_range: 0,
    },
    HEV: {
      battery_voltage: 0,
      range: 0,
      urban_range: 0,
      highway_range: 0,
    },
    PHEV: {
      // PHEV에 특화된 필드 초기화 값들을 추가
    },
    EV: {
      engine: "",
      power: 0,
      torque: 0,
      displacement: 0,
      gas_mileage: 0,
      urban_gas_mileage: 0,
      highway_gas_mileage: 0,
    },
  };

  const changeFieldValueReset = (e, gradeIdx, index) => {
    const { name, value } = e.target; // 'value'는 선택된 트림 유형
    console.log(value);

    const fieldsToReset = trimFieldDefaults[value];
    Object.keys(fieldsToReset).forEach(field => {
      const fieldName = `grades.${gradeIdx}.trims.${index}.${field}`;
      dispatch(updateField({ name: fieldName, value: fieldsToReset[field] }));
    });
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
                  changeFieldValueReset(e, gradeIdx, index);
                }}>
                <option value="ICE">ICE</option>
                <option value="HEV">HEV</option>
                <option value="PHEV">PHEV</option>
                <option value="EV">EV</option>
              </select>
            </label>
            {/* 전 차량 필수 필드 */}
            <label>
              트림명:
              <input
                type="text"
                name={`grades.${gradeIdx}.trims.${index}.name`}
                value={trim.name}
                onChange={e => {
                  handleChange(e, "string");
                }}
                className="name" />
            </label>
            <label>
              id: <input readOnly type="text" value={trim.id} className="id" />
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
                className="price" />
              만원
            </label>
            {trim.field === "ICE" ? (
              <label>
                {/* 내연기관 */}
                연료타입:
                <select
                  name={`grades.${gradeIdx}.trims.${index}.fuel_type`}
                  onChange={e => {
                    handleChange(e, "string");
                  }}
                  className="fuel_type">
                  <option value={null}>=선택=</option>
                  <option value="가솔린">가솔린</option>
                  <option value="디젤">디젤</option>
                  <option value="LPG">LPG</option>
                </select>
              </label>
            ) : trim.field === "HEV" || trim.field === "PHEV" ? (
              <label>
                {/* 하이브리드 */}
                연료타입:
                <input
                  readOnly
                  name={`grades.${gradeIdx}.trims.${index}.fuel_type`}
                  value="가솔린+전기"
                  onChange={e => {
                    handleChange(e, "string");
                  }}
                  className="fuel_type" />
              </label>
            ) : (
              trim.field === "EV" && (
                <label>
                  {/* 전기 */}
                  연료타입:
                  <select
                    name={`grades.${gradeIdx}.trims.${index}.fuel_type`}
                    onChange={e => {
                      handleChange(e, "string");
                    }}
                    className="fuel_type">
                    <option value={null}>=선택=</option>
                    <option value="전기(배터리)">전기(배터리)</option>
                    <option value="전기(수소)">전기(수소)</option>
                  </select>
                </label>
              )
            )}
            {(trim.field === "ICE" || trim.field === "HEV" || trim.field === "PHEV") && (
              <label>
                엔진종류:
                <select
                  name={`grades.${gradeIdx}.trims.${index}.engine`}
                  onChange={e => {
                    handleChange(e, "string");
                  }}
                  className="engine">
                  <option value={null}>=선택=</option>
                  <option value="I3">I3</option> {/* I형 3기통 */}
                  <option value="I4">I4</option> {/* I형 4기통 */}
                  <option value="I5">I5</option> {/* I형 5기통 */}
                  <option value="I6">I6</option> {/* I형 6기통 */}
                  <option value="V6">V6</option> {/* V형 6기통 */}
                  <option value="V8">V8</option> {/* V형 8기통 */}
                </select>
              </label>
            )}
            <label>
              에너지 소비효율:
              <select
                name={`grades.${gradeIdx}.trims.${index}.low_emission`}
                onChange={e => {
                  handleChange(e, "string");
                }}
                className="low_emission">
                <option value="">=선택=</option>
                <option value="1등급">1등급</option> {/* 리터당 16.0 이상 */}
                <option value="2등급">2등급</option> {/* 리터당 15.9 ~ 13.8 */}
                <option value="3등급">3등급</option> {/* 리터당 13.7 ~ 11.6 */}
                <option value="4등급">4등급</option> {/* 리터당 11.5 ~ 9.4 */}
                <option value="5등급">5등급</option> {/* 리터당 9.3 이하 */}
              </select>
              <span>등급</span>
            </label>
            <label>
              변속기:
              <select
                name={`grades.${gradeIdx}.trims.${index}.trans_mission.gear`}
                onChange={e => {
                  handleChange(e, "string");
                }}
                className="trans_mission_gear">
                <option value="">=선택=</option>
                <option value="8단">8단</option>
                <option value="7단">7단</option>
                <option value="6단">6단</option>
                <option value="5단">5단</option>
                <option value="4단">4단</option>
                <option value="3단">3단</option>
                <option value="2단">2단</option>
                <option value="1단">1단</option>
              </select>
              <select
                name={`grades.${gradeIdx}.trims.${index}.trans_mission.type`}
                onChange={e => {
                  handleChange(e, "string");
                }}
                className="trans_mission_type">
                <option value="">=선택=</option>
                {/* <option value="토크컨버터">토크컨버터</option> */}
                <option value="자동">자동</option>
                <option value="DCT">DCT</option>
                <option value="CVT">CVT</option>
                <option value="IVT">IVT</option>
                <option value="AMT">AMT</option>
                <option value="수동">수동</option>
              </select>
            </label>
            <label>
              구동타입:
              <select
                name={`grades.${gradeIdx}.trims.${index}.driving_system`}
                onChange={e => {
                  handleChange(e, "string");
                }}
                className="driving_system">
                <option value={null}>=선택=</option>
                <option value="FF">FF</option> {/* 앞엔진/전륜구동 */}
                <option value="FR">FR</option> {/* 앞엔진/후휸구동 */}
                <option value="AWD">AWD</option> {/* 앞엔진/상시사륜구동 */}
                <option value="4WD">4WD</option> {/* 앞엔진/일시사륜구동 */}
                <option value="RR">RR</option> {/* 뒷엔진/후륜구동 */}
                <option value="MR">MR</option> {/* 중앙엔진/후륜구동 */}
              </select>
            </label>
            <label>
              공차중량:
              <input
                type="number"
                name={`grades.${gradeIdx}.trims.${index}.vehicle_weight`}
                value={trim.vehicle_weight !== 0 ? trim.vehicle_weight : ""}
                onChange={e => {
                  handleChange(e, "number");
                }}
                className="vehicle_weight" />
              <span>kg</span>
            </label>
            <label>
              앞 타이어 규격:
              <input
                type="text"
                name={`grades.${gradeIdx}.trims.${index}.front_tire.width`}
                value={trim.front_tire.width}
                onChange={e => {
                  handleChange(e, "string");
                }}
                className="tire_width" />
              <input
                type="text"
                name={`grades.${gradeIdx}.trims.${index}.front_tire.flatness`}
                value={trim.front_tire.flatness}
                onChange={e => {
                  handleChange(e, "string");
                }}
                className="tire_flatness" />
                <span>R</span>
              <input
                type="text"
                name={`grades.${gradeIdx}.trims.${index}.front_tire.inch`}
                value={trim.front_tire.inch}
                onChange={e => {
                  handleChange(e, "string");
                }}
                className="tire_inch" />
              <span>(000 00R 00)</span>
            </label>
            <label>
              뒷 타이어 규격:
              <input
                type="text"
                name={`grades.${gradeIdx}.trims.${index}.rear_tire.width`}
                value={trim.rear_tire.width}
                onChange={e => {
                  handleChange(e, "string");
                }}
                className="tire_width" />
              <input
                type="text"
                name={`grades.${gradeIdx}.trims.${index}.rear_tire.flatness`}
                value={trim.rear_tire.flatness}
                onChange={e => {
                  handleChange(e, "string");
                }}
                className="tire_flatness" />
                <span>R</span>
              <input
                type="text"
                name={`grades.${gradeIdx}.trims.${index}.rear_tire.inch`}
                value={trim.rear_tire.inch}
                onChange={e => {
                  handleChange(e, "string");
                }}
                className="tire_inch" />
              <span>(000 00R 00)</span>
            </label>
            <label>
              전륜 브레이크:
              <input
                type="text"
                name={`grades.${gradeIdx}.trims.${index}.front_brake`}
                value={trim.front_brake}
                onChange={e => {
                  handleChange(e, "string");
                }}
                className="front_brake" />
            </label>
            <label>
              후륜 브레이크:
              <input
                type="text"
                name={`grades.${gradeIdx}.trims.${index}.rear_brake`}
                value={trim.rear_brake}
                onChange={e => {
                  handleChange(e, "string");
                }}
                className="rear_brake" />
            </label>
            <label>
              전륜 서스펜션:
              <input
                type="text"
                name={`grades.${gradeIdx}.trims.${index}.front_suspension`}
                value={trim.front_suspension}
                onChange={e => {
                  handleChange(e, "string");
                }}
                className="front_suspension" />
            </label>
            <label>
              후륜 서스펜션:
              <input
                type="text"
                name={`grades.${gradeIdx}.trims.${index}.rear_suspension`}
                value={trim.rear_suspension}
                onChange={e => {
                  handleChange(e, "string");
                }}
                className="rear_suspension" />
            </label>
            <label>
              승차전원:
              <input
                type="number"
                name={`grades.${gradeIdx}.trims.${index}.capacity`}
                value={trim.capacity !== 0 ? trim.capacity : ""}
                onChange={e => {
                  handleChange(e, "number");
                }}
                className="capacity" />
              <span>인승</span>
            </label>
            <label>
              전장(길이):
              <input
                type="number"
                name={`grades.${gradeIdx}.trims.${index}.length`}
                value={trim.length !== 0 ? trim.length : ""}
                onChange={e => {
                  handleChange(e, "number");
                }}
                className="length" />
              <span>mm</span>
            </label>
            <label>
              전폭(넓이):
              <input
                type="number"
                name={`grades.${gradeIdx}.trims.${index}.width`}
                value={trim.width !== 0 ? trim.width : ""}
                onChange={e => {
                  handleChange(e, "number");
                }}
                className="width" />
              <span>mm</span>
            </label>
            <label>
              전고(높이):
              <input
                type="number"
                name={`grades.${gradeIdx}.trims.${index}.height`}
                value={trim.height !== 0 ? trim.height : ""}
                onChange={e => {
                  handleChange(e, "number");
                }}
                className="height" />
              <span>mm</span>
            </label>
            <label>
              축거(휠베이스):
              <input
                type="tnumberext"
                name={`grades.${gradeIdx}.trims.${index}.wheel_base`}
                value={trim.wheel_base !== 0 ? trim.wheel_base : ""}
                onChange={e => {
                  handleChange(e, "number");
                }}
                className="wheel_base" />
              <span>mm</span>
            </label>
            <label>
              윤거전:
              <input
                type="number"
                name={`grades.${gradeIdx}.trims.${index}.track`}
                value={trim.track !== 0 ? trim.track : ""}
                onChange={e => {
                  handleChange(e, "number");
                }}
                className="track" />
              <span>mm</span>
            </label>
            <label>
              윤거후:
              <input
                type="number"
                name={`grades.${gradeIdx}.trims.${index}.tread`}
                value={trim.tread !== 0 ? trim.tread : ""}
                onChange={e => {
                  handleChange(e, "number");
                }}
                className="tread" />
              <span>mm</span>
            </label>

            {/* 내연기관 필드 수정폼 */}
            {(trim.field === "ICE" || trim.field === "HEV" || trim.field === "PHEV") && (
              <article className="category_field">
                <label>
                  출력:
                  <input
                    type="number"
                    name={`grades.${gradeIdx}.trims.${index}.power`}
                    value={trim.power !== 0 ? trim.power : ""}
                    onChange={e => {
                      handleChange(e, "number");
                    }}
                    className="power" />
                  <span>마력</span>
                </label>
                <label>
                  토크:
                  <input
                    type="number"
                    name={`grades.${gradeIdx}.trims.${index}.torque`}
                    value={trim.torque !== 0 ? trim.torque : ""}
                    onChange={e => {
                      handleChange(e, "number");
                    }}
                    className="torque" />
                  <span>kg.m</span>
                </label>
                <label>
                  배기량:
                  <input
                    type="number"
                    name={`grades.${gradeIdx}.trims.${index}.displacement`}
                    value={trim.displacement !== 0 ? trim.displacement : ""}
                    onChange={e => {
                      handleChange(e, "number");
                    }}
                    className="displacement" />
                  <span>cc</span>
                </label>
                <label>
                  복합연비:
                  <input
                    type="number"
                    name={`grades.${gradeIdx}.trims.${index}.gas_mileage`}
                    value={trim.gas_mileage !== 0 ? trim.gas_mileage : ""}
                    onChange={e => {
                      handleChange(e, "number");
                    }}
                    className="gas_mileage" />
                  <span>km/l</span>
                </label>
                <label>
                  도심연비:
                  <input
                    type="number"
                    name={`grades.${gradeIdx}.trims.${index}.urban_gas_mileage`}
                    value={trim.urban_gas_mileage !== 0 ? trim.urban_gas_mileage : ""}
                    onChange={e => {
                      handleChange(e, "number");
                    }}
                    className="urban_gas_mileage" />
                  <span>km/l</span>
                </label>
                <label>
                  고속연비:
                  <input
                    type="number"
                    name={`grades.${gradeIdx}.trims.${index}.highway_gas_mileage`}
                    value={trim.highway_gas_mileage !== 0 ? trim.highway_gas_mileage : ""}
                    onChange={e => {
                      handleChange(e, "number");
                    }}
                    className="highway_gas_mileage" />
                  <span>km/l</span>
                </label>
              </article>
            )}
            {(trim.field === "HEV" || trim.field === "PHEV" || trim.field === "EV") && (
              <article className="category_field">
                <label>
                  모터출력:
                  <input
                    type="number"
                    name={`grades.${gradeIdx}.trims.${index}.motor_power`}
                    value={trim.motor_power !== 0 ? trim.motor_power : ""}
                    onChange={e => {
                      handleChange(e, "number");
                    }}
                    className="motor_power" />
                  <span>kw</span>
                </label>
                <label>
                  모터토크:
                  <input
                    type="number"
                    name={`grades.${gradeIdx}.trims.${index}.motor_torque`}
                    value={trim.motor_torque !== 0 ? trim.motor_torque : ""}
                    onChange={e => {
                      handleChange(e, "number");
                    }}
                    className="motor_torque" />
                  <span>kg.m</span>
                </label>
              </article>
            )}
            {(trim.field === "PHEV" || trim.field === "EV") && (
              <article className="category_field">
                <label>
                  복합전비:
                  <input
                    type="number"
                    name={`grades.${gradeIdx}.trims.${index}.ev_mileage`}
                    value={trim.ev_mileage !== 0 ? trim.ev_mileage : ""}
                    onChange={e => {
                      handleChange(e, "number");
                    }}
                    className="ev_mileage" />
                  <span>km/kWh</span>
                </label>
                <label>
                  도심전비:
                  <input
                    type="number"
                    name={`grades.${gradeIdx}.trims.${index}.urban_ev_mileage`}
                    value={trim.urban_ev_mileage !== 0 ? trim.urban_ev_mileage : ""}
                    onChange={e => {
                      handleChange(e, "number");
                    }}
                    className="urban_ev_mileage" />
                  <span>km/kWh</span>
                </label>
                <label>
                  고속전비:
                  <input
                    type="number"
                    name={`grades.${gradeIdx}.trims.${index}.highway_ev_mileage`}
                    value={trim.highway_ev_mileage !== 0 ? trim.highway_ev_mileage : ""}
                    onChange={e => {
                      handleChange(e, "number");
                    }}
                    className="highway_ev_mileage" />
                  <span>km/kWh</span>
                </label>
                <label>
                  배터리 종류:
                  <select
                    name={`grades.${gradeIdx}.trims.${index}.battery_type`}
                    onChange={e => {
                      handleChange(e, "string");
                    }}
                    className="battery_type">
                    <option value={null}>=선택=</option>
                    <option value="리튬이온(NCM)">리튬이온(NCM)</option> {/* 니켈 & 코발트 & 망간 */}
                    <option value="리튬이온(NCMA)">리튬이온(NCMA)</option> {/* 니켈 & 코발트 & 망간 & 알류미늄 */}
                    <option value="리튬 인산철(LFP)">리튬 인산철(LFP)</option> {/* LiFePO4 */}
                    <option value="리튬이온(NCA)">리튬이온(NCA)</option> {/* 니켈 & 코발트 & 알류미늄 */}
                  </select>
                </label>
                <label>
                  배터리 용량:
                  <input
                    type="number"
                    name={`grades.${gradeIdx}.trims.${index}.battery_volume`}
                    value={trim.battery_volume !== 0 ? trim.battery_volume : ""}
                    onChange={e => {
                      handleChange(e, "number");
                    }}
                    className="battery_volume" />
                  <span>kWh</span>
                </label>
              </article>
            )}
            {trim.field === "EV" && (
              <article className="category_field">
                <label>
                  배터리 전압:
                  <input
                    type="number"
                    name={`grades.${gradeIdx}.trims.${index}.battery_voltage`}
                    value={trim.battery_voltage !== 0 ? trim.battery_voltage : ""}
                    onChange={e => {
                      handleChange(e, "number");
                    }}
                    className="battery_voltage" />
                  <span>V</span>
                </label>
                <label>
                  복합전비:
                  <input
                    type="number"
                    name={`grades.${gradeIdx}.trims.${index}.range`}
                    value={trim.range !== 0 ? trim.range : ""}
                    onChange={e => {
                      handleChange(e, "number");
                    }}
                    className="range" />
                  <span>km/kWh</span>
                </label>
                <label>
                  도심전비:
                  <input
                    type="number"
                    name={`grades.${gradeIdx}.trims.${index}.urban_range`}
                    value={trim.urban_range !== 0 ? trim.urban_range : ""}
                    onChange={e => {
                      handleChange(e, "number");
                    }}
                    className="urban_range" />
                  <span>km/kWh</span>
                </label>
                <label>
                  고속전비:
                  <input
                    type="number"
                    name={`grades.${gradeIdx}.trims.${index}.highway_range`}
                    value={trim.highway_range !== 0 ? trim.highway_range : ""}
                    onChange={e => {
                      handleChange(e, "number");
                    }}
                    className="highway_range" />
                  <span>km/kWh</span>
                </label>
              </article>
            )}
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

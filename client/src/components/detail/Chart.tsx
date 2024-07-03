// // styled-components
// import * as S from "../../styled/Detail.styled";

// export default function Chart({ trim }) {
//   console.log(trim);
//   return (
//     <>
      

//       {/* 가격 price */}
//       <S.PriceDl>
//         <dt>가격</dt>
//         <dd>{trim?.price ? <p>{trim.price.toLocaleString("ko-KR")}만원</p> : <p>가격정보없음</p>}</dd>
//       </S.PriceDl>

//       <S.SpacDl>
//         <dt>제원</dt>
//         <div style={{ position: "absolute", bottom: "0" }}></div>

//         {/* 가솔린, 디젤, LPG */}
//         {trim.field === "ICE" && (
//           <dd>
//             {/* OPTION chart 1LINE */}
//             <S.ChartDl>
//               <dt>연료</dt>
//               <dd>{trim.fuel_type}</dd>
//               <dt>엔진형식</dt>
//               <dd>{trim.engine}</dd>
//               <dt>배기량</dt>
//               <dd>{trim.displacement}</dd>
//               <dt>변속기</dt>
//               <dd>
//                 {trim.trans_mission.gear} {trim.trans_mission.type}
//               </dd>
//               <dt>구동방식</dt>
//               <dd>{trim.driving_system}</dd>
//               <dt>최고출력</dt>
//               <dd>{trim.power}</dd>
//               <dt>최대토크</dt>
//               <dd>{trim.torque?.toFixed(1)}</dd>
//             </S.ChartDl>
//             {/* OPTION 2LINE */}
//             <S.ChartDl>
//               <dt>복합연비</dt>
//               <dd>{trim.gas_mileage?.toFixed(1)}</dd>
//               <dt>도심연비</dt>
//               <dd>{trim.urban_gas_mileage?.toFixed(1)}km/l</dd>
//               <dt>고속도로연비</dt>
//               <dd>{trim.highway_gas_mileage?.toFixed(1)}km/l</dd>
//               <dt>연비등급</dt>
//               <dd>{trim.low_emission}</dd>
//               <dt>공차중량</dt>
//               <dd>{trim.vehicle_weight}kg</dd>
//             </S.ChartDl>
//             {/* OPTION 3LINE */}
//             <S.ChartDl>
//               <dt>앞타이어규격</dt>
//               <dd>
//                 {trim.front_tire.width} {trim.front_tire.flatness}R {trim.front_tire.inch}
//               </dd>
//               <dt>뒷타이어규격</dt>
//               <dd>
//                 {trim.rear_tire.width} {trim.rear_tire.flatness}R {trim.rear_tire.inch}
//               </dd>
//               <dt>전륜브레이크</dt>
//               <dd>{trim.front_suspension}</dd>
//               <dt>후륜브레이크</dt>
//               <dd>{trim.rear_suspension}</dd>
//               <dt>전륜서스펜션</dt>
//               <dd>{trim.front_brake}</dd>
//               <dt>후륜서스펜션</dt>
//               <dd>{trim.rear_brake}</dd>
//               <dt>탑승정원</dt>
//               <dd>{trim.capacity}</dd>
//             </S.ChartDl>
//           </dd>
//         )}

//         {/* 하이브리드 */}
//         {trim.field === "HEV" && (
//           <dd>
//             {/* OPTION 1LINE */}
//             <S.ChartDl>
//               <dt>연료</dt>
//               <dd>{trim.fuelType}</dd>
//               <dt>엔진형식</dt>
//               <dd>{trim.engine}</dd>
//               <dt>배기량</dt>
//               <dd>{trim.displacement}</dd>
//               <dt>변속기</dt>
//               <dd>{trim.transMission}</dd>
//               <dt>구동방식</dt>
//               <dd>{trim.drivingSystem}</dd>
//               <dt>최고출력</dt>
//               <dd>{trim.power}</dd>
//               <dt>최대토크</dt>
//               <dd>{trim.torque}</dd>
//             </S.ChartDl>

//             {/* OPTION 2LINE */}
//             <S.ChartDl>
//               <dt>연비등급</dt>
//               <dd>{trim.ratingGasMileage}</dd>
//               <dt>복합연비</dt>
//               <dd>{trim.complexGasMileage}</dd>
//               <dt>도심연비</dt>
//               <dd>{trim.urbanGasMileage}</dd>
//               <dt>고속도로연비</dt>
//               <dd>{trim.highwayGasMileage}</dd>
//               <dt>저공해등급</dt>
//               <dd>{trim.lowEmission}</dd>
//               <dt>모터출력</dt>
//               <dd>{trim.motorPower}</dd>
//               <dt>모터토크</dt>
//               <dd>{trim.motorTorque}</dd>
//               <dt>배터리타입</dt>
//               <dd>{trim.batteryType}</dd>
//               <dt>배터리용량</dt>
//               <dd>{trim.batteryVolume}</dd>
//             </S.ChartDl>

//             {/* OPTION 3LINE */}
//             <S.ChartDl>
//               <dt>자율주행 레벨</dt>
//               <dd>{trim.autoLevel}</dd>
//               <dt>공차중량</dt>
//               <dd>{trim.vehicleWeight}</dd>
//               <dt>앞타이어규격</dt>
//               <dd>{trim.frontTire}</dd>
//               <dt>뒷타이어규격</dt>
//               <dd>{trim.rearTire}</dd>
//               <dt>전륜브레이크</dt>
//               <dd>{trim.frontSuspension}</dd>
//               <dt>후륜브레이크</dt>
//               <dd>{trim.rearSuspension}</dd>
//               <dt>전륜서스펜션</dt>
//               <dd>{trim.frontBrake}</dd>
//               <dt>후륜서스펜션</dt>
//               <dd>{trim.rearBrake}</dd>
//               <dt>탑승정원</dt>
//               <dd>{trim.capacity}</dd>
//             </S.ChartDl>
//           </dd>
//         )}

//         {/* 전기 */}
//         {trim.field === "EV" && (
//           <dd>
//             {/* OPTION 1LINE */}
//             <S.ChartDl>
//               <dt>연료</dt>
//               <dd>{trim.fuelType}</dd>

//               <dt>모터출력</dt>
//               <dd>{trim.motorPower}</dd>
//               <dt>모터토크</dt>
//               <dd>{trim.motorTorque}</dd>
//               <dt>구동방식</dt>
//               <dd>{trim.drivingSystem}</dd>
//               <dt>배터리종류</dt>
//               <dd>{trim.batteryType}</dd>
//               <dt>배터리용량</dt>
//               <dd>{trim.batteryVolume}</dd>
//             </S.ChartDl>

//             {/* OPTION 2LINE */}
//             <S.ChartDl>
//               <dt>연비</dt>
//               <dd>{trim.complexGasMileage}</dd>
//               <dt>저공해등급</dt>
//               <dd>{trim.lowEmission}</dd>
//               <dt>충전방식</dt>
//               <dd>{trim.charging}</dd>
//               <dt>충전시간(급속)</dt>
//               <dd>{trim.chargingQuick}</dd>
//               <dt>충전시간(완속)</dt>
//               <dd>{trim.chargingSlow}</dd>
//               <dt>자율주행 레벨</dt>
//               <dd>{trim.autoLevel}</dd>
//               <dt>공차중량</dt>
//               <dd>{trim.vehicleWeight}</dd>
//             </S.ChartDl>

//             {/* OPTION 3LINE */}
//             <S.ChartDl>
//               <dt>앞타이어규격</dt>
//               <dd>{trim.frontTire}</dd>
//               <dt>뒷타이어규격</dt>
//               <dd>{trim.rearTire}</dd>
//               <dt>전륜브레이크</dt>
//               <dd>{trim.frontSuspension}</dd>
//               <dt>후륜브레이크</dt>
//               <dd>{trim.rearSuspension}</dd>
//               <dt>전륜서스펜션</dt>
//               <dd>{trim.frontBrake}</dd>
//               <dt>후륜서스펜션</dt>
//               <dd>{trim.rearBrake}</dd>
//               <dt>탑승정원</dt>
//               <dd>{trim.capacity}</dd>
//             </S.ChartDl>
//           </dd>
//         )}
//       </S.SpacDl>
//     </>
//   );
// }

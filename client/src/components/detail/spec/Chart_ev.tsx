// styled-components
import * as S from "../../../styled/Detail.styled";

// 하이브리드
export default function ChartEv({ trim }) {
  console.log(trim);
  return (
    <dd>
      {/* OPTION chart 1LINE */}
      <S.ChartDl>
        <dt>연료</dt>
        <dd>{trim.fuel_type}</dd>
        <dt>배터리 타입</dt>
        <dd>{trim.battery_type}</dd>
        <dt>배터리 용량</dt>
        <dd>{trim.battery_volume}&nbsp;<span>kWh</span></dd>
        <dt>배터리 전압</dt>
        <dd>{trim.battery_voltage}&nbsp;<span>V</span></dd>
        <dt>변속기</dt>
        <dd>
          {trim.trans_mission.gear} {trim.trans_mission.type}
        </dd>
        <dt>구동방식</dt>
        <dd>{trim.driving_system}</dd>
        <dt>모터출력</dt>
        <dd>{trim.motor_power}&nbsp;<span>kw</span></dd>
        <dt>모터토크</dt>
        <dd>{trim.motor_torque?.toFixed(1)}&nbsp;<span>kg.m</span></dd>
      </S.ChartDl>
      {/* OPTION 2LINE */}
      <S.ChartDl>
        <dt>복합전비</dt>
        <dd>{trim.ev_mileage?.toFixed(1)}&nbsp;<span>km/kWh</span></dd>
        <dt>도심전비</dt>
        <dd>{trim.urban_ev_mileage?.toFixed(1)}&nbsp;<span>km/kWh</span></dd>
        <dt>고속도로전비</dt>
        <dd>{trim.highway_ev_mileage?.toFixed(1)}&nbsp;<span>km/kWh</span></dd>
        <dt>연비등급</dt>
        <dd>{trim.low_emission}</dd>
        <dt>공차중량</dt>
        <dd>{trim.vehicle_weight}&nbsp;<span>kg</span></dd>
      </S.ChartDl>
      {/* OPTION 3LINE */}
      <S.ChartDl>
        <dt>앞타이어규격</dt>
        <dd>
          {trim.front_tire.width} {trim.front_tire.flatness}R {trim.front_tire.inch}
        </dd>
        <dt>뒷타이어규격</dt>
        <dd>
          {trim.rear_tire.width} {trim.rear_tire.flatness}R {trim.rear_tire.inch}
        </dd>
        <dt>전륜브레이크</dt>
        <dd>{trim.front_suspension}</dd>
        <dt>후륜브레이크</dt>
        <dd>{trim.rear_suspension}</dd>
        <dt>전륜서스펜션</dt>
        <dd>{trim.front_brake}</dd>
        <dt>후륜서스펜션</dt>
        <dd>{trim.rear_brake}</dd>
        <dt>탑승정원</dt>
        <dd>{trim.capacity}</dd>
      </S.ChartDl>
    </dd>
  );
}

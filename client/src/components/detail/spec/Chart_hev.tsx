// styled-components
import * as S from "../../../styled/Detail.styled";

// 하이브리드
export default function ChartHev({ trim }) {
  return (
    <dd>
      {/* OPTION chart 1LINE */}
      <S.ChartDl>
        <dt>연료</dt>
        <dd>{trim.fuel_type}</dd>
        <dt>엔진형식</dt>
        <dd>{trim.engine}</dd>
        <dt>배기량</dt>
        <dd>
          {trim.displacement}&nbsp;<span>cc</span>
        </dd>
        <dt>변속기</dt>
        <dd>
          {trim.trans_mission.gear} {trim.trans_mission.type}
        </dd>
        <dt>구동방식</dt>
        <dd>{trim.driving_system}</dd>
        <dt>최고출력</dt>
        <dd>
          {trim.power}&nbsp;<span>마력</span>
        </dd>
        <dt>최대토크</dt>
        <dd>
          {trim.torque?.toFixed(1)}&nbsp;<span>kg.m</span>
        </dd>
      </S.ChartDl>
      {/* OPTION 2LINE */}
      <S.ChartDl>
        <dt>모터출력</dt>
        <dd>{trim.motor_power}&nbsp;<span>kw</span></dd>
        <dt>모터토크</dt>
        <dd>{trim.motor_torque}&nbsp;<span>kg.m</span></dd>
        <dt>복합연비</dt>
        <dd>{trim.gas_mileage?.toFixed(1)}</dd>
        <dt>도심연비</dt>
        <dd>{trim.urban_gas_mileage?.toFixed(1)}km/l</dd>
        <dt>고속도로연비</dt>
        <dd>{trim.highway_gas_mileage?.toFixed(1)}km/l</dd>
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

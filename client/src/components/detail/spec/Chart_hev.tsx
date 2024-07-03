// styled-components
import * as S from "../../../styled/Detail.styled";

// 하이브리드
export default function ChartHev({ trim }) {
  return (
    <dd>
      {/* OPTION 1LINE */}
      <S.ChartDl>
        <dt>연료</dt>
        <dd>{trim.fuelType}</dd>
        <dt>엔진형식</dt>
        <dd>{trim.engine}</dd>
        <dt>배기량</dt>
        <dd>{trim.displacement}</dd>
        <dt>변속기</dt>
        <dd>{trim.transMission}</dd>
        <dt>구동방식</dt>
        <dd>{trim.drivingSystem}</dd>
        <dt>최고출력</dt>
        <dd>{trim.power}</dd>
        <dt>최대토크</dt>
        <dd>{trim.torque}</dd>
      </S.ChartDl>

      {/* OPTION 2LINE */}
      <S.ChartDl>
        <dt>연비등급</dt>
        <dd>{trim.ratingGasMileage}</dd>
        <dt>복합연비</dt>
        <dd>{trim.complexGasMileage}</dd>
        <dt>도심연비</dt>
        <dd>{trim.urbanGasMileage}</dd>
        <dt>고속도로연비</dt>
        <dd>{trim.highwayGasMileage}</dd>
        <dt>저공해등급</dt>
        <dd>{trim.lowEmission}</dd>
        <dt>모터출력</dt>
        <dd>{trim.motorPower}</dd>
        <dt>모터토크</dt>
        <dd>{trim.motorTorque}</dd>
        <dt>배터리타입</dt>
        <dd>{trim.batteryType}</dd>
        <dt>배터리용량</dt>
        <dd>{trim.batteryVolume}</dd>
      </S.ChartDl>

      {/* OPTION 3LINE */}
      <S.ChartDl>
        <dt>자율주행 레벨</dt>
        <dd>{trim.autoLevel}</dd>
        <dt>공차중량</dt>
        <dd>{trim.vehicleWeight}</dd>
        <dt>앞타이어규격</dt>
        <dd>{trim.frontTire}</dd>
        <dt>뒷타이어규격</dt>
        <dd>{trim.rearTire}</dd>
        <dt>전륜브레이크</dt>
        <dd>{trim.frontSuspension}</dd>
        <dt>후륜브레이크</dt>
        <dd>{trim.rearSuspension}</dd>
        <dt>전륜서스펜션</dt>
        <dd>{trim.frontBrake}</dd>
        <dt>후륜서스펜션</dt>
        <dd>{trim.rearBrake}</dd>
        <dt>탑승정원</dt>
        <dd>{trim.capacity}</dd>
      </S.ChartDl>
    </dd>
  );
}

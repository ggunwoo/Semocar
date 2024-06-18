import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { imageUrl } from "../../../utils/constants";
import * as type from "../../types/types";

// styled-components
import * as S from "../../styled/Detail.styled";

// Components
import GradeSelect from "./GradeSelect";
import Chart from "./Chart";
import SizeBox from "./SizeBox";

export default function ModelInfo() {
  const car = useAppSelector(state => state.car.item);
  const status = useAppSelector(state => state.car.status);

  const selectGrade = useAppSelector(state => state.selectGrade.selectGrade);
  const selectTrim = useAppSelector(state => state.selectGrade.selectTrim);

  const grade: any = car.grades && car.grades.find(grade => grade.id === selectGrade);
  const trim: any = grade.trims ? grade.trims.find(trim => trim.id === selectTrim) : grade;

  return (
    <S.ChartWrapper>
      <div className="infoWrap" id="grade">
        <GradeSelect />

        {/* 제원 차트 SPAC */}
        <Chart trim={trim} />

        {/* 차량 사이즈이미지 */}
        <SizeBox trim={trim} />
      </div>
    </S.ChartWrapper>
  );
}

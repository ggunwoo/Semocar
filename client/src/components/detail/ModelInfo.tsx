import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { imageUrl } from "../../../utils/constants";
import * as type from "../../types/types";

// styled-components
import * as S from "../../styled/Detail.styled";

// Components
import GradeSelect from "./GradeSelect";
import ChartIce from "./spec/Chart_ice";
import ChartHev from "./spec/Chart_hev";
import ChartPhev from "./spec/Chart_phev";
import ChartEv from "./spec/Chart_ev";
import SizeBox from "./SizeBox";

export default function ModelInfo() {
  const car = useAppSelector(state => state.car.item);
  const status = useAppSelector(state => state.car.status);

  console.log(car);

  const selectGrade = useAppSelector(state => state.selectGrade.selectGrade);
  const selectTrim = useAppSelector(state => state.selectGrade.selectTrim);

  const grade: any = car.grades && car.grades.find(grade => grade.id === selectGrade);
  const trim: any = grade.trims ? grade.trims.find(trim => trim.id === selectTrim) : grade;

  return (
    <S.ChartWrapper>
      <div className="infoWrap" id="grade">
        <GradeSelect />

        {/* 가격 price */}
        <S.PriceDl>
          <dt>가격</dt>
          <dd>{trim?.price ? <p>{trim.price.toLocaleString("ko-KR")}만원</p> : <p>가격정보없음</p>}</dd>
        </S.PriceDl>

        {trim.engine ? (
          <>
            <S.SpacDl>
              <dt>제원</dt>
              <div style={{ position: "absolute", bottom: "0" }}></div>

              {/* 트림 유형별 차트 */}
              {trim.field === "ICE" && <ChartIce trim={trim} />}
              {trim.field === "HEV" && <ChartHev trim={trim} />}
              {trim.field === "PHEV" && <ChartPhev trim={trim} />}
              {trim.field === "EV" && <ChartEv trim={trim} />}
            </S.SpacDl>
            {/* 차량 사이즈이미지 */}
            <SizeBox trim={trim} />
          </>
        ) : (
          <div>상세정보가 없습니다.</div>
        )}
      </div>
    </S.ChartWrapper>
  );
}

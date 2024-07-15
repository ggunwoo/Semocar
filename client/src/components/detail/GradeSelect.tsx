import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setGrade, setTrim } from "../../store/slice/selectGradeSlice";

import * as S from "../../styled/Detail.styled";

export default function GradeSelect() {
  const dispatch = useAppDispatch();
  const car = useAppSelector(state => state.car.item);
  const selectGrade = useAppSelector(state => state.selectGrade.selectGrade);
  const selectTrim = useAppSelector(state => state.selectGrade.selectTrim);

  const grade: any = car.grades && car.grades.find(grade => grade.id === selectGrade);
  const trim: any = grade.trims ? grade.trims.find(trim => trim.id === selectTrim) : grade;
  return (
    <S.SelectWrapper>
      {/* 등급 Grade */}
      <dl>
        <dt>등급</dt>
        <dd>
          {car.grades.map((grade, idx) => (
            <div
              key={idx}
              className={`selectBtn grade ${grade.id === selectGrade ? "clicked" : null}`}
              onClick={() => {
                dispatch(setGrade(grade.id));
                dispatch(setTrim("1"));
              }}>
              {grade.name}
            </div>
          ))}
        </dd>
      </dl>

      {/* 트림 Trim */}
      <dl>
        <dt>트림</dt>
        <dd>
          {grade.trims.map((trim, index) => (
            <div
              key={trim.name}
              className={`selectBtn trim ${trim.id === selectTrim ? "clicked" : null} `}
              onClick={() => {
                dispatch(setTrim(trim.id));
              }}>
              {trim.name}
            </div>
          ))}
        </dd>
      </dl>
    </S.SelectWrapper>
  );
}

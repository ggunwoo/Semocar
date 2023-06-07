import React, { useState } from 'react';
import { styled } from 'styled-components'
import { FormControl, FormGroup, FormControlLabel} from '@mui/material';
import { Checkbox } from '@mui/joy'
// import * as type from '../types/types'

// Redux
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { segIn, segReset, fuelIn, fuelReset } from '../store/carFilter';
import { segAllChange, segHandle, fuelAllChange, fuelHandle } from '../store/check';

// COMPONENT
import {BrandNav} from '../components/BrandNav';
import {TabView} from '../components/TabView';

// STYLED COMPONENTS
  // SearchBox Styled
import { MaxContainer, Blank } from '../App';

  // CheckBox Styled
const FormWraper = styled.div`
&& {
  width: 100%;
  height: 200px;
  background-color: #fcfcfc;
  border: 1px solid rgba(0,0,0,.2);
  margin-top: 2rem;
  padding: 42px 36px 18px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
}`;
const CheckboxLine = styled.div`
&& {
  width: 100%;
  display: flex;
  align-items: flex-start;

  /* TEMP */
  /* border: 1px solid #D8D8D8; */
}`;
const CheckboxTitle = styled.div`
&& {
  width: 5%;
  /* margin-top: 0.47rem; */
}`;
const CheckBoxWraper = styled(FormGroup)`
&& {
  width: 95%;
}`;
const StyledFormControlLabel = styled(FormControlLabel)`
&& {
  margin: 2px 0 8px 14px;
  .MuiTypography-root {
    margin-left: 4px;
    font-size: 14px;
  }
}`;
// Search View Styled
export function Brand ():JSX.Element {
  const dispatch = useAppDispatch();

  const segmentList = ['경차', '소형세단', '준중형세단', '중형세단', '준대형세단', '대형세단', '소형SUV','준중형SUV', '중형SUV', '준대형SUV', '대형SUV', 'RV', 'MPV', '픽업', '벤', '해치백', '왜건']
  const fuelTypeList = ['가솔린', '디젤', 'LPG', '하이브리드', '전기', '수소']
  
  const segChecked = useAppSelector((state)=> state.segCheck);
  const segAll = useAppSelector((state)=> state.segAll);

  const fuelChecked = useAppSelector((state)=> state.fuelCheck);
  const fuelAll = useAppSelector((state)=> state.fuelAll)

// 차급 체크박스 Checked 로직
  // 차급 전체 체크박스 로직
  const segmentAllHandle = () => {
    const updatedChecked = Array(segmentList.length).fill(false);
    dispatch(segHandle(updatedChecked))
    dispatch(segAllChange(true))

    // selected reset
    dispatch(segReset())
    
  };
  // 차급 체크박스 로직
  const segmentHandle = (segment: string, index: number) => {

    const updatedChecked = [...segChecked];  
    updatedChecked[index] = !updatedChecked[index];
    dispatch(segHandle(updatedChecked))

    dispatch(segAllChange(false))

    if(segAll === false && updatedChecked.find( e => e === true) === undefined ){
      dispatch(segAllChange(true))
    }

    // selected Segment
    dispatch(segIn(segment));
  };

// 연료 체크박스 Checked 로직
  // 연료 전체 체크박스 로직
  const fuelTypeAllHandle = () => {
    const updatedChecked = Array(fuelTypeList.length).fill(false);
    dispatch(fuelHandle(updatedChecked))

    dispatch(fuelAllChange(true))

    // selected reset
    dispatch(fuelReset());
  };
  // 연료 체크박스 로직
  const fuelTypeHandle = (fuelType:string, index: number) => {

    const updatedChecked = [...fuelChecked];
    updatedChecked[index] = !updatedChecked[index];
    dispatch(fuelHandle(updatedChecked))

    dispatch(fuelAllChange(false))

    if(fuelAll === false && updatedChecked.find( e => e === true) === undefined ){
      dispatch(fuelAllChange(true))
    }
    // selected Fuel Type
    dispatch(fuelIn(fuelType));
  };

  return (
    <>
      <MaxContainer>
        
        <Blank />

        {/* Brand Search Nav */}
        <BrandNav />

        {/* Search Check Box */}
        <FormWraper>
          <CheckboxLine>
            <CheckboxTitle>차급</CheckboxTitle>
            <CheckBoxWraper row={true}>
              <StyledFormControlLabel control={
                <Checkbox className="segmentDefalutCheckBox" checked={segAll} onChange={() => {segmentAllHandle();}} variant='outlined' size="sm" color="neutral" />} label="전체"
              ></StyledFormControlLabel>
              {
                segmentList.map((segment, index)=>(
                  <StyledFormControlLabel key={segment} control={
                    <Checkbox className="segmentCheckBox" checked={segChecked[index]} onChange={() => { segmentHandle(segment, index);}} variant='outlined' size="sm" color="neutral" />} label={`${segment}`}
                  ></StyledFormControlLabel>
                ))
              }
            </CheckBoxWraper>
          </CheckboxLine>
          <CheckboxLine>
            <CheckboxTitle>연료</CheckboxTitle>
            <CheckBoxWraper row={true}>
              <StyledFormControlLabel control={
                <Checkbox className="fuelTypeDefalutCheckBox" checked={fuelAll} onChange={() => { fuelTypeAllHandle() }} variant='outlined' size="sm" color="neutral" />} label="전체"
              ></StyledFormControlLabel>
              {
                fuelTypeList.map((fuelType, index)=>(
                  <StyledFormControlLabel key={fuelType} control={
                    <Checkbox className="fuelTypeCheckBox" checked={fuelChecked[index]} onChange={()=> { fuelTypeHandle(fuelType, index) }} variant='outlined' size="sm" color="neutral" />} label={`${fuelType}`}
                  ></StyledFormControlLabel>
                ))
              }
            </CheckBoxWraper>
          </CheckboxLine>
        </FormWraper>

        <Blank />

        {/* Search View */}
        <TabView />
        
      </MaxContainer>
    </>
  )
}


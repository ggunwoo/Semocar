import React, { useState } from 'react';
import { styled } from 'styled-components'
import { FormControl, OutlinedInput, InputAdornment, FormGroup, FormControlLabel} from '@mui/material';
import { Checkbox } from '@mui/joy'
import SearchIcon from '@mui/icons-material/Search';
// import * as type from '../types/types'

// Redux
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { segIn, segReset } from '../store/segment';
import { fuelIn, fuelReset } from '../store/fuelType';

// COMPONENT
import {BrandNav} from '../components/BrandNav';
import {TabView} from '../components/TabView';

// STYLED COMPONENTS
  // SearchBox Styled
import { MaxContainer } from '../App';
const SearchBarWraper = styled.div`
&& {
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
}`;
  // CheckBox Styled
const FormWraper = styled.div`
&& {
  width: 100%;
  height: 200px;  
  padding: 42px 36px 18px;
  border: 1px solid rgba(0,0,0,.2);
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
  
  const [segmentChecked, setSegmentChecked] = useState(Array(segmentList.length).fill(false));
  const [segmentChecked2, setSegmentChecked2] = useState(true);
  const [fuelTypeChecked, setFuelTypeChecked] = useState(Array(fuelTypeList.length).fill(false));
  const [fuelTypeChecked2, setFuelTypeChecked2] = useState(true);
  
  
// 차급 체크박스 Checked 로직
  // 차급 전체 체크박스 로직
  const segmentAllHandle = () => {
    const updatedChecked = Array(segmentList.length).fill(false);
    setSegmentChecked(updatedChecked);
    setSegmentChecked2(true);

    // selected reset
    dispatch(segReset())
    
  };
  // 차급 체크박스 로직
  const segmentHandle = (segment: string, index: number) => {
    const updatedChecked = [...segmentChecked];  
    updatedChecked[index] = !updatedChecked[index];
    setSegmentChecked(updatedChecked);
    setSegmentChecked2(false);
    if(segmentChecked2 === false && updatedChecked.find( e => e === true) === undefined ){
      setSegmentChecked2(true);
    }

    // selected Segment
    dispatch(segIn(segment));
  };

// 연료 체크박스 Checked 로직
  // 연료 전체 체크박스 로직
  const fuelTypeAllHandle = () => {
    const updatedChecked = Array(fuelTypeList.length).fill(false);
    setFuelTypeChecked(updatedChecked);
    setFuelTypeChecked2(true);

    // selected reset
    dispatch(fuelReset());
  };
  // 연료 체크박스 로직
  const fuelTypeHandle = (fuelType:string, index: number) => {
    const updatedChecked = [...fuelTypeChecked];
    updatedChecked[index] = !updatedChecked[index];
    setFuelTypeChecked(updatedChecked);
    setFuelTypeChecked2(false);
    if(fuelTypeChecked2 === false && updatedChecked.find( e => e === true) === undefined ){
      setFuelTypeChecked2(true);
    }

    // selected Fuel Type
    dispatch(fuelIn(fuelType));
    
  };


  return (
    <>
      <MaxContainer>
        {/* 검색창 */}
        <SearchBarWraper>
          <div></div>
          <FormControl size='small' sx={{m:1}}>
            <OutlinedInput
            id="input-with-icon-adornment"
            // Icon
            endAdornment={ <InputAdornment position="end"><SearchIcon /></InputAdornment> }
            />
          </FormControl>
        </SearchBarWraper>

        {/* Brand Search Nav */}
        <BrandNav />

        {/* Search Check Box */}
        <FormWraper>
          <CheckboxLine>
            <CheckboxTitle>차급</CheckboxTitle>
            <CheckBoxWraper row={true}>
              <StyledFormControlLabel control={
                <Checkbox className="segmentDefalutCheckBox" checked={segmentChecked2} onChange={() => {segmentAllHandle();}} variant='outlined' size="sm" color="neutral" />} label="전체"
              ></StyledFormControlLabel>
              {
                segmentList.map((segment, index)=>(
                  <StyledFormControlLabel key={segment} control={
                    <Checkbox className="segmentCheckBox" checked={segmentChecked[index]} onChange={() => { segmentHandle(segment, index);}} variant='outlined' size="sm" color="neutral" />} label={`${segment}`}
                  ></StyledFormControlLabel>
                ))
              }
            </CheckBoxWraper>
          </CheckboxLine>
          <CheckboxLine>
            <CheckboxTitle>연료</CheckboxTitle>
            <CheckBoxWraper row={true}>
              <StyledFormControlLabel control={
                <Checkbox className="fuelTypeDefalutCheckBox" checked={fuelTypeChecked2} onChange={() => { fuelTypeAllHandle() }} variant='outlined' size="sm" color="neutral" />} label="전체"
              ></StyledFormControlLabel>
              {
                fuelTypeList.map((fuelType, index)=>(
                  <StyledFormControlLabel key={fuelType} control={
                    <Checkbox className="fuelTypeCheckBox" checked={fuelTypeChecked[index]} onChange={()=> { fuelTypeHandle(fuelType, index) }} variant='outlined' size="sm" color="neutral" />} label={`${fuelType}`}
                  ></StyledFormControlLabel>
                ))
              }
            </CheckBoxWraper>
          </CheckboxLine>
        </FormWraper>
        {/* Search View */}
        <TabView />
        
      </MaxContainer>
    </>
  )
}


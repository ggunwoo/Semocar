import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { styled } from 'styled-components'
import { FormControl, OutlinedInput, InputAdornment, FormGroup, FormControlLabel} from '@mui/material';
import { Checkbox } from '@mui/joy'
import SearchIcon from '@mui/icons-material/Search';
// import * as type from '../types/types'

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

  const segment = ['경차', '소형세단', '준중형세단', '중형세단', '준대형세단', '대형세단', '소형SUV','준중형SUV', '중형SUV', '준대형SUV', '대형SUV', 'RV', 'MPV', '픽업', '벤', '해치백', '왜건']
  const fuelType = ['가솔린', '디젤', 'LPG', '하이브리드', '전기', '수소']

  const [segmentChecked, setSegmentChecked] = useState(Array(segment.length).fill(false));
  const [segmentChecked2, setSegmentChecked2] = useState(true);
  const [fuelTypeChecked, setFuelTypeChecked] = useState(Array(fuelType.length).fill(false));
  const [fuelTypeChecked2, setFuelTypeChecked2] = useState(true);

  // const [propsSegment, setPropsSegment] = useState<string[]>([])
  // const [propsFuelType, setPropsFuelType] = useState<string[]>([])
  
// 차급 체크박스 Checked 로직
  // 차급 전체 체크박스 로직
  const segmentAllHandle = () => {
    const updatedChecked = Array(segment.length).fill(false);
    setSegmentChecked(updatedChecked);
    setSegmentChecked2(true);
    if(propsSegment.length !== 0){
      setPropsSegment([]);
    }
  };
  // 차급 체크박스 로직
  const segmentHandle = (index: number, segment: string) => {
    const updatedChecked = [...segmentChecked];  
    updatedChecked[index] = !updatedChecked[index];
    setSegmentChecked(updatedChecked);
    setSegmentChecked2(false);
    if(segmentChecked2 === false && updatedChecked.find( e => e === true) === undefined ){
      setSegmentChecked2(true);
    }
    // PropsSegment 로직
    if(propsSegment.includes(segment)){
      const updatedSegment = propsSegment.filter((item) => item !== segment);
      setPropsSegment(updatedSegment);
    } else {
      let copySegment = [...propsSegment, segment]
      setPropsSegment(copySegment)
    }
  };

// 연료 체크박스 Checked 로직
  // 연료 전체 체크박스 로직
  const fuelTypeAllHandle = () => {
    const updatedChecked = Array(fuelType.length).fill(false);
    setFuelTypeChecked(updatedChecked);
    setFuelTypeChecked2(true);
    if(propsFuelType.length !== 0){
      setPropsFuelType([]);
    }
  };
  // 연료 체크박스 로직
  const fuelTypeHandle = (index: number, fuelType:string) => {
    const updatedChecked = [...fuelTypeChecked];
    updatedChecked[index] = !updatedChecked[index];
    setFuelTypeChecked(updatedChecked);
    setFuelTypeChecked2(false);
    if(fuelTypeChecked2 === false && updatedChecked.find( e => e === true) === undefined ){
      setFuelTypeChecked2(true);
    }
    // propsFuelType 로직
    if (propsFuelType.includes(fuelType)) {
      const updatedFuelType = propsFuelType.filter((item) => item !== fuelType);
      setPropsFuelType(updatedFuelType);
    } else {
      const copyFuelType = [...propsFuelType, fuelType];
      setPropsFuelType(copyFuelType);
    }
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
                segment.map((a, i)=>(
                  <StyledFormControlLabel key={segment[i]} control={
                    <Checkbox className="segmentCheckBox" checked={segmentChecked[i]} onChange={() => { segmentHandle(i, a);}} variant='outlined' size="sm" color="neutral" />} label={`${a}`}
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
                fuelType.map((a, i)=>(
                  <StyledFormControlLabel key={fuelType[i]} control={
                    <Checkbox className="fuelTypeCheckBox" checked={fuelTypeChecked[i]} onChange={()=> { fuelTypeHandle(i, a) }} variant='outlined' size="sm" color="neutral" />} label={`${a}`}
                  ></StyledFormControlLabel>
                ))
              }
            </CheckBoxWraper>
          </CheckboxLine>
        </FormWraper>
        {/* Search View */}
        <TabView segment={propsSegment} fuelType={propsFuelType}  />
        
      </MaxContainer>
    </>
  )
}


import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components'
import { FormControl, OutlinedInput, InputAdornment, FormGroup, FormControlLabel, Box, Tabs, Tab, Typography } from '@mui/material';
import { Checkbox } from '@mui/joy'
import SearchIcon from '@mui/icons-material/Search';
import * as type from '../types/types'

// COMPONENT
import {BrandCar} from '../components/BrandCar'
import {BrandNav} from '../components/BrandNav'
import {TabView}  from '../components/TabView'

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

  const [segment, setSegment] = useState(['경차', '소형', '준중형', '중형', '준대형', '대형', '소형SUV', '중형SUV', '준대형SUV', '대형SUV', 'RV/MPV', '픽업/벤', '해치백', '왜건']);
  const [engine, setEngine] = useState(['가솔린', '디젤', 'LPG', '하이브리드', '전기', '수소']);
  const [segmentChecked, setSegmentChecked] = useState(Array(segment.length).fill(false));
  const [segmentChecked2, setSegmentChecked2] = useState(true);
  const [engineChecked, setEngineChecked] = useState(Array(engine.length).fill(false));

  
  
  const [engineChecked2, setEngineChecked2] = useState(true);
  
  const segmentDefalutHandle = () => {
    const updatedChecked = Array(segment.length).fill(false);
    setSegmentChecked(updatedChecked);
    setSegmentChecked2(true);
  };
  const segmentHandle = (index: number) => {
    const updatedChecked = [...segmentChecked];
    updatedChecked[index] = !updatedChecked[index];
    setSegmentChecked(updatedChecked);
    setSegmentChecked2(false);
    if(segmentChecked2 === false && updatedChecked.find( e => e === true) === undefined ){
      setSegmentChecked2(true);
    }
  };
  const engineDefalutHandle = () => {
    const updatedChecked = Array(engine.length).fill(false);
    setEngineChecked(updatedChecked);
    setEngineChecked2(true);
  };
  const engineHandle = (index: number) => {
    const updatedChecked = [...engineChecked];
    updatedChecked[index] = !updatedChecked[index];
    setEngineChecked(updatedChecked);
    setEngineChecked2(false);
    if(engineChecked2 === false && updatedChecked.find( e => e === true) === undefined ){
      setEngineChecked2(true);
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
                <Checkbox className="segmentDefalutCheckBox" checked={segmentChecked2} onChange={segmentDefalutHandle} variant='outlined' size="sm" color="neutral" />} label="전체"
              ></StyledFormControlLabel>
              {
                segment.map((a, i)=>(
                  <StyledFormControlLabel key={segment[i]} control={
                    <Checkbox className="segmentCheckBox" checked={segmentChecked[i]} onChange={()=> segmentHandle(i)} variant='outlined' size="sm" color="neutral" />} label={`${a}`}
                  ></StyledFormControlLabel>
                ))
              }
            </CheckBoxWraper>
          </CheckboxLine>
          <CheckboxLine>
            <CheckboxTitle>연료</CheckboxTitle>
            <CheckBoxWraper row={true}>
              <StyledFormControlLabel control={
                <Checkbox className="engineDefalutCheckBox" checked={engineChecked2} onChange={engineDefalutHandle} variant='outlined' size="sm" color="neutral" />} label="전체"
              ></StyledFormControlLabel>
              {
                engine.map((a, i)=>(
                  <StyledFormControlLabel key={engine[i]} control={
                    <Checkbox className="engineCheckBox" checked={engineChecked[i]} onChange={()=> engineHandle(i)} variant='outlined' size="sm" color="neutral" />} label={`${a}`}
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


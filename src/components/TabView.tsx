import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux'
import { styled } from 'styled-components';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import * as type from '../types/types';
import { useCarData } from '../hook/useCarData';

// STYLED
import { MaxContainer } from '../App';
const CarSection = styled.div`
&& {
  width: 1100px;
  /* border: 1px solid black; */
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: baseline;
}`;

type TabViewProps = {
  segment: string[]
};


export function TabView(props:TabViewProps) {
  const navigate = useNavigate();

  const [value, setValue] = useState(0);
  const [tabIndex, setTabIndex] = useState([0, 1, 2]);
  const [sortOption, setSortOption] = useState('latest'); // 최신순, 가격순, 연비순 정렬 기준
  const carData = useCarData();
  const [filterSegment, setFilterSegment] = useState([])

  // 차량 데이터를 정렬하는 함수
  const sortCarData = (data: any, checkSegment:string[]) => {
    // 전체 데이터
    let sortedData = [...data];

    const filterHandler = checkSegment.map((a, i)=>{
      const filterData = []
      const filter = sortedData.filter((e) => e.segment === a);
      filterData.push(...filter)
      // console.log(a)
      return filterData
    })
    console.log(filterHandler)

    // 필터된 데이터
    let mergedFilterData = ([] as any[]).concat(...filterHandler)
    console.log(mergedFilterData)

    const sorted = (mustSortData: any[])=>{
      if (sortOption === 'latest') {
        // 최신순 정렬
        mustSortData.sort((a, b) => b.id - a.id);
      } else if (sortOption === 'price') {
        // 가격순 정렬
        mustSortData.sort((a, b) => a.price.min - b.price.min);
      } else if (sortOption === 'mileage') {
        // 연비순 정렬
        mustSortData.sort((a, b) => {
          const aMileage = parseFloat(a.grades[0]?.gasMileage || 0);
          const bMileage = parseFloat(b.grades[0]?.gasMileage || 0);
          return bMileage - aMileage;
        });
      }
    }
    mergedFilterData.length === 0
    ?
    sorted(sortedData)
    :
    sorted(mergedFilterData)

    return mergedFilterData.length === 0 ? sortedData : mergedFilterData
  };

  // 정렬 기준 변경 시 처리하는 함수
  const handleSortChange = (event: React.SyntheticEvent, value: any) => {
    setSortOption(value);
  };

  return (
    <MaxContainer>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={sortOption} onChange={handleSortChange} aria-label="정렬 기준">
          <Tab label="최신순" value="latest" {...a11yProps(0)} />
          <Tab label="가격순" value="price" {...a11yProps(1)} />
          <Tab label="연비순" value="mileage" {...a11yProps(2)} />
        </Tabs>
        </Box>
        {tabIndex.map((tab, i) => (
          <TabPanel key={tab} value={value} index={i}>
            <CarSection>
              {sortCarData(carData, props.segment).map((car, index) => (
                <div key={index} onClick={()=>{navigate(`/detail/${car.id}`)}} style={{width:"275px"}}>
                  <img
                    style={{ width: '80%' }}
                    src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${car.imgUrl}.png`}
                    alt={car.name.en}
                  />
                  <div style={{ fontWeight: 'bold', margin: '4px 0 4px' }}>{`${car.brand.kr} ${car.name.kr}`}</div>
                  <div>가격: {`${car.price.min} ~ ${car.price.max}`}</div>
                  <div>차급: {car.segment}</div>
                </div>
              ))}
            </CarSection>
          </TabPanel>
        ))}
      </Box>
    </MaxContainer>
  );
}

function a11yProps(index: number) { 
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: type.TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux'
import { styled } from 'styled-components';
import { Box, Tabs, Tab, Button } from '@mui/material';
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
  @media (max-width:1440px) {
    width: 960px;
    
  }
}`;
const CarArticle = styled.div`
&& {
  width: 275px;
  @media (max-width: 1440px){
      width: 240px;
    }
}`;

type Props = {
  segment: string[]
  fuelType: string[]
};



export function TabView(props:Props) {
  const navigate = useNavigate();

  const [value, setValue] = useState(0);
  const [tabIndex, setTabIndex] = useState([0, 1, 2]);
  const [sortOption, setSortOption] = useState('latest'); // 최신순, 가격순, 연비순 정렬 기준
  const carData = useCarData();
  const [filterSegment, setFilterSegment] = useState([])

  // 차량 데이터를 정렬하는 함수
  const sortCarData = (data: any, checkSegment:string[], checkFuelType:string[]): any[] => {
    // 전체 데이터
    let sortedData = [...data];

    // segment 필터링 로직
    const filterSegHandler = checkSegment.map((a, i)=>{
      const filterSegData = sortedData.filter((e) => e.segment === a);
      return filterSegData
    })
    // fuelType 필터링 로직
    const filterFuelTypeHandler:type.Car[][] = checkFuelType.map((a, i)=>{
      const filterFuelTypeData = sortedData.filter((cars) =>cars.fuelTypes.includes(a));
      return filterFuelTypeData
    })

    // 필터링된 데이터
    // segment Filtered 데이터
    let segmentFilterData = ([] as any[]).concat(...filterSegHandler)
    // fuelType Filtered 데이터
    let fuelTypeFilterData = ([] as any[]).concat(...filterFuelTypeHandler)
    // segment && fuelType Filtered
    let mergedFilterData = segmentFilterData.filter((car) => fuelTypeFilterData.includes(car));
    // 중복 제거
    let duplicateRemoveData = mergedFilterData.filter((item, pos)=> mergedFilterData.indexOf(item) === pos);
    
    // 정렬 로직
    const sorted = (mustSortData: type.Car[])=>{
      if (sortOption === 'latest') {
        // 최신순 정렬 ('date' 데이터 아직 안넣어서 'id'로 대체)
        mustSortData.sort((a, b) => b.id - a.id);
      } else if (sortOption === 'price') {
        // 가격순 정렬
        mustSortData.sort((a, b) => a.price.min - b.price.min);
      } else if (sortOption === 'mileage') {
        // 연비순 정렬
        mustSortData.sort((a: type.Car, b: type.Car) => {
          const aMileage = parseFloat(a.gasMileage);
          const bMileage = parseFloat(b.gasMileage);
          return bMileage - aMileage;
        });
      }
    }
    // 정렬 - 매개변수, 전부 빈 배열 일경우 전체데이터 반환
    if(checkSegment.length !== 0 && checkFuelType.length !== 0){
      sorted(sortedData)
    }
    if(checkSegment.length === 0 && checkFuelType.length !== 0){
      sorted(segmentFilterData)
    }
    if(checkSegment.length !== 0 && checkFuelType.length === 0){
      sorted(fuelTypeFilterData)
    }
    if(checkSegment.length === 0 && checkFuelType.length === 0){
      sorted(duplicateRemoveData)
    }
    
    
    // console.log("checkSegment : " + checkSegment.length)
    // console.log("checkFuelType : " + checkFuelType.length)
    
    // 전체 return Checked
    const filteredData = (): type.Car[] | string[] => {
      // 체크값 하나만 들어왔을때 검사지
      const oneCheckNullTest = [...segmentFilterData, ...fuelTypeFilterData].length;
      const segmentLength = checkSegment.length;
      const fuelTypeLength = checkFuelType.length;
      // console.log('oneCheckNullTest : ' +oneCheckNullTest)
      // console.log('merged : '+mergedFilterData.length )

        // 퓨어타입 하나 들어왔는데 합친값이 없네?
      if (segmentLength === 0 && fuelTypeLength !== 0 && oneCheckNullTest === 0) {
        return ['selectAgain']
        
        // 둘다 값이 있는데 합친값이 없어?
      } else if (segmentLength !== 0 && fuelTypeLength !== 0 && mergedFilterData.length === 0) {
        return ['selectAgain']
        
        // 세그먼트 값 들어왔는데 값이 아예 없네?
      } else if (segmentLength !== 0 && fuelTypeLength === 0 && oneCheckNullTest === 0) {
        return ['selectAgain']
        
        
      } else if (segmentLength !== 0 && fuelTypeLength !== 0) {
        
        return duplicateRemoveData;
        
      } else if (segmentLength !== 0 && fuelTypeLength === 0) {
        
        return segmentFilterData;
        
      } else if (segmentLength === 0 && fuelTypeLength !== 0) {
        
        return fuelTypeFilterData;
        
      }
      else {
        return sortedData;
      }
    };

    return filteredData()
  };
  // console.log(sortCarData(carData, props.segment, props.fuelType))

  // 정렬 기준 변경 시 처리하는 함수
  const handleSortChange = (event: React.SyntheticEvent, value: any) => {
    setSortOption(value);
  };
  // 렌더링
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
              {
                (() => {
                  const filteredCars = sortCarData(carData, props.segment, props.fuelType);
                 if (filteredCars.includes('selectAgain')) {
                    return <div style={{ width: "100%" }}>해당되는 차량이 없습니다.</div>;
                  } else {
                    return filteredCars.map((car, index) => (
                      <CarArticle key={index}>
                        <img
                          style={{ width: '80%' }}
                          src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${car.imgUrl}.png`}
                          alt={car.name}
                        />
                        <div style={{ fontWeight: 'bold', margin: '4px 0 4px' }}>{`${car.brand.kr} ${car.name.kr}`}</div>
                        <div>가격: {`${car.price.min} ~ ${car.price.max}`}만원</div>
                        <div>차급: {car.segment}</div>
                        <div>연료: {car.fuelTypes}</div>
                        <div>연비: {car.gasMileage}</div>
                        <Button onClick={()=>{navigate(`/detail/${car.id}`)}} size='small' variant='outlined' >보러가기</Button>
                      </CarArticle>
                    ));
                  }
                })()
                // sortCarData(carData, props.segment, props.fuelType).find(e => e[0] === 'Error')
                // ?
                // <div style={{width:"275px"}}>페이지 오류입니다</div>
                // :
                // sortCarData(carData, props.segment, props.fuelType).find(e => e[0] === 'selectAgain')
                // ?
                // <div style={{width:"275px"}}>해당되는 차량이 없습니다. 죄송합니다. 다시 선택해주세요.</div>
                // :
                // sortCarData(carData, props.segment, props.fuelType).map((car, index) => (
                  // <div key={index}  style={{width:"275px"}}>
                    // <img
                    //   style={{ width: '80%' }}
                    //   src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${car.imgUrl}.png`}
                    //   alt={car.name}
                    // />
                    // <div style={{ fontWeight: 'bold', margin: '4px 0 4px' }}>{`${car.brand.kr} ${car.name.kr}`}</div>
                    // <div>가격: {`${car.price.min} ~ ${car.price.max}`}만원</div>
                    // <div>차급: {car.segment}</div>
                    // <div>연료: {car.fuelTypes}</div>
                    // <div>연비: {car.gasMileage}</div>
                    // <Button onClick={()=>{navigate(`/detail/${car.id}`)}} size='small' variant='outlined' >보러가기</Button>
                  // </div>
                // ))
              }
            </CarSection>
          </TabPanel>
        ))}
      </Box>
    </MaxContainer>
  );
}

// MUI Tab Component 로직
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


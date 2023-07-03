import React, {ChangeEvent, useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { useCarData } from '../hook/useCarData';
import * as type from '../types/types';
import { Tabs, Tab, OutlinedInput, InputAdornment } from '@mui/material';


// STYLED
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { MaxContainer } from '../styled/Global';
import * as S from '../styled/components/CarView.styled'

export function CarView() {
  const navigate = useNavigate();
  const carData = useCarData();

  const selectedSeg = useAppSelector(state => {return state.selectedSeg})
  const selectedFuel = useAppSelector(state => {return state.selectedFuel})
  const selectedBrand = useAppSelector(state => {return state.selectedBrand})

  const [value, setValue] = useState(0);
  const [tabIndex, setTabIndex] = useState([0, 1, 2]);
  const [sortOption, setSortOption] = useState('latest'); // 최신순, 가격순, 연비순 정렬 기준
  const [sliceView, setSliceView] = useState(8);
  const [showSpinner, setShowSpinner] = useState(false);
  const [carLength, setCarLength] = useState(0)
  const [searchText, setSearchText] = useState<string|number>('')
  const [submitValue, setSubmitValue] = useState<string|number>('')

  /** ::차량 데이터를 필터링, 정렬하는 함수:: */
  const handleCarfilter = (data: any, checkBrand:string[], checkSegment:string[], checkFuelType:string[]): any[] => {
    // 전체 데이터
    let sortedData = [...data];
    
    // brand 필터링 로직
    const filterBrandHandler = checkBrand.map((a, i)=>{
      const filterBrandData = sortedData.filter((e)=> e.brand.kr === a);
      return filterBrandData;
    })
    // segment 필터링 로직
    const filterSegHandler = checkSegment.map((a, i)=>{
      const filterSegData = sortedData.filter((e) => e.segment === a);
      return filterSegData;
    })
    // fuelType 필터링 로직
    const filterFuelTypeHandler:type.Car[][] = checkFuelType.map((a, i)=>{
      const filterFuelTypeData = sortedData.filter((cars) =>cars.fuelTypes.includes(a));
      return filterFuelTypeData;
    })

    // segment Filtered 데이터
    const segmentFilterData = ([] as any[]).concat(...filterSegHandler)
    // fuelType Filtered 데이터
    const fuelTypeFilterData = ([] as any[]).concat(...filterFuelTypeHandler)
    // brnad & segment & fuelType Filtered
    const mergedData = segmentFilterData.filter((car) => fuelTypeFilterData.includes(car))
    
    const brandFilterData = ([] as any[]).concat(...filterBrandHandler)

    const brandSegFilter = brandFilterData.filter((car) => segmentFilterData.includes(car))
    const brandFuelFilter = brandFilterData.filter((car) => fuelTypeFilterData.includes(car))
    const brandMergedFilter = brandFilterData.filter((car) => mergedData.includes(car))
    
    // 중복 제거
    // let duplicateRemoveData = mergedData.filter((item, pos)=> mergedData.indexOf(item) === pos);

    // 정렬 로직
    const sorted = (mustSortData: type.Car[])=>{
      if (sortOption === 'latest') {
        // 최신순 정렬 ('date' 데이터 아직 안넣어서 'id'로 대체)
        mustSortData.sort((a, b) => {
          const aDate = parseFloat(a.date);
          const bDate = parseFloat(b.date);
          return bDate - aDate;
        });
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
    // return Checked
    const handlefilter = (): type.Car[] | string[] => {
      // 체크값이 있다면 length는 1이상
      const CheckNullTest = [...segmentFilterData, ...fuelTypeFilterData].length;
      const brandLength = checkBrand.length;
      const segmentLength = checkSegment.length;
      const fuelTypeLength = checkFuelType.length;

      // 결과값이 없는 선택 (Checked값은 있는데 합친값이 없을때 )
      if (brandLength !== 0 && segmentLength !== 0 && fuelTypeLength !== 0 && brandMergedFilter.length === 0) {
        return ['selectAgain']
        
        // 세그먼트 체크했고 FuelType전체인데 둘다 값 없을때
      } else if (segmentLength === 0 && fuelTypeLength !== 0 && CheckNullTest === 0) {
        return ['selectAgain']
        
        // 퓨어타입 체크했고 세그먼트 전체인데 둘다 값 없을때
      } else if (segmentLength !== 0 && fuelTypeLength === 0 && CheckNullTest === 0) {
        return ['selectAgain']

        // 브랜드만 체크했는데 값이 없을 때
      } else if (brandLength !==0 && segmentLength === 0 && fuelTypeLength === 0 && brandFilterData.length === 0) {
        return ['selectAgain']

        // 브랜드, 연료 체크했는데 값이 없을 때
      } else if (brandLength !==0 && segmentLength === 0 && fuelTypeLength !== 0 && brandFuelFilter.length === 0) {
        return ['selectAgain']

        // 브랜드, 차급 체크했는데 값이 없을 때
      } else if (brandLength !==0 && segmentLength !== 0 && fuelTypeLength === 0 && brandSegFilter.length === 0) {
        return ['selectAgain']
        
        // 브랜드만 체크했을 때 반환할 데이터
      } else if (brandLength !== 0 && segmentLength === 0 && fuelTypeLength === 0) {
        sorted(brandFilterData)
        return brandFilterData

      } else if (brandLength !== 0 && segmentLength !== 0 && fuelTypeLength === 0) {
        sorted(brandSegFilter)
        return brandSegFilter

      } else if (brandLength !== 0 && segmentLength === 0 && fuelTypeLength !== 0) {
        sorted(brandFuelFilter)
        return brandFuelFilter

      } else if (brandLength !== 0 && segmentLength !== 0 && fuelTypeLength !== 0) {
        sorted(brandMergedFilter)
        return brandMergedFilter

        // 세그먼트, 퓨어타입 둘다 체크했을 때 반환할 데이터
      } else if (brandLength === 0 && segmentLength !== 0 && fuelTypeLength !== 0) {
        sorted(mergedData)
        return mergedData;
        
        // 세그먼트만 체크했을 때 반환할 데이터
      } else if (brandLength === 0 && segmentLength !== 0 && fuelTypeLength === 0) {
        sorted(segmentFilterData)
        return segmentFilterData;
        
        // 퓨어타입만 체크했을 때 반환할 데이터
      } else if (brandLength === 0 && segmentLength === 0 && fuelTypeLength !== 0) {
        sorted(fuelTypeFilterData)
        return fuelTypeFilterData;
        
      } else {
        sorted(sortedData)
        return sortedData;
      }
    };
    const slicedData = handlefilter().slice(0,sliceView);

    return slicedData
  };

  useEffect(() => {
    const moreData = () => {
      // 스크롤이 맨 아래에 도달했을 때 실행할 함수
      // console.log('스크롤 맨 아래 도달');
      if(sliceView < 88){
        setSliceView(sliceView+8)
      }
      // console.log(sliceView)
    };

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollHeight - scrollTop === clientHeight) {
        // console.log('핸들은 돌아간다')
        // 스크롤이 맨 아래에 도달하면 실행할 함수
        if(sliceView < 88){
          setShowSpinner(true)
          setTimeout(()=>{
            moreData();
            setShowSpinner(false)
          }, 500)
        }
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    return () => {
      // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
      window.removeEventListener('scroll', handleScroll);
    };
  }, [carLength, sliceView]);


  // 정렬 기준 변경 시 처리하는 함수
  const handleSortChange = (event: React.SyntheticEvent, value: any) => {
    setSortOption(value);
  };

  // 검색창 인풋텍스트 -> searchText
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  // 인풋텍스트로 차량 검색하기
  const handleSearch = () => {
    setSubmitValue(searchText)
  }
  const handleKeyPress = (e: React.KeyboardEvent<SVGSVGElement>) => {
    if(e.key === 'Enter'){
      setSubmitValue(searchText)
    }
  }
  // 인풋텍스트 초기화
  const handleInputClear = () => {
    setSearchText('')
  }

  console.log(searchText)

  // 렌더링
  return (
    <MaxContainer>
      {/* 스피너 */}
      {
        showSpinner && <S.StyledSpinner />
      }
      <div>
        {/* 상단 탭 */}
        <S.StyledBox>
          <Tabs className='tabs' sx={{overflow:"visible"}} value={sortOption} onChange={handleSortChange} aria-label="정렬 기준">
            <Tab className='tab' label="최신순" value="latest" {...a11yProps(0)} />
            <Tab className='tab' label="가격순" value="price" {...a11yProps(1)} />
            <Tab className='tab' label="연비순" value="mileage" {...a11yProps(2)} />
          </Tabs>
          {/* 검색창 */}
          <S.SearchBarWrapper>
            <div></div>
            <S.InputForm size='small' sx={{m:1}}>
              <OutlinedInput
                id="input-with-icon-adornment"
                style={{cursor:'default'}}
                placeholder='자동차검색'
                type='text'
                onChange={handleInputChange}
                value={searchText}
                // 아이콘
                endAdornment={
                  <InputAdornment position="end" style={{gap: '10px'}}>
                    {/* INPUT 초기화 아이콘 */}
                    {searchText === '' && <ClearIcon style={{opacity:0, cursor:'default'}} />}
                    {searchText !== '' && <ClearIcon onClick={handleInputClear} style={{cursor:'pointer'}} />}
                    {/* 검색아이콘 */}
                    <SearchIcon onKeyPress={handleKeyPress} onClick={handleSearch} className='searchIcon' style={{color: searchText === '' ? '' : '#626262', cursor:'pointer'}} />
                  </InputAdornment>
                }
              />
            </S.InputForm>
          </S.SearchBarWrapper>
        </S.StyledBox>

        {/* 차량목록 */}
        {tabIndex.map((tab, i) => (
          <TabPanel key={tab} value={value} index={i}>
            <S.CarSection>
              {
                (() => {
                  const filteredCars = handleCarfilter(carData, selectedBrand, selectedSeg, selectedFuel);
                 if (filteredCars.includes('selectAgain')) {
                    return <div style={{ width: "100%" }}>해당되는 차량이 없습니다.</div>;
                  } else {
                    return filteredCars.map((car, index) => (
                      <S.CarArticle key={index}>
                        <div className='car_head' onClick={()=>{navigate(`/detail/${car.id}`)}}>
                          <div className='img_wrap'>
                            <img
                              loading='lazy'
                              src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${car.imgUrl}.png`}
                              alt={car.name.en}
                            />
                          </div>
                          <p>{`${car.brand.kr} ${car.name.kr}`}</p>
                        </div>
                        <div className='car_info'>
                          <div><span>가격</span>{ car.price.min === car.price.max ? car.price.min : `${car.price.min} ~ ${car.price.max}`}만원</div>
                          <div><span>차급</span>{car.segment}</div>
                          <div><span>연료</span>{car.fuelTypes}</div>
                          <div><span>연비</span>{car.gasMileage}</div>
                        </div>
                      </S.CarArticle>
                    ));
                  }
                })()
              }
            </S.CarSection>
          </TabPanel>
        ))}
        
      </div>
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
      {value === index && <div>{children}</div>}
    </div>
  );
}


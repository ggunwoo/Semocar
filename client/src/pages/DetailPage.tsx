import React, {useRef, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useCarData } from '../../utils/useCarData'
import { SwiperSlide } from 'swiper/react'

// STYLED
import { MaxContainer } from '../styled/Global'
import * as S from '../styled/Detail.styled'

// SWIPER
import { FreeMode, Navigation, Thumbs } from "swiper";
import type { Swiper } from 'swiper';
import 'swiper/swiper-bundle.css'
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/scss/navigation";
// import "swiper/scss/thumbs";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchBrands } from '../store/slice/useBrandListSlice';



export default function DetailPage(){
  const dispatch = useAppDispatch();

  
  const carData = useCarData();
  const carBrand = useAppSelector(state => state.brandList.items);
  const {id} = useParams();
  const searchCar = carData.find((e) => e.id === Number(id))

  useEffect(() => {
    dispatch(fetchBrands()); // Redux => Brands fetch함수 실행
  }, []);

  // VAR : 검색된 차량에 가격 원화표기법으로 변경
  const minPrice = (searchCar?.price.min)?.toLocaleString('ko-KR');
  const maxPrice = (searchCar?.price.max)?.toLocaleString('ko-KR');
  const [selectGrade, segSelectGrade] = useState(0)
  const [selectTrim, segSelectTrim] = useState(0)
  // VAR : 선택된 모델의 트림
  const choosed = searchCar?.grades[selectGrade].trims[selectTrim];
  // VAR :파라미터로 불러온 차량에 브랜드URL
  const OverlapBrand = carBrand.find( e => e.english_name === searchCar?.brand.en)

  console.log(carBrand)
  console.log(searchCar)

  console.log(OverlapBrand)

  const [exThumbs, setExThumbs] = useState<Swiper|null>(null);
  const [inThumbs, setInThumbs] = useState<Swiper|null>(null);

  const infoRef = useRef<HTMLInputElement>(null)
  const photoRef = useRef<HTMLInputElement>(null)
  const commentRef = useRef<HTMLInputElement>(null)

  const [tabFixed, setTabFixed] = useState(false)
  const [ClickCheck, setClickCheck] = useState([true, false, false]);
  const [targetClick, setTargetClick] = useState([infoRef, photoRef, commentRef])
  
  // 해당 차량 사진 개수 배열로 변환한 변수
  const [viewPhoto, setViewPhoto] = useState([true, false])
  const exteriorArr = Array.from(Array(searchCar?.photoNumber.exterior), (_, index) =>  index + 1);
  const interiorArr = Array.from(Array(searchCar?.photoNumber.interior), (_, index) =>  index + 1);
  
  // Mount
  useEffect(()=>{
    // 페이지 접근시 최상단으로 이동
    window.scrollTo(0,0)
  }, [])
  // 스크롤 핸들
  useEffect(()=>{
    const handleScroll = () => {
      const targetElement = document.getElementById('grade');
      const scrollY = window.scrollY
  
      // 탭네비 화면에서 사라지면 Fixed 로직
      if (targetElement) {
        const { top } = targetElement.getBoundingClientRect();
        if (top <= window.innerHeight * 0.25) {
          // 특정 위치에 도달했을 때 실행할 로직
          setTabFixed(true)
        } else if ( top > window.innerHeight * 0.25) {
          setTabFixed(false)
        }
      }
      
      // 스크롤위치에 도달할때마다 targetBtn active 변경
      if(scrollY > 600 && scrollY < 1000){
        setClickCheck([true, false, false])
      }
      if(scrollY > 1300 && scrollY < 1800){
        setClickCheck([false, true, false])
      }
      if(scrollY > 2200 && scrollY < 2800){
        setClickCheck([false, false, true])
      }
    }
    // 스크롤할때마다 handleScroll을 실행하는데... 이건 수정필요
    window.addEventListener('scroll', handleScroll);

    return () => {
      setTimeout(()=>{
        window.removeEventListener('scroll', handleScroll);
        setTabFixed(false)
      },1000)
    }
  }, [])
  // .targetBtn 클릭시 설정값 스크롤 위치로 이동하는 이벤트로직
  const targetMove = (target: any) => {
    if(target.current){
      target.current.scrollIntoView({ block: 'start'});
    }
  };
  // Photo 외관, 내관버튼 클릭시 해당 사진슬라이드 보여주는 로직
  const viewChange = (index: number) => {
    const copyArr = [...viewPhoto]
    copyArr.fill(false)
    copyArr[index] = !copyArr[index]
    setViewPhoto(copyArr)
  }
  return (
    <div style={{background:"#FFF"}}>
      {/* 상단 Article */}
      {searchCar === undefined
      ?
      // :: 선택된 차량이 undefined라면 
      <div>해당차량의 정보가 없거나 잘못된 접근입니다.</div>
      :
      <S.HeadBox>
        <MaxContainer>
          <div className='headWrapper'>
            <div className='infoBox'>
              <p className='brand'>
                <img src={OverlapBrand?.logo_path} alt={searchCar?.brand.en} />
                <span>{searchCar.brand.kr}</span>
              </p>
              <p className='name'>{searchCar.name.kr}</p>
              {
                minPrice === '-' && maxPrice === '-'
                ?
                <p>가격정보없음</p>
                : minPrice === maxPrice 
                  ? 
                  <p className='price'>{maxPrice} 만원</p>
                  :
                  <p className='price'>{minPrice} ~ {maxPrice} 만원</p>
              }
              <S.StyledChip className='first' label={`${searchCar.segment}`} variant='outlined' />
              <S.StyledChip label={`${searchCar.fuelTypes}`} variant='outlined' />
              <S.StyledChip label={`${searchCar.gasMileage}`} variant='outlined' />
            </div>

            <div className='image'>
              <img src={`https://raw.githubusercontent.com/gunw0-0/cars/main/images/cars/${searchCar.imgUrl}.png`} alt={searchCar?.name.en} />
            </div>

          </div>
        </MaxContainer>
      </S.HeadBox>
      }

      {/* 해당 스크롤위치로 이동하는기능 인터페이스 */}
      <S.TartgetNav>
        <MaxContainer>
          <div className='btnGroup'>
            {/* 스크롤탭 */}
            {['등급별 제원','포토'].map((item, index)=>(
              <S.TargetBtn 
                key={index}
                className={`targetBtn ${ClickCheck[index] ? 'clicked' : 'unclick'}`}
                onClick={()=>{targetMove(targetClick[index]);}}
              >
                <p>{item}</p>
              </S.TargetBtn>
            ))}
            </div>
        </MaxContainer>
      </S.TartgetNav>

      {/* TargetNav가 화면에서 사라졌을 때 보여줄 섹션 */}
      <S.FixedBox className={`${tabFixed ? 'fixed': 'unfixed'}`}>
        <div className='wrap'>
          <div className='featureBox'>
            <div className='titleGroup'>
              <div className='brand'>
                <img src={`https://raw.githubusercontent.com/gunw0-0/cars/main/images/cars/${OverlapBrand?.imgUrl}.png`} alt={searchCar?.brand.en} />
                <span className='brand'>{searchCar?.brand.kr}</span>
              </div>
              <p className='name'>{searchCar?.name.kr}</p>
            </div>
            <div className='btnGroup'>
              {['등급별 제원','포토'].map((item, index)=>(
                <S.TargetBtn 
                    key={index}
                    className={`targetBtn ${ClickCheck[index] ? 'clicked' : 'unclick'}`}
                    onClick={()=>{targetMove(targetClick[index]);}}
                  >
                <p>{item}</p>
              </S.TargetBtn>
              ))}
            </div>
          </div>
          <div className='imgBax'>
            <img src={`https://raw.githubusercontent.com/gunw0-0/cars/main/images/cars/${searchCar?.imgUrl}.png`} alt={searchCar?.name.en} />
          </div>
        </div>
      </S.FixedBox>

      {/* 차량정보 스크롤이동 위치, height = section간격 */}
      <S.MoveRef height='150px' ref={infoRef}></S.MoveRef>

      <MaxContainer>
        {/* 차량정보 적어놓은 표 */}
        <S.ChartWrapper >
          <div className='infoWrap' id="grade">
            <S.SelectWrapper>
              {/* 등급 Grade */}
              <dl>
                <dt>등급</dt>
                <dd>
                  {searchCar?.grades.map((grade, index)=>(
                    <div
                    key={index}
                    className={`selectBtn ${index === selectGrade ? "clicked" : null}  grade`}
                    onClick={()=>{segSelectGrade(index); segSelectTrim(0);}}
                    > 
                      {grade.name}
                    </div>
                  ))}
                </dd>
              </dl>

              {/* 트림 Trim */}
              <dl>
                <dt>트림</dt>
                <dd>
                  {searchCar?.grades[selectGrade].trims.map((trim, index)=>(
                    <div
                    key={trim.name}
                    className={`selectBtn ${index === selectTrim ? "clicked" : null} trim`}
                    onClick={()=>{segSelectTrim(index)}}
                    >
                      {trim.name}
                    </div>
                  ))}
                </dd>
              </dl>
            </S.SelectWrapper>
            
            {/* 가격 price */}
            <S.PriceDl>
              <dt>가격</dt>
              <dd>
                <p>{choosed?.price.toLocaleString('ko-KR')} <span>만원</span></p>
              </dd>
            </S.PriceDl>
            
            {/* 제원 SPAC */}
            <S.SpacDl>
              <dt>제원</dt>
              <div style={{position:"absolute", bottom: "0"}}></div>
              {/* 가솔린, 디젤, LPG */}
              {(choosed?.fuelType === '가솔린' || choosed?.fuelType === '디젤' || choosed?.fuelType ==='LPG') &&
                <dd>
                  {/* OPTION chart 1LINE */}
                  <S.ChartDl>
                    <dt>연료</dt>
                    <dd>{choosed?.fuelType}</dd>
                    <dt>엔진형식</dt>
                    <dd>{choosed?.engine}</dd>
                    <dt>배기량</dt>
                    <dd>{choosed?.displacement}</dd>
                    <dt>변속기</dt>
                    <dd>{choosed?.transMission}</dd>
                    <dt>구동방식</dt>
                    <dd>{choosed?.drivingSystem}</dd>
                    <dt>최고출력</dt>
                    <dd>{choosed?.power}</dd>
                    <dt>최대토크</dt>
                    <dd>{choosed?.torque}</dd>
                    <dt>최고속도</dt>
                    <dd>-</dd>
                    {/* <dd>{choosed?.}</dd> */}
                  </S.ChartDl>
                  {/* OPTION 2LINE */}
                  <S.ChartDl>
                    <dt>연비등급</dt>
                    <dd>{choosed?.ratingGasMileage}</dd>
                    <dt>복합연비</dt>
                    <dd>{choosed?.complexGasMileage}</dd>
                    <dt>도심연비</dt>
                    <dd>{choosed?.urbanGasMileage}</dd>
                    <dt>고속도로연비</dt>
                    <dd>{choosed?.highwayGasMileage}</dd>
                    <dt>저공해등급</dt>
                    <dd>{choosed?.lowEmission}</dd>
                    <dt>공차중량</dt>
                    <dd>{choosed?.vehicleWeight}</dd>
                    <dt>자율주행 레벨</dt>
                    <dd>{choosed?.autoLevel}</dd>
                    <dt>제로백</dt>
                    <dd>{choosed?.zero}</dd>
                    {/* <dd>{choosed?.}</dd> */}
                  </S.ChartDl>
                  {/* OPTION 3LINE */}
                  <S.ChartDl>
                    <dt>앞타이어규격</dt>
                    <dd>{choosed?.frontTire}</dd>
                    <dt>뒷타이어규격</dt>
                    <dd>{choosed?.rearTire}</dd>
                    <dt>전륜브레이크</dt>
                    <dd>{choosed?.frontSuspension}</dd>
                    <dt>후륜브레이크</dt>
                    <dd>{choosed?.rearSuspension}</dd>
                    <dt>전륜서스펜션</dt>
                    <dd>{choosed?.frontBrake}</dd>
                    <dt>후륜서스펜션</dt>
                    <dd>{choosed?.rearBrake}</dd>
                    <dt>탑승정원</dt>
                    <dd>{choosed?.capacity}</dd>
                  </S.ChartDl>
                </dd>}

              {/* 하이브리드 */}
              {choosed?.fuelType === '하이브리드' &&
                <dd>
                  {/* OPTION 1LINE */}
                  <S.ChartDl>
                    <dt>연료</dt>
                    <dd>{choosed?.fuelType}</dd>
                    <dt>엔진형식</dt>
                    <dd>{choosed?.engine}</dd>
                    <dt>배기량</dt>
                    <dd>{choosed?.displacement}</dd>
                    <dt>변속기</dt>
                    <dd>{choosed?.transMission}</dd>
                    <dt>구동방식</dt>
                    <dd>{choosed?.drivingSystem}</dd>
                    <dt>최고출력</dt>
                    <dd>{choosed?.power}</dd>
                    <dt>최대토크</dt>
                    <dd>{choosed?.torque}</dd>
                    <dt>최고속도</dt>
                    <dd>-</dd>
                    {/* <dd>{choosed?.}</dd> */}
                    <dt>제로백</dt>
                    <dd>zero100</dd>
                    {/* <dd>{choosed?.}</dd> */}
                  </S.ChartDl>

                  {/* OPTION 2LINE */}
                  <S.ChartDl>
                    <dt>연비등급</dt>
                    <dd>{choosed?.ratingGasMileage}</dd>
                    <dt>복합연비</dt>
                    <dd>{choosed?.complexGasMileage}</dd>
                    <dt>도심연비</dt>
                    <dd>{choosed?.urbanGasMileage}</dd>
                    <dt>고속도로연비</dt>
                    <dd>{choosed?.highwayGasMileage}</dd>
                    <dt>저공해등급</dt>
                    <dd>{choosed?.lowEmission}</dd>
                    <dt>모터출력</dt>
                    <dd>{choosed?.motorPower}</dd>
                    <dt>모터토크</dt>
                    <dd>{choosed?.motorTorque}</dd>
                    <dt>배터리타입</dt>
                    <dd>{choosed?.batteryType}</dd>
                    <dt>배터리용량</dt>
                    <dd>{choosed?.batteryVolume}</dd>
                  </S.ChartDl>

                  {/* OPTION 3LINE */}
                  <S.ChartDl>
                    <dt>자율주행 레벨</dt>
                    <dd>{choosed?.autoLevel}</dd>
                    <dt>공차중량</dt>
                    <dd>{choosed?.vehicleWeight}</dd>
                    <dt>앞타이어규격</dt>
                    <dd>{choosed?.frontTire}</dd>
                    <dt>뒷타이어규격</dt>
                    <dd>{choosed?.rearTire}</dd>
                    <dt>전륜브레이크</dt>
                    <dd>{choosed?.frontSuspension}</dd>
                    <dt>후륜브레이크</dt>
                    <dd>{choosed?.rearSuspension}</dd>
                    <dt>전륜서스펜션</dt>
                    <dd>{choosed?.frontBrake}</dd>
                    <dt>후륜서스펜션</dt>
                    <dd>{choosed?.rearBrake}</dd>
                    <dt>탑승정원</dt>
                    <dd>{choosed?.capacity}</dd>
                  </S.ChartDl>
                </dd>}

              {/* 전기 */}
              {(choosed?.fuelType === '전기' || choosed?.fuelType === '수소') &&
                <dd>
                  {/* OPTION 1LINE */}
                  <S.ChartDl>
                    <dt>연료</dt>
                    <dd>{choosed?.fuelType}</dd>
                    
                    <dt>모터출력</dt>
                    <dd>{choosed?.motorPower}</dd>
                    <dt>모터토크</dt>
                    <dd>{choosed?.motorTorque}</dd>
                    <dt>제로백</dt>
                    <dd>zero100</dd>
                    {/* <dd>{choosed?.}</dd> */}
                    <dt>구동방식</dt>
                    <dd>{choosed?.drivingSystem}</dd>
                    <dt>배터리종류</dt>
                    <dd>{choosed?.batteryType}</dd>
                    <dt>배터리용량</dt>
                    <dd>{choosed?.batteryVolume}</dd>
                  </S.ChartDl>

                  {/* OPTION 2LINE */}
                  <S.ChartDl>
                    <dt>연비</dt>
                    <dd>{choosed?.complexGasMileage}</dd>
                    <dt>저공해등급</dt>
                    <dd>{choosed?.lowEmission}</dd>
                    <dt>충전방식</dt>
                    <dd>{choosed?.charging}</dd>
                    <dt>충전시간(급속)</dt>
                    <dd>{choosed?.chargingQuick}</dd>
                    <dt>충전시간(완속)</dt>
                    <dd>{choosed?.chargingSlow}</dd>
                    <dt>자율주행 레벨</dt>
                    <dd>{choosed?.autoLevel}</dd>
                    <dt>공차중량</dt>
                    <dd>{choosed?.vehicleWeight}</dd>
                  </S.ChartDl>

                  {/* OPTION 3LINE */}
                  <S.ChartDl>
                    <dt>앞타이어규격</dt>
                    <dd>{choosed?.frontTire}</dd>
                    <dt>뒷타이어규격</dt>
                    <dd>{choosed?.rearTire}</dd>
                    <dt>전륜브레이크</dt>
                    <dd>{choosed?.frontSuspension}</dd>
                    <dt>후륜브레이크</dt>
                    <dd>{choosed?.rearSuspension}</dd>
                    <dt>전륜서스펜션</dt>
                    <dd>{choosed?.frontBrake}</dd>
                    <dt>후륜서스펜션</dt>
                    <dd>{choosed?.rearBrake}</dd>
                    <dt>탑승정원</dt>
                    <dd>{choosed?.capacity}</dd>
                  </S.ChartDl>
                </dd>
              }
            </S.SpacDl>

            {/* 차량 사이즈이미지 */}
            <S.SizeBox>
              {/* 차량 앞면 이미지 */}
              <div className='size_img front'>
                <span className='wrap_thumb'>
                  <img className='sizeimg' src="https://raw.githubusercontent.com/gunw0-0/cars/main/images/photo/size_info/suv/img_suv_front.png" alt="SUVFrontImage" />
                </span>
                <span className='wrap_size track'>
                  <span className='txt'>
                    윤거전
                    <span> {choosed?.track}</span>
                  </span>
                  <span className='line'></span>
                </span>
                <span className='wrap_size weight'>
                  <span className='txt'>
                    전폭
                    <span> {choosed?.weight}</span>
                  </span>
                  <span className='line'></span>
                </span>

              </div>
              {/* 차량 옆면 이미지 */}
              <div className='size_img side'>
                <span className='wrap_thumb'>
                  <img className='sizeimg' src="https://raw.githubusercontent.com/gunw0-0/cars/main/images/photo/size_info/suv/img_suv_side.png" alt="SUVsideImage" />
                </span>
                <span className='wrap_size wheelbase'>
                  <span className='txt'>
                    축거
                    <span> {choosed?.wheelBase}</span>
                  </span>
                  <span className='line'></span>
                </span>
                <span className='wrap_size length'>
                  <span className='txt'>
                    전장
                    <span> {choosed?.length}</span>
                  </span>
                  <span className='line'></span>
                </span>
              </div>
              {/* 차량 뒷면 이미지 */}
              <div className='size_img rear'>
                <span className='wrap_thumb'>
                  <img className='sizeimg' src="https://raw.githubusercontent.com/gunw0-0/cars/main/images/photo/size_info/suv/img_suv_rear.png" alt="SUVrearImage" />
                </span>
                <span className='wrap_size tread'>
                  <span className='txt'>
                    윤거후
                    <span> {choosed?.tread}</span>
                  </span>
                  <span className='line'></span>
                </span>
                <span className='wrap_size height'>
                  <span className='txt'>
                    전고
                    <span> {choosed?.height}</span>
                  </span>
                  <span className='line'></span>
                </span>
              </div>
            </S.SizeBox>
          </div>
        </S.ChartWrapper>
        
        {/* 포토갤러리 스크롤이동 위치, height = section간격 */}
        <S.MoveRef height='180px' ref={photoRef}></S.MoveRef>

        {/* PHOTO GALLERY */}
        <S.SwiperWrap >
          <div className='slideHead'>
            <div className='buttonGroup'>
              {/* 외부버튼 */}
              {searchCar?.photoNumber.exterior === 0 ? undefined
              :
              <div onClick={()=>{viewChange(0)}} className={`changeBtn exBtn ${viewPhoto[0] ? 'active' : 'inactive'}`}>외부</div>}
              {/* 외부버튼 */}
              {searchCar?.photoNumber.interior === 0 ? undefined 
              : 
              <div onClick={()=>{viewChange(1)}} className={`changeBtn inBtn ${viewPhoto[1] ? 'active' : 'inactive'}`}>내부</div>}
            </div>
          </div>
          <div style={{position:"relative", top: "50%"}}></div>

          {/* 외부 */}
          <div className={`slides exterior ${viewPhoto[0] ? 'block' : 'none'}`}>
            <S.MainSwiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: exThumbs }}
              modules={[FreeMode, Navigation, Thumbs]}
            >
              {exteriorArr.map((slide, index)=>(
                <SwiperSlide key={index}>
                  {/* <img src={`https://via.placeholder.com/1100x620?text=${searchCar?.name.en} ${index+1}`} alt="searchCar?.name.en" /> */}
                  <img src={`https://raw.githubusercontent.com/gunw0-0/cars/main/images/photo/${searchCar?.imgUrl}/exterior/${index+1}.jpg`} alt={searchCar?.name.en} />
                </SwiperSlide>
              ))}
            </S.MainSwiper>
            <S.ThumbsSwiper
              onSwiper={setExThumbs}
              spaceBetween={10}
              slidesPerView={6}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              >
              {/* ThumbsSwiper */}
              {exteriorArr.map((slide, index)=>(
                <SwiperSlide key={index}>
                  <img src={`https://raw.githubusercontent.com/gunw0-0/cars/main/images/photo/${searchCar?.imgUrl}/exterior/${index+1}.jpg`} alt={searchCar?.name.en} />
                </SwiperSlide>
              ))}
            </S.ThumbsSwiper>
          </div>

          {/* 내부 */}
          <div className={`slides interior ${viewPhoto[1] ? 'block' : 'none'}`}>
            <S.MainSwiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: inThumbs }}
              modules={[FreeMode, Navigation, Thumbs]}
              >
              {interiorArr.map((slide, index)=>(
                <SwiperSlide key={index}>
                  {/* <img src={`https://via.placeholder.com/1100x620?text=${searchCar?.name.en} ${index+1}`} alt="searchCar?.name.en" /> */}
                  <img src={`https://raw.githubusercontent.com/gunw0-0/cars/main/images/photo/${searchCar?.imgUrl}/interior/${index+1}.jpg`} alt={searchCar?.name.en} />
                </SwiperSlide>
              ))}
            </S.MainSwiper>
            <S.ThumbsSwiper
              onSwiper={setInThumbs}
              spaceBetween={10}
              slidesPerView={6}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              >
              {/* ThumbsSwiper */}
              {interiorArr.map((slide, index)=>(
                <SwiperSlide key={index}>
                  <img src={`https://raw.githubusercontent.com/gunw0-0/cars/main/images/photo/${searchCar?.imgUrl}/interior/${index+1}.jpg`} alt={searchCar?.name.en} />
                </SwiperSlide>
              ))}
            </S.ThumbsSwiper>
          </div>
        </S.SwiperWrap>

        {/* 댓글 스크롤이동 위치, height = section간격 */}
        <S.MoveRef height='200px' mt='150px' ref={commentRef}></S.MoveRef>
      </MaxContainer>
    </div>
  )
}
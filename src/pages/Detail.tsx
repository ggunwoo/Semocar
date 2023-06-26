import React, {useRef, useEffect, useState, useCallback } from 'react'
import { useParams } from "react-router-dom"
import { useCarData, useCarBrands } from '../hook/useCarData'
import { SwiperSlide } from 'swiper/react'
import { Rating, TextField, Typography} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import GradeIcon from '@mui/icons-material/Grade';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

// SWIPER
import { FreeMode, Navigation, Thumbs } from "swiper";
import type { Swiper } from 'swiper';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// STYLED
import { MaxContainer } from '../styled/Global'
import * as S from '../styled/Detail.styled'


export function Detail():JSX.Element {
  const carData = useCarData();
  const carBrands = useCarBrands();
  const {id} = useParams();
  const searchCar = carData.find((e) => e.id === Number(id))

  // VAR : 검색된 차량에 가격 원화표기법으로 변경
  const minPrice = (searchCar?.price.min)?.toLocaleString('ko-KR');
  const maxPrice = (searchCar?.price.max)?.toLocaleString('ko-KR');
  const [selectGrade, segSelectGrade] = useState(0)
  const [selectTrim, segSelectTrim] = useState(0)
  // VAR : 선택된 모델의 트림
  const choosed = searchCar?.grades[selectGrade].trims[selectTrim];
  // VAR :파라미터로 불러온 차량에 브랜드URL
  const OverlapBrand = carBrands.find( e => e.name.en === searchCar?.brand.en)

  const [exThumbs, setExThumbs] = useState<Swiper|null>(null);
  const [inThumbs, setInThumbs] = useState<Swiper|null>(null);
  const [commentList, setCommentList] = useState([
    {
      "rating":5,
      "likeCount":79,
      "text":"정말 매력적이다~",
    },
    {
      "rating":4,
      "likeCount":12,
      "text":"출력이 좀 아쉽지만 디자인이 이뻐서 합격!",
    },
    {
      "rating":2,
      "likeCount":43,
      "text":"디자이너 진짜 누구냐 시말서쓰라해라ㅋㅋ",
    },
    {
      "rating":1,
      "likeCount":4,
      "text":"시승해봤는데 별로였음",
    },
    {
      "rating":1,
      "likeCount":2,
      "text":"이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐 이걸 왜 사냐",
    },
  ]);

  const [likeCheck, setLikeCheck] = useState(Array(commentList.length).fill(false))

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
      if(scrollY > 600 && scrollY < 900){
        setClickCheck([true, false, false])
      }
      if(scrollY > 1100 && scrollY < 1800){
        setClickCheck([false, true, false])
      }
      if(scrollY > 2000 && scrollY < 2800){
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
      target.current.scrollIntoView({ block: 'center'});
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
    <div className='wrap' style={{background:"#FFF"}}>
    {/* 상단 Article */}
      {searchCar === undefined
        ?
        <div>해당차량의 정보가 없거나 잘못된 접근입니다.</div>
        :
      <S.FeatureBox>
        <MaxContainer>
          <div className='wrap'>
            <div className='infoBox'>
              <p className='brand'>
                <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${OverlapBrand?.imgUrl}.png`} alt={searchCar?.brand.en} />
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
            <S.ImgBox>
              <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${searchCar.imgUrl}.png`} alt={searchCar?.name.en} />
            </S.ImgBox>
          </div>
        </MaxContainer>
      </S.FeatureBox>
      }

      {/* 해당 스크롤위치로 이동하는기능 인터페이스 */}
      <S.TartgetNav>
        <MaxContainer>
          <div className='btnGroup'>
            {/* 스크롤탭 */}
            {['등급별 제원','포토','네티즌평점'].map((item, index)=>(
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
                <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${OverlapBrand?.imgUrl}.png`} alt={searchCar?.brand.en} />
                <span className='brand'>{searchCar?.brand.kr}</span>
              </div>
              <p className='name'>{searchCar?.name.kr}</p>
            </div>
            <div className='btnGroup'>
              {['등급별 제원','포토','네티즌평점'].map((item, index)=>(
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
            <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${searchCar?.imgUrl}.png`} alt={searchCar?.name.en} />
          </div>
        </div>
      </S.FixedBox>

      <MaxContainer>
        {/* 차량정보 적어놓은 표 */}
        <S.InfoBoxWrap>
          <S.Title>등급별 제원</S.Title>
          <S.MoreInfo id="grade" >
            {/* FORM */}
            <form action="#">
              {/* 등급 */}
              <S.FormDl>
                <S.FormDt>등급</S.FormDt>
                <S.FormDd>
                  {searchCar?.grades.map((grade, index)=>(
                    <S.ChipBtn key={index} className={`${index === selectGrade ? "clicked" : null}  grade`} onClick={()=>{segSelectGrade(index); segSelectTrim(0);}}>{grade.name}</S.ChipBtn>
                  ))}
                </S.FormDd>
              </S.FormDl>

              {/* 트림 */}
              <S.FormDl>
                <S.FormDt>트림</S.FormDt>
                <S.FormDd>
                  {searchCar?.grades[selectGrade].trims.map((trim, index)=>(
                    <S.ChipBtn key={trim.name} className={`${index === selectTrim ? "clicked" : null} trim`} onClick={()=>{segSelectTrim(index)}}>{trim.name}</S.ChipBtn>
                  ))}
                </S.FormDd>
              </S.FormDl>
            </form>
            
            {/* INFO */}
            <S.PriceDl>
              <dt>가격</dt>
              <dd>
                <p>{choosed?.price.toLocaleString('ko-KR')} <span>만원</span></p>
              </dd>
            </S.PriceDl>
            
            {/* /SPAC */}
            <S.SpacDl>
              <S.SpacDt>제원</S.SpacDt>
              <div style={{position:"absolute", bottom: "0"}} ref={infoRef}></div>
              {/* 가솔린, 디젤, LPG */}
              {(choosed?.fuelType === '가솔린' || choosed?.fuelType === '디젤' || choosed?.fuelType ==='LPG') &&
                <S.SpacDd>
                  {/* OPTION 1LINE */}
                  <S.OptionDl>
                    <S.OptionDt>연료</S.OptionDt>
                    <S.OptionDd>{choosed?.fuelType}</S.OptionDd>
                    <S.OptionDt>엔진형식</S.OptionDt>
                    <S.OptionDd>{choosed?.engine}</S.OptionDd>
                    <S.OptionDt>배기량</S.OptionDt>
                    <S.OptionDd>{choosed?.displacement}</S.OptionDd>
                    <S.OptionDt>변속기</S.OptionDt>
                    <S.OptionDd>{choosed?.transMission}</S.OptionDd>
                    <S.OptionDt>구동방식</S.OptionDt>
                    <S.OptionDd>{choosed?.drivingSystem}</S.OptionDd>
                    <S.OptionDt>최고출력</S.OptionDt>
                    <S.OptionDd>{choosed?.power}</S.OptionDd>
                    <S.OptionDt>최대토크</S.OptionDt>
                    <S.OptionDd>{choosed?.torque}</S.OptionDd>
                    <S.OptionDt>최고속도</S.OptionDt>
                    <S.OptionDd>-</S.OptionDd>
                    {/* <S.OptionDd>{choosed?.}</S.OptionDd> */}
                  </S.OptionDl>
                  {/* OPTION 2LINE */}
                  <S.OptionDl>
                    <S.OptionDt>연비등급</S.OptionDt>
                    <S.OptionDd>{choosed?.ratingGasMileage}</S.OptionDd>
                    <S.OptionDt>복합연비</S.OptionDt>
                    <S.OptionDd>{choosed?.complexGasMileage}</S.OptionDd>
                    <S.OptionDt>도심연비</S.OptionDt>
                    <S.OptionDd>{choosed?.urbanGasMileage}</S.OptionDd>
                    <S.OptionDt>고속도로연비</S.OptionDt>
                    <S.OptionDd>{choosed?.highwayGasMileage}</S.OptionDd>
                    <S.OptionDt>저공해등급</S.OptionDt>
                    <S.OptionDd>{choosed?.lowEmission}</S.OptionDd>
                    <S.OptionDt>공차중량</S.OptionDt>
                    <S.OptionDd>{choosed?.vehicleWeight}</S.OptionDd>
                    <S.OptionDt>자율주행 레벨</S.OptionDt>
                    <S.OptionDd>{choosed?.autoLevel}</S.OptionDd>
                    <S.OptionDt>제로백</S.OptionDt>
                    <S.OptionDd>{choosed?.zero}</S.OptionDd>
                    {/* <S.OptionDd>{choosed?.}</S.OptionDd> */}
                  </S.OptionDl>
                  {/* OPTION 3LINE */}
                  <S.OptionDl>
                    <S.OptionDt>앞타이어규격</S.OptionDt>
                    <S.OptionDd>{choosed?.frontTire}</S.OptionDd>
                    <S.OptionDt>뒷타이어규격</S.OptionDt>
                    <S.OptionDd>{choosed?.rearTire}</S.OptionDd>
                    <S.OptionDt>전륜브레이크</S.OptionDt>
                    <S.OptionDd>{choosed?.frontSuspension}</S.OptionDd>
                    <S.OptionDt>후륜브레이크</S.OptionDt>
                    <S.OptionDd>{choosed?.rearSuspension}</S.OptionDd>
                    <S.OptionDt>전륜서스펜션</S.OptionDt>
                    <S.OptionDd>{choosed?.frontBrake}</S.OptionDd>
                    <S.OptionDt>후륜서스펜션</S.OptionDt>
                    <S.OptionDd>{choosed?.rearBrake}</S.OptionDd>
                    <S.OptionDt>탑승정원</S.OptionDt>
                    <S.OptionDd>{choosed?.capacity}</S.OptionDd>
                  </S.OptionDl>
                </S.SpacDd>}
              {/* 하이브리드 */}
              {choosed?.fuelType === '하이브리드' &&
                <S.SpacDd>
                  {/* OPTION 1LINE */}
                  <S.OptionDl>
                    <S.OptionDt>연료</S.OptionDt>
                    <S.OptionDd>{choosed?.fuelType}</S.OptionDd>
                    <S.OptionDt>엔진형식</S.OptionDt>
                    <S.OptionDd>{choosed?.engine}</S.OptionDd>
                    <S.OptionDt>배기량</S.OptionDt>
                    <S.OptionDd>{choosed?.displacement}</S.OptionDd>
                    <S.OptionDt>변속기</S.OptionDt>
                    <S.OptionDd>{choosed?.transMission}</S.OptionDd>
                    <S.OptionDt>구동방식</S.OptionDt>
                    <S.OptionDd>{choosed?.drivingSystem}</S.OptionDd>
                    <S.OptionDt>최고출력</S.OptionDt>
                    <S.OptionDd>{choosed?.power}</S.OptionDd>
                    <S.OptionDt>최대토크</S.OptionDt>
                    <S.OptionDd>{choosed?.torque}</S.OptionDd>
                    <S.OptionDt>최고속도</S.OptionDt>
                    <S.OptionDd>-</S.OptionDd>
                    {/* <S.OptionDd>{choosed?.}</S.OptionDd> */}
                    <S.OptionDt>제로백</S.OptionDt>
                    <S.OptionDd>zero100</S.OptionDd>
                    {/* <S.OptionDd>{choosed?.}</S.OptionDd> */}
                  </S.OptionDl>

                  {/* OPTION 2LINE */}
                  <S.OptionDl>
                    <S.OptionDt>연비등급</S.OptionDt>
                    <S.OptionDd>{choosed?.ratingGasMileage}</S.OptionDd>
                    <S.OptionDt>복합연비</S.OptionDt>
                    <S.OptionDd>{choosed?.complexGasMileage}</S.OptionDd>
                    <S.OptionDt>도심연비</S.OptionDt>
                    <S.OptionDd>{choosed?.urbanGasMileage}</S.OptionDd>
                    <S.OptionDt>고속도로연비</S.OptionDt>
                    <S.OptionDd>{choosed?.highwayGasMileage}</S.OptionDd>
                    <S.OptionDt>저공해등급</S.OptionDt>
                    <S.OptionDd>{choosed?.lowEmission}</S.OptionDd>
                    <S.OptionDt>모터출력</S.OptionDt>
                    <S.OptionDd>{choosed?.motorPower}</S.OptionDd>
                    <S.OptionDt>모터토크</S.OptionDt>
                    <S.OptionDd>{choosed?.motorTorque}</S.OptionDd>
                    <S.OptionDt>배터리타입</S.OptionDt>
                    <S.OptionDd>{choosed?.batteryType}</S.OptionDd>
                    <S.OptionDt>배터리용량</S.OptionDt>
                    <S.OptionDd>{choosed?.batteryVolume}</S.OptionDd>
                  </S.OptionDl>

                  {/* OPTION 3LINE */}
                  <S.OptionDl>
                    <S.OptionDt>자율주행 레벨</S.OptionDt>
                    <S.OptionDd>{choosed?.autoLevel}</S.OptionDd>
                    <S.OptionDt>공차중량</S.OptionDt>
                    <S.OptionDd>{choosed?.vehicleWeight}</S.OptionDd>
                    <S.OptionDt>앞타이어규격</S.OptionDt>
                    <S.OptionDd>{choosed?.frontTire}</S.OptionDd>
                    <S.OptionDt>뒷타이어규격</S.OptionDt>
                    <S.OptionDd>{choosed?.rearTire}</S.OptionDd>
                    <S.OptionDt>전륜브레이크</S.OptionDt>
                    <S.OptionDd>{choosed?.frontSuspension}</S.OptionDd>
                    <S.OptionDt>후륜브레이크</S.OptionDt>
                    <S.OptionDd>{choosed?.rearSuspension}</S.OptionDd>
                    <S.OptionDt>전륜서스펜션</S.OptionDt>
                    <S.OptionDd>{choosed?.frontBrake}</S.OptionDd>
                    <S.OptionDt>후륜서스펜션</S.OptionDt>
                    <S.OptionDd>{choosed?.rearBrake}</S.OptionDd>
                    <S.OptionDt>탑승정원</S.OptionDt>
                    <S.OptionDd>{choosed?.capacity}</S.OptionDd>
                  </S.OptionDl>
                </S.SpacDd>}
              {/* 전기 */}
              {(choosed?.fuelType === '전기' || choosed?.fuelType === '수소') &&
                <S.SpacDd>
                  {/* OPTION 1LINE */}
                  <S.OptionDl>
                    <S.OptionDt>연료</S.OptionDt>
                    <S.OptionDd>{choosed?.fuelType}</S.OptionDd>
                    
                    <S.OptionDt>모터출력</S.OptionDt>
                    <S.OptionDd>{choosed?.motorPower}</S.OptionDd>
                    <S.OptionDt>모터토크</S.OptionDt>
                    <S.OptionDd>{choosed?.motorTorque}</S.OptionDd>
                    <S.OptionDt>제로백</S.OptionDt>
                    <S.OptionDd>zero100</S.OptionDd>
                    {/* <S.OptionDd>{choosed?.}</S.OptionDd> */}
                    <S.OptionDt>구동방식</S.OptionDt>
                    <S.OptionDd>{choosed?.drivingSystem}</S.OptionDd>
                    <S.OptionDt>배터리종류</S.OptionDt>
                    <S.OptionDd>{choosed?.batteryType}</S.OptionDd>
                    <S.OptionDt>배터리용량</S.OptionDt>
                    <S.OptionDd>{choosed?.batteryVolume}</S.OptionDd>
                  </S.OptionDl>

                  {/* OPTION 2LINE */}
                  <S.OptionDl>
                    <S.OptionDt>연비</S.OptionDt>
                    <S.OptionDd>{choosed?.complexGasMileage}</S.OptionDd>
                    <S.OptionDt>저공해등급</S.OptionDt>
                    <S.OptionDd>{choosed?.lowEmission}</S.OptionDd>
                    <S.OptionDt>충전방식</S.OptionDt>
                    <S.OptionDd>{choosed?.charging}</S.OptionDd>
                    <S.OptionDt>충전시간(급속)</S.OptionDt>
                    <S.OptionDd>{choosed?.chargingQuick}</S.OptionDd>
                    <S.OptionDt>충전시간(완속)</S.OptionDt>
                    <S.OptionDd>{choosed?.chargingSlow}</S.OptionDd>
                    <S.OptionDt>자율주행 레벨</S.OptionDt>
                    <S.OptionDd>{choosed?.autoLevel}</S.OptionDd>
                    <S.OptionDt>공차중량</S.OptionDt>
                    <S.OptionDd>{choosed?.vehicleWeight}</S.OptionDd>
                  </S.OptionDl>

                  {/* OPTION 3LINE */}
                  <S.OptionDl>
                    <S.OptionDt>앞타이어규격</S.OptionDt>
                    <S.OptionDd>{choosed?.frontTire}</S.OptionDd>
                    <S.OptionDt>뒷타이어규격</S.OptionDt>
                    <S.OptionDd>{choosed?.rearTire}</S.OptionDd>
                    <S.OptionDt>전륜브레이크</S.OptionDt>
                    <S.OptionDd>{choosed?.frontSuspension}</S.OptionDd>
                    <S.OptionDt>후륜브레이크</S.OptionDt>
                    <S.OptionDd>{choosed?.rearSuspension}</S.OptionDd>
                    <S.OptionDt>전륜서스펜션</S.OptionDt>
                    <S.OptionDd>{choosed?.frontBrake}</S.OptionDd>
                    <S.OptionDt>후륜서스펜션</S.OptionDt>
                    <S.OptionDd>{choosed?.rearBrake}</S.OptionDd>
                    <S.OptionDt>탑승정원</S.OptionDt>
                    <S.OptionDd>{choosed?.capacity}</S.OptionDd>
                  </S.OptionDl>
                </S.SpacDd>
              }
            </S.SpacDl>
            <S.SizeBox>
              {/* 차량 앞면 이미지 */}
              <div className='size_box front'>
                <span className='wrap_thumb'>
                  <img className='sizeimg' src="https://raw.githubusercontent.com/pgw6541/SEMOCAR/main/src/images/photo/size_info/suv/img_suv_front.png" alt="SUVFrontImage" />
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
              <div className='size_box side'>
                <span className='wrap_thumb'>
                  <img className='sizeimg' src="https://raw.githubusercontent.com/pgw6541/SEMOCAR/main/src/images/photo/size_info/suv/img_suv_side.png" alt="SUVsideImage" />
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
              <div className='size_box rear'>
                <span className='wrap_thumb'>
                  <img className='sizeimg' src="https://raw.githubusercontent.com/pgw6541/SEMOCAR/main/src/images/photo/size_info/suv/img_suv_rear.png" alt="SUVrearImage" />
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

          </S.MoreInfo>
          <div ></div>
        </S.InfoBoxWrap>

        {/* PHOTO GALLERY */}
        <S.SwiperWrap >
          <div className='slideHead'>
            <S.Title>포토</S.Title>
            <div className='buttonGroup'>
              {searchCar?.photoNumber.exterior === 0 ? <div onClick={()=>{viewChange(0)}} className='btn exBtn'>외관</div> : undefined}
              {searchCar?.photoNumber.interior === 0 ? <div onClick={()=>{viewChange(1)}} className='btn inBtn'>내관</div> : undefined}
            </div>
          </div>
          <div style={{position:"relative", top: "50%"}} ref={photoRef}></div>

          {/* 외관 */}
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
                  <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/photo/${searchCar?.imgUrl}/${index+1}.jpg`} alt={searchCar?.name.en} />
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
                  <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/photo/${searchCar?.imgUrl}/${index+1}.jpg`} alt={searchCar?.name.en} />
                </SwiperSlide>
              ))}
            </S.ThumbsSwiper>
          </div>

          {/* 내관 */}
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
                  <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/photo/${searchCar?.imgUrl}/${index+2}.jpg`} alt={searchCar?.name.en} />
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
                  <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/photo/${searchCar?.imgUrl}/${index+1}.jpg`} alt={searchCar?.name.en} />
                </SwiperSlide>
              ))}
            </S.ThumbsSwiper>
          </div>
        </S.SwiperWrap>

        {/* COMMENT */}
        <S.CommentWrap>
          <div  className='top_section'>
            <div className='left'>
              <div style={{width:"100%", display:"flex", alignItems:"center"}}>
                <GradeIcon className='star'/>
                <p className='int'>3.0</p>
              </div>
              <p className='commentCount'>23개의리뷰</p>
            </div>
            <div className='right'>
              <div className='box'>
                <span>5</span>
                <div className='line'></div>
              </div>
              <div className='box'>
                <span>4</span>
                <div className='line'></div>
              </div>
              <div className='box'>
                <span>3</span>
                <div className='line'></div>
              </div>
              <div className='box'>
                <span>2</span>
                <div className='line'></div>
              </div>
              <div className='box'>
                <span>1</span>
                <div className='line'></div>
              </div>
            </div>
          </div>
          
          {/* /post */}
          <S.PostForm action='#' method='#'>
            <Rating className='rating' defaultValue={0} precision={1} />
            <TextField  fullWidth label="To be implemented." id="fullWidth"></TextField>
            <div className='send'><SendIcon className='sendIcon' /></div>
          </S.PostForm>
          
          {/* /sort */}
          <div ref={commentRef} className='sort' style={{margin:"24px 0 24px 24px"}}>
            <span style={{marginRight:"16px"}}>최신순</span>
            <span>좋아요순</span>
          </div>

          {/* /list */}
          <S.CommentList>
            {commentList.map((item, index)=>(
              <div className='list' key={index}>
                <Rating className='rating' defaultValue={item.rating} readOnly />
                <span className='ratingNum'>{item.rating}</span>

                <div className='textBox'>
                  <div className='typo'>{item.text}</div>
                  <div className='userInfo'>
                    <span className='userName'>사용자</span>
                    <span className='date'>  /  23.12.31</span>
                  </div>
                </div>

                <div className='like'>
                  <ThumbUpOffAltIcon
                    className={`offIcon ${ likeCheck[index] ? 'clicked' : undefined }`}
                    onClick={()=>{
                      if(likeCheck[index]===true){
                        commentList[index].likeCount--
                      } else if(likeCheck[index]===false){
                        commentList[index].likeCount++
                      }
                      
                      const copylike = [...likeCheck]
                      copylike[index] = !copylike[index]
                      setLikeCheck(copylike);
                      
                    }}
                  />
                  <p className='likeCtn'>{item.likeCount}</p>
                </div>
              </div>
            ))}
          </S.CommentList>
        </S.CommentWrap>
      </MaxContainer>
    </div>
  )
}
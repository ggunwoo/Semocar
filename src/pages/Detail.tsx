import React, {useRef, useEffect, useState, useCallback } from 'react'
import { useParams } from "react-router-dom"
import { useCarData } from '../hook/useCarData'
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
import { Title } from '../styled/Main.styled'


export function Detail():JSX.Element {
  const carData = useCarData();
  const {id} = useParams();
  const searchCar = carData.find((e) => e.id === Number(id))

  
  const minPrice = (searchCar?.price.min)?.toLocaleString('ko-KR')
  const maxPrice = (searchCar?.price.max)?.toLocaleString('ko-KR')
  const [selectGrade, segSelectGrade] = useState(0)
  const [selectTrim, segSelectTrim] = useState(0)
  const choosed = searchCar?.grades[selectGrade].trims[selectTrim];

  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper|null>(null);
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

  // const BtnClick = (index: number) => {
  //   setClickCheck(ClickCheck.fill(false))
  //   const copyCheck = [...ClickCheck]
  //   copyCheck[index] = !copyCheck[index]
  //   setClickCheck(copyCheck);
  // }

  const infoRef = useRef<HTMLInputElement>(null)
  const photoRef = useRef<HTMLInputElement>(null)
  const commentRef = useRef<HTMLInputElement>(null)
  const [ClickCheck, setClickCheck] = useState([true, false, false]);
  const [targetClick, setTargetClick] = useState([infoRef, photoRef, commentRef])

  const [tabFixed, setTabFixed] = useState(false)

  useEffect(()=>{
    window.scrollTo(0,0)
  }, [])

  useEffect(()=>{
    const handleScroll = () => {
      const targetElement = document.getElementById('grade');
      const scrollY = window.scrollY
  
      // 탭네비 화면에서 사라지면 Fixed 로직
      if (targetElement) {
        const { top } = targetElement.getBoundingClientRect();
        if (top <= window.innerHeight * 0.14) {
          // 특정 위치에 도달했을 때 실행할 로직
          setTabFixed(true)
        } else if ( top > window.innerHeight * 0.14) {
          setTabFixed(false)
        }
      }

      console.log()
  
      if(scrollY > 600 && scrollY < 900){
        setClickCheck([true, false, false])
      }
      if(scrollY > 1350 && scrollY < 1800){
        setClickCheck([false, true, false])
      }
      if(scrollY > 2250 && scrollY < 2800){
        setClickCheck([false, false, true])
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      setTabFixed(false)
    }
  }, [])
  
  const targetMove = (target: any) => {
    if(target.current){
      target.current.scrollIntoView({ block: 'center'});
    }
  };

  return (
    <div className='wrap'>
    {/* 상단 Article */}
      {searchCar === undefined
        ?
        <div>해당차량의 정보가 없거나 잘못된 접근입니다.</div>
        :
      <S.BgBox>
        <MaxContainer>
          <S.TitleBox>
            <S.InfoBox>
              <h5 className='brand'>{searchCar.brand.kr}</h5>
              <h1 className='name'>{searchCar.name.kr}</h1>
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
              <S.StyledChip label={`${searchCar.segment}`} variant='outlined' />
              <S.StyledChip label={`${searchCar.fuelTypes}`} variant='outlined' />
              <S.StyledChip label={`${searchCar.gasMileage}`} variant='outlined' />
            </S.InfoBox>
            <S.ImgBox>
              <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${searchCar.imgUrl}.png`} alt={searchCar?.name.en} />
            </S.ImgBox>
          </S.TitleBox>

        </MaxContainer>
      </S.BgBox>
      }
      <MaxContainer>
        
        <S.TargetBtnGroup className={`${tabFixed ? 'fixed': 'unfixed'}`}>
          {/* 스크롤탭 */}
          {['등급별 제원','포토','네티즌평점'].map((item, index)=>(
            <div 
              key={index}
              className={`targetBtn ${ClickCheck[index] ? 'clicked' : 'unclick'}`}
              onClick={()=>{targetMove(targetClick[index]);}}><p>{item}</p>
            </div>
          ))}
        </S.TargetBtnGroup>
        <S.tempGroup className={`tempGroup ${tabFixed ? 'block' : 'none'}`}></S.tempGroup>
        
        <S.Title>등급별 제원</S.Title>
        <S.MoreInfo id="grade" >
          {/* FORM */}
          <form action="#">
            <S.FormDl>
              <S.FormDt>등급</S.FormDt>
              <S.FormDd>
                {searchCar?.grades.map((grade, index)=>(
                  <S.ChipBtn key={index} className={`${index === selectGrade ? "clicked" : null}  grade`} onClick={()=>{segSelectGrade(index); segSelectTrim(0);}}>{grade.name}</S.ChipBtn>
                ))}
              </S.FormDd>
            </S.FormDl>
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
              <h2>{choosed?.price.toLocaleString('ko-KR')} <span>만원</span></h2>
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
                  <S.OptionDd>zero100</S.OptionDd>
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
        {/* PHOTO GALLERY */}
        <S.SwiperWrap >
          <S.Title>포토</S.Title>
          <div style={{position:"relative", top: "50%"}} ref={photoRef}></div>
          <S.MainSwiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            
          >
            
            {['1','2','3','4','5','6'].map((slide, index)=>(
              <SwiperSlide key={index}>
                <img src={`https://via.placeholder.com/1100x620?text=${searchCar?.name.en} ${index+1}`} alt="searchCar?.name.en" />
              </SwiperSlide>
            ))}
          </S.MainSwiper>
          <S.ThumbsSwiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={6}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            >
            {/* ThumbsSwiper */}
            {['1','2','3','4','5','6'].map((slide, index)=>(
              <SwiperSlide key={index}>
                <img src={`https://via.placeholder.com/1100x620?text=${searchCar?.name.en} ${index+1}`} alt="searchCar?.name.en" />
              </SwiperSlide>
            ))}
          </S.ThumbsSwiper>
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
                  {/* <ThumbUpAltIcon className='icon' /> */}
                  <ThumbUpOffAltIcon className='offIcon' />
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
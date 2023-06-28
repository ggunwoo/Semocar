import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { useCarData } from '../hook/useCarData';

// REDUX
import { toggleReset } from '../store/brandNav'
import { segReset, fuelReset, brandReset } from '../store/carFilter';
import { segAllChange, segHandle, fuelAllChange, fuelHandle, segList, fuelList  } from '../store/check';

// SWIPER CSS
import 'swiper/css';
import 'swiper/css/scrollbar';
import "swiper/css/navigation";
import "swiper/css/pagination";

// COMPONENTS
import { BrandNav } from '../components/BrandNav'

// STYLED-COMPONENTS
import { MaxContainer } from '../styled/Global';
import * as S from '../styled/Main.styled';

export function Main ():JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const carData = useCarData();

  const [carImg, setCarImg] = useState(['/brand','/detail/10210','/brand','/brand']);

  /** 최신 모델로 정렬된 11개 자동차 데이터 */
  const latestCarHandler = () => {
    const latestSort = carData.sort((a, b) => {
      const aDate = parseFloat(a.date);
      const bDate = parseFloat(b.date);
      return bDate - aDate;
    })

    const latest11 = latestSort.slice(0, 11);

    return latest11;
  }
  const letestCar = latestCarHandler();

  /** 포토 갤러리 사진 import */

  const [carPhoto, setCarPhoto] = useState([
    {id: 10220, name : '쏘나타 디 엣지', imgUrl: 'hyundai/Sonata/exterior'},
    {id: 15300, name : '트랙스 크로스오버', imgUrl: 'chevrolet/TraxCrossover/exterior'},
    {id: 11331, name : 'EV9', imgUrl: 'kia/EV9/exterior'},
    {id: 13320, name : 'QM6', imgUrl: 'renault_korea/QM6/exterior'},
    {id: 10210, name : '아반떼 CN7', imgUrl: 'hyundai/Avante/exterior'},
    {id: 11310, name : '스포티지', imgUrl: 'kia/Sportage/exterior'},
  ]);

  useEffect(()=>{
    dispatch(segReset())
    dispatch(fuelReset())
    dispatch(brandReset())
    dispatch(toggleReset())
    // segement Reset
    dispatch(segAllChange(true))
    const resetSeg = Array(segList.length).fill(false);
    dispatch(segHandle(resetSeg))

    // fuelType Reset
    dispatch(fuelAllChange(true))
    const resetFuel = Array(fuelList.length).fill(false);
    dispatch(fuelHandle(resetFuel))

    console.log('reset')
  },[dispatch])

  return (
    <>
      {/* 메인배너 SLIDE */}
      <S.BannerSwiper
        // scrollbar={{
        //   hide:true,
        // }}
        autoplay={{
          delay: 70000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        navigation={true}
        loop={true}
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={1}
        pagination={{
          clickable: true
        }}
      >
        {
          carImg.map((a, i)=>(
            <SwiperSlide key={i}>
                <S.BaseBox>
                  <S.BannerImg src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/banner/banner${i+1}.png`} alt={`SLIDE${i+1}`} />
                  <S.BannerBtn onClick={()=>{navigate(a)}} className={`bannerBtn_${i+1}`} />
                </S.BaseBox>
                <S.BannerBackgound>
                  <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/banner/background/banner${i+1}_bg.png`} alt={`BACKGROUND${i+1}`} />
                </S.BannerBackgound>
            </SwiperSlide>
          ))
        }
      </S.BannerSwiper>

      {/* 브랜드별 차량 NAV COMPONENTS */}
      <MaxContainer sx={{ position:'relative' }}>
        {/* <S.Title marginTop="100px">브랜드별 보러가기</S.Title> */}
          <BrandNav />
      </MaxContainer>

      {/* 최신 출시 모델 */}
      <S.Letest>
        <div className='gradientLine' />
          <MaxContainer>
              <p className='title'>최신 출시 모델</p>
              {/* SlideWrap */}
              <Swiper
                className="mySwiper carousel"
                slidesPerView={4}
                slidesPerGroup={4}
                spaceBetween={60}
                modules={[Pagination]}
                pagination={{
                  dynamicBullets: true,
                }}
              >
                {
                  // Slides
                  letestCar.map((car, index)=>(
                    <SwiperSlide className='slide' key={car.id}>
                      <div className="carHead" onClick={()=>{navigate(`/detail/${car.id}`)}}>
                        {/* 이미지 */}
                        <div className='images'>
                          <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${car.imgUrl}.png`} alt="NEWCAR" />
                        </div>
                        {/* 자동차 이름 */}
                        <p>{car.brand.kr} {car.name.kr}</p>
                      </div>
                      {/* 자동차 정보 */}
                      <dl className='infoBox'>
                        <dt>가격</dt>
                        <dd>{car.price.min}~{car.price.max}</dd>
                      
                        <dt>연비</dt>
                        <dd>{car.gasMileage}</dd>
                      
                        <dt>연료 </dt>
                        <dd>
                          {car.fuelTypes.map((fuel, index)=>(
                            <span style={{marginRight:"5px"}} key={index}>{fuel}</span>
                          ))}
                        </dd>
                      </dl>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
          </MaxContainer>
      </S.Letest>

      {/* 포토 갤러리 */}
      <S.PhotoGallery>
        <MaxContainer>
          {/* 섹션제목 */}
          <div className='title'>포토 갤러리</div>
          <div className='galleryWrapper'>
            {carPhoto.map((photo, i)=>(
              <div className='photoWrapper' key={carPhoto[i].id}>
                {/* hover 보여줄 요소 */}
                <div className='info'>
                  <p className='name'>{photo.name}</p>
                  <div className='linkBtn' onClick={()=>{navigate(`/detail/${photo.id}`)}}>MORE PROFILE &gt;</div>
                </div>
                <img className='img' style={{width:'100%'}} src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/photo/${photo.imgUrl}/1.jpg`} alt="CARPHOTO" />
              </div>
            ))}
          </div>
        </MaxContainer>
      </S.PhotoGallery>
    </>
  )
}

import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation, Pagination, Autoplay } from 'swiper';
import { Grid, Typography, Button } from '@mui/material'

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

  const [carImg, setCarImg] = useState(['/brand','/detail/10210','/brand','/brand']);
  const [carCount, setCarCount] = useState([1,2,3,4,5,6,7,8,9,10,11]);

  const [carPhoto, setCarPhoto] = useState([
    {id: 10220, name : '쏘나타 디 엣지', imgUrl: 'hyundai/Sonata'},
    {id: 15300, name : '트랙스 크로스오버', imgUrl: 'chevrolet/Trax'},
    {id: 11331, name : 'EV9', imgUrl: 'kia/EV9'},
    {id: 13320, name : 'QM6', imgUrl: 'renault_korea/Qm6'},
    {id: 10210, name : '아반떼 CN7', imgUrl: 'hyundai/Avante'},
    {id: 11310, name : '스포티지', imgUrl: 'kia/Sportage'},
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
          delay: 7000,
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

        {/* NewCar SLIDE */}
      <S.GradientRelative>
        <MaxContainer>
            <S.Title>최신 출시 모델</S.Title>
            <S.SecondSwiper
              slidesPerView={4}
              slidesPerGroup={4}
              spaceBetween={60}
              modules={[Pagination]}
              className="mySwiper"
              pagination={{
                dynamicBullets: true,
              }}
            >
              {
                carCount.map((a,i)=>(
                  <SwiperSlide key={carCount[i]}>
                    <img style={{width:"100%"}} src={`https://via.placeholder.com/150x100?text=NewCar ${i+1}`} alt="NEWCAR" />
                    <p style={{ marginTop: "24px"}}>TITLE</p>
                    {/* fontSize:"18px", */}
                    <div>
                      <S.InfoText>
                        <span>PRICE : </span>
                        <span>{a}</span>
                      </S.InfoText>
                      <S.InfoText>
                        <span>CARMILEAGE : </span>
                        <span>{a}</span>
                      </S.InfoText>
                      <S.InfoText>
                        <span>ENGINE : </span>
                        <span>{a}</span>
                      </S.InfoText>
                    </div>
                  </SwiperSlide>
                ))
              }
            </S.SecondSwiper>
        </MaxContainer>
        <S.GradientBox />
      </S.GradientRelative>

      {/* 포토갤러리 */}
      
      <MaxContainer>
        <S.Title>포토 갤러리</S.Title>
        <S.GalleryGrid container spacing={0}>
          {
            carPhoto.map((photo, i)=>(
                <Grid className='item' item xs={4} key={carPhoto[i].id}>
                  <div className='info'>
                    <Typography className='title'>{photo.name}</Typography>
                    <Button className='btn' onClick={()=> { navigate(`/detail/${photo.id}`) }}>MORE PROFILE &gt;</Button>
                  </div>
                  <picture>
                    <img className='img' style={{width:'100%'}} src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/photo/${photo.imgUrl}.jpg`} alt="CARPHOTO" />
                  </picture>
                </Grid>
            ))
          }
        </S.GalleryGrid>
      </MaxContainer>
    </>
  )
}

import React, {useState } from 'react';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation, Pagination, Autoplay } from 'swiper';
import { Grid, Typography, Button } from '@mui/material'

// SWIPER CSS
import 'swiper/css';
import 'swiper/css/scrollbar';
import "swiper/css/navigation";
import "swiper/css/pagination";

// COMPONENTS
import { BrandNav } from '../components/BrandNav'

// STYLED-COMPONENTS
const FirstSwiper = styled(Swiper)`
&& {
  margin-bottom: 100px;
  user-select: none;
}
`;
const SecondSwiper = styled(Swiper)`
&& {
  width: 1100px;
  height: 350px;
  margin: 100px 0 100px;
  display: flex;
  user-select: none;
  .swiper-pagination {
  }
  .swiper-pagination-bullet-active {
    width : 60px;
    background-color : black;
    border-radius: 20px;
  } 

}
`;
const GalleryGrid = styled(Grid)`
&& {
  .item {
    position: relative;
    width: 100%;
    .info {
      z-index: 1;
      width: 100%;
      height: 100%;
      color : #fff;
      position: absolute;
      text-align: center;
      opacity: 0;
      transition: opacity .3s;
      background-color: rgba(255, 255, 0, .8);
      .title {
        margin-top: 80px;
        font-size: 36px;
        font-weight: bold;
        text-align: center;
      }
      .title:after {
        content: "";
        display: block;
        width: 50%;
        border-bottom: 1px solid #bcbcbc;
        margin: 5px auto;
      }
      .btn {}
    }
  }
  /* HOVER EFFECT */
  .item:hover { .info { opacity: 1; } }
}
`;

export function Main ():JSX.Element {
  const [carImg, setCarImg] = useState([1,2,3,4,5]);
  const [carCount, setCarCount] = useState([1,2,3,4,5,6,7,8,9,10,11]);
  const [carPhote, setCarPhote] = useState([1,2,3,4,5,6]);

  

  return (
    <>
      {/* 메인배너 SLIDE */}
      <FirstSwiper
        scrollbar={{
          hide:false,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        navigation={true}
        modules={[Scrollbar, Navigation, Autoplay]}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
      >
        {
          carImg.map((a, i)=>(
            <SwiperSlide><img src={`https://via.placeholder.com/1100x500?text=Test Banner ${i+1}`} alt={`SLIDE${i+1}`} /></SwiperSlide>
          ))
        }
      </FirstSwiper>

      {/* 브랜드별 차량 NAV COMPONENTS */}
      <BrandNav />

      {/* NewCar SLIDE */}
      <SecondSwiper
        slidesPerView={5}
        spaceBetween={50}
        modules={[Pagination]}
        className="mySwiper"
        pagination={{
          clickable: true,
        }}
      >
        {
          carCount.map((a,i)=>(
            <SwiperSlide>
              <img style={{width:"100%"}} src={`https://via.placeholder.com/150x100?text=NewCar ${i+1}`} alt="NEWCAR" />
              <p style={{fontSize:"18px"}}>TITLE</p>
              <div style={{display:"flex", justifyContent:"space-around"}}>
                <div>
                  <p style={{fontSize:"12px"}}>PRICE : </p>
                  <p style={{fontSize:"12px"}}>CARMILEAGE : </p>
                  <p style={{fontSize:"12px"}}>ENGINE : </p>
                </div>
                <div>
                  <p>{a}</p>
                  <p>{a}</p>
                  <p>{a}</p>
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </SecondSwiper>


      {/* 포토갤러리 */}
      <GalleryGrid container spacing={0}>
        {
          carPhote.map((a, i)=>(
              <Grid className='item' item xs={4}>
                <div className='info'>
                  <Typography className='title'>Title</Typography>
                  <Button className='btn'>MORE PROFILE &gt;</Button>
                </div>
                <img className='img' style={{width:'100%'}} src={`https://via.placeholder.com/400x300?text=Temp Phote ${i+1}`} alt="CARPHOTO" />
              </Grid>
          ))
        }
      </GalleryGrid>
    </>
  )
}
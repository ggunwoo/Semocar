import React, {useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation, Pagination, Autoplay, Grid } from 'swiper';
import { styled } from 'styled-components';

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
  height: 400px;
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

export function Main ():JSX.Element {
  const [carImg, setCarImg] = useState([1,2,3,4,5]);
  const [carCount, setCarCount] = useState([1,2,3,4,5,6,7,8,9,10,11]);

  

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
            <SwiperSlide><img src={`https://via.placeholder.com/1100x500?text=Test Banner ${i}`} alt={`SLIDE${i}`} /></SwiperSlide>
          ))
        }
      </FirstSwiper>


      {/* 브랜드별 차량 NAV COMPONENTS */}
      <BrandNav />


      {/* NewCar SLIDE */}
      <SecondSwiper
        slidesPerView={5}
        spaceBetween={50}
        modules={[Pagination, Grid]}
        className="mySwiper"
        pagination={{
          clickable: true,
        }}
        grid={{
          fill:'row',
        }}
      >
        {
          carCount.map((a,i)=>(
            <SwiperSlide>
              <img style={{width:"100%"}} src={`https://via.placeholder.com/150x100?text=NewCar ${i}`} alt="NEWCAR" />
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
    </>
  )
}
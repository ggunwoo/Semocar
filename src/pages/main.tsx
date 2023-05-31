import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation, Pagination, Autoplay } from 'swiper';
import { Grid, Typography, Button } from '@mui/material'

// SWIPER CSS
import 'swiper/css';
import 'swiper/css/scrollbar';
import "swiper/css/navigation";

// COMPONENTS
import { BrandNav } from '../components/BrandNav'

// STYLED-COMPONENTS
import { MaxContainer, Blank } from '../App';
const BannerSwiper = styled(Swiper)`
&& {
  min-width: 1100px;
  margin-top: 80px;
  margin-bottom: 100px;
  user-select: none;
  .swiper-button-next {
    right: 15%;
    /* background-color: black; */
    color: black;
  }
  .swiper-button-prev {
    left: 15%;
    color: black;
  }
  .swiper-scrollbar {
    width: 1100px;
    left: 50%;
    transform: translateX(-50%);
  }
}
`;
const BannerBackgound = styled.img`
&& {
  position: relative;
  width: 100%;
}
`;
const Banner = styled.img`
&& {
  z-index: 1;
  width: 100%;
  max-width: 1100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
`;
const GradientRelative = styled.div`
&& {
  position: relative;
}
`;
const GradientBox = styled.div`
&& {
  width: 100%;
  height: 300px;
  background: linear-gradient(180deg, rgba(230, 230, 230, 0) 0%, #E6E6E6 100%);
  position: absolute;
  top: -35%;
  left: 0;
  z-index: -1;
}
`;
const SecondSwiper = styled(Swiper)`
&& {
  width: 1100px;
  height: 370px;
  margin: 36px 0 100px;
  display: flex;
  user-select: none;
  .swiper-pagination-bullets {
    width: 150px !important;
  }
  .swiper-pagination-bullet-active {
    width : 30px;
    background-color : black;
    border-radius: 20px;
  } 
}
`;
const TitleTypography = styled(Typography)`
&& {
  font-size: 24px;
  margin-top: 100px;
}
`;
const InfoText = styled.p`
&& {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
`
const GalleryGrid = styled(Grid)`
&& {
  margin-top: 36px;
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
      background-color: rgba(255, 255, 0, .95);
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
  const navigate = useNavigate();

  const [carImg, setCarImg] = useState([1,2,3,4]);
  const [carCount, setCarCount] = useState([1,2,3,4,5,6,7,8,9,10,11]);
  const [carPhoto, setCarPhoto] = useState([
    {id: 10220, name : '쏘나타 디 엣지', imgUrl: 'hyundai/Sonata'},
    {id: 2, name : '트랙스 크로스오버', imgUrl: 'chevrolet/Trax'},
    {id: 11331, name : 'EV9', imgUrl: 'kia/EV9'},
    {id: 4, name : 'QM6', imgUrl: 'renault_korea/Qm6'},
    {id: 10210, name : '아반떼 CN7', imgUrl: 'hyundai/Avante'},
    {id: 11310, name : '스포티지', imgUrl: 'kia/Sportage'},
  ]);

  

  return (
    <>
      {/* 메인배너 SLIDE */}
      <BannerSwiper
        scrollbar={{
          hide:false,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        loop={true}
        modules={[Scrollbar, Navigation, Autoplay, Pagination]}
        slidesPerView={1}
        // onSlideChange={() => console.log('slide change')}
        >
        {
          carImg.map((a, i)=>(
            <SwiperSlide key={carImg[i]}>
              <Banner src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/banner/banner${a}.png`} alt={`SLIDE${i+1}`}></Banner>
              <BannerBackgound src={`https://via.placeholder.com/1100x300/FFFFFF?text=Background Banner ${i+1}`} alt={`BACKGROUND${i+1}`} />
            </SwiperSlide>
          ))
        }
      </BannerSwiper>

      {/* <Blank /> */}

      {/* 브랜드별 차량 NAV COMPONENTS */}
      <BrandNav />

      <Blank />
      {/* NewCar SLIDE */}
      <GradientRelative>
        <MaxContainer sx={{ position:'relative' }}>
          <TitleTypography>최신 출시 모델</TitleTypography>
          <SecondSwiper
            slidesPerView={4}
            slidesPerGroup={4}
            spaceBetween={60}
            // modules={[Pagination]}
            className="mySwiper"
            // pagination={{
            //   dynamicBullets: true,
            // }}
            >
            {
              carCount.map((a,i)=>(
                <SwiperSlide key={carCount[i]}>
                  <img style={{width:"100%"}} src={`https://via.placeholder.com/150x100?text=NewCar ${i+1}`} alt="NEWCAR" />
                  <p style={{fontSize:"18px", marginTop: "24px"}}>TITLE</p>
                  <div>
                    <InfoText>
                      <span>PRICE : </span>
                      <span>{a}</span>
                    </InfoText>
                    <InfoText>
                      <span>CARMILEAGE : </span>
                      <span>{a}</span>
                    </InfoText>
                    <InfoText>
                      <span>ENGINE : </span>
                      <span>{a}</span>
                    </InfoText>
                  </div>
                </SwiperSlide>
              ))
            }
          </SecondSwiper>
        </MaxContainer>
        <GradientBox />
      </GradientRelative>
      
      <Blank />

      {/* 포토갤러리 */}
      
      <MaxContainer>
        <TitleTypography>포토 갤러리</TitleTypography>
        <GalleryGrid container spacing={0}>
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
        </GalleryGrid>
      </MaxContainer>
    </>
  )
}
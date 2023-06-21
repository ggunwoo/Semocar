import styled from 'styled-components';
import { Swiper } from 'swiper/react';
import { Grid, Typography } from '@mui/material'

export const BannerSwiper = styled(Swiper)`
&& {
  height: 472px;
  margin-bottom: 80px;
  user-select: none;
  .swiper-button-next {
    right: 15%;
    color: black;
    opacity: .2;
    @media (max-width:1600px) {
      right: 7%;
    }
    @media (max-width:1440px) {
      right: 4%;
    }
    @media (max-width:1100px) {
      right: 2%;
    }
  }
  .swiper-button-prev {
    left: 15%;
    color: black; 
    opacity: .2;
    @media (max-width:1600px) {
      left: 7%;
    }
    @media (max-width:1440px) {
      left: 6%;
    }
    @media (max-width:1100px) {
      left: 2%;
    }
  }
  .swiper-scrollbar {
    width: 1072px;
    height: 7px;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
    .swiper-scrollbar-drag {
      background-color: #9063FF;
    }
  }
}`;
export const BaseBox = styled.div`
&&{
  width: 1100px;
  margin: auto;
  position: relative;
  /* top: 50px; */
  /* transform: translateY(-50%); */
}`
export const BannerImg = styled.img`
&&{
  z-index: 1;
  width: 1100px;
  border-radius: 20px;
  position: absolute;
  margin: 0 auto;
  /* top: 0; */
  left: 50%;
  transform: translateX(-50%);

}`;
export const BannerBtn = styled.img`
&& {
  width: 175px;
  z-index: 2;
  cursor: pointer;
  position: absolute;
  &.bannerBtn_1 {
    top: 387px;
    left: 26px;
  }
  &.bannerBtn_2 {
    top: 330px;
    left: 40px;
  }
  &.bannerBtn_3 {
    top: 305px;
    right: 123px;
  }
  &.bannerBtn_4 {
    top: 205px;
    right: 90px;
  }
}`;
export const BannerBackgound = styled.div`
&& {
  width: 100%;
  height: 100%;
  margin-left: 50%;
  transform: translateX(-50%);
  position: absolute;
  /* filter: blur(20px); */
  /* top: -50px; */
  left: 0;
  img {
    width: 100%;
    /* height: 100%; */
  }
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #2a2b36;
    opacity: .90;
  }
}`;
export const GradientRelative = styled.div`
&& {
  position: relative;
}`;
export const GradientBox = styled.div`
&& {
  width: 100%;
  height: 171px;
  background: linear-gradient(180deg, rgba(230, 230, 230, 0) 0%, #e6e6e6 50%);
  position: absolute;
  top: -27px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
}`;

export const Title = styled(Typography)<{marginTop: string}>`
&& {
  font-size: 18px;
  margin-top: ${props => props.marginTop || '150px'};
}`;
export const SecondSwiper = styled(Swiper)`
&& {
  height: 370px;
  margin: 36px 0 100px;
  display: flex;
  user-select: none;
  .swiper-pagination-bullets {
    width: 150px !important;
  }
  .swiper-pagination-bullet-active {
    width : 30px;
    background-color : #62478f;
    border-radius: 20px;
  } 
}`;

export const InfoText = styled.p`
&& {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}`;
export const GalleryGrid = styled(Grid)`
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
      background-color: #BA90FD;
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
}`;
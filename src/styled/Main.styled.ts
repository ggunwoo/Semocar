import styled from 'styled-components';
import { Swiper } from 'swiper/react';
import { Grid, Typography } from '@mui/material'

export const BannerSwiper = styled(Swiper)`
&& {
  height: 472px;
  margin-bottom: 120px;
  user-select: none;
  position: relative;
  overflow: hidden;
  .swiper-button-next, .swiper-button-prev {
    color: #E9DCFD;
    opacity: .4;
    transition: all .2s;
    &:hover {
      color: #62478f;
    }
    &::after {
      font-size: 32px !important;
    }
  }
  .swiper-button-next {
    right: 15%;
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
  .swiper-pagination {
    width: 1300px;
    text-align: end;
    position: relative;
    left: 50%;
    bottom: 40px;
    transform: translateX(-50%);
    display: none;
    .swiper-pagination-bullet {
      &:last-child {
      }
    }
    .swiper-pagination-bullet-active {
  
    }
  }
}`;
export const BaseBox = styled.div`
&&{
  width: 1100px;
  margin: auto;
  position: relative;
  
}`
export const BannerImg = styled.img`
&&{
  z-index: 1;
  width: 1100px;
  height: 472px;
  border-radius: 20px;
  position: absolute;
  margin: 0 auto;
  /* top: 0; */
  left: 50%;
  transform: translateX(-50%);

}`;
export const BannerBtn = styled.div`
&& {
  width: 157px;
  height: 42px;
  /* background-color: #000; */
  /* opacity: .5; */
  background-color: transparent;
  z-index: 2;
  cursor: pointer;
  position: absolute;
  &.bannerBtn_1 {
    top: 353px;
    left: 86px;
  }
  &.bannerBtn_2 {
    top: 377px;
    left: 106px;
  }
  &.bannerBtn_3 {
    width: 170px;
    top: 303px;
    right: 122px;
  }
  &.bannerBtn_4 {
    width: 170px;
    top: 205px;
    left: 10px;
  }
}`;
export const BannerBackgound = styled.div`
&& {
  min-width: 100%;
  margin-left: 50%;
  transform: translateX(-50%);
  /* filter: blur(20px); */
  left: 0;
  img {
    width: 100%;
    height: 472px;
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
  background: linear-gradient(180deg, rgba(230, 230, 230, 0) 0%, #cdc0e2 200%);
  position: absolute;
  top: -27px;
  left: 50%;
  opacity: .5;
  transform: translateX(-50%);
  z-index: -1;
}`;

export const Title = styled(Typography)<{marginTop: string}>`
&& {
  font-size: 18px;
  font-family: GmarketSans, NotoSans KR, sans-serif;
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
  margin-bottom: 200px;
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
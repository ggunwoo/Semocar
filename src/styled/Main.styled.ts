import styled from 'styled-components';
import { Swiper } from 'swiper/react';

// 매인배너
export const BannerWrapper = styled(Swiper)`
&&& {
  height: 472px;
  margin-bottom: 120px;
  user-select: none;
  position: relative;
  overflow: hidden;
  .swiper-button-next, .swiper-button-prev {
    color: #62478f;
    opacity: .4;
    transition: all .2s;
    filter: invert(100%);
    mix-blend-mode: difference;
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

  .baseBox {
    width: 1100px;
    margin: auto;
    position: relative;
  }
  .bannerImg {
    z-index: 1;
    width: 1100px;
    height: 472px;
    position: absolute;
    margin: 0 auto;
    /* top: 0; */
    left: 50%;
    transform: translateX(-50%);
  }
  .bannerBtn {
      width: 157px;
      height: 42px;
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
        left: 107px;
      }
    }
  .background {
    min-width: 100%;
    margin-left: 50%;
    transform: translateX(-50%);
    /* filter: blur(20px); */
    left: 0;
    img {
      width: 100%;
      height: 472px;
    }
  }
}`;

// 최신 출시 모델
export const Letest = styled.div`
&&& {
  position: relative;
  /* 뒷배경 그라데이션 */
  .gradientLine {
    width: 100%;
    height: 171px;
    background: linear-gradient(180deg, rgba(230, 230, 230, 0) 0%, #cdc0e2 200%);
    position: absolute;
    top: -47px;
    left: 50%;
    opacity: .5;
    transform: translateX(-50%);
    z-index: -1;
  }
  /* 섹션 제목 */
  .title {
    font-size: 18px;
    font-family: GmarketSans, NotoSans KR, sans-serif;
    margin-top: 150px;
  }
  /* 캐러셀 슬라이드(Swiper) */
  .carousel {
    height: 370px;
    margin: 48px 0 100px;
    display: flex;
    user-select: none;
    /* pagination */
    .swiper-pagination-bullets {
      width: 150px !important;
    }
    .swiper-pagination-bullet-active {
      width : 30px;
      background-color : #62478f;
      border-radius: 20px;
    }
  }
    /* 슬라이드, 자동차 머릿말정보 */
  .slide .carHead {
    cursor: pointer;
    white-space: nowrap;
    /* 자동차 이름 */
    p {
      height: 32px;
      margin-top: 18px; 
      transition: all .1s;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    /* 슬라이드 이미지 */
    .images {
      width: 200px;
      height: 90px;
      position: relative;
      left: 0;
      transition: all .3s;
      img {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    /* 호버효과 */
    &:hover {
      p {
        color: #62478f;
        overflow: visible;
        white-space: normal;
      }
      .images {
        left: -30px;
      }
      
    }
  }
  /* 자동차 정보 */
  .infoBox {
    color: #626262;
    font-size: 12px;
    dt {
      float: left;
      margin-right: 12px;
    }
    dd {}
  }
}`;

// 포토 갤러리
export const PhotoGallery = styled.div`
&&& {
  user-select: none;
  .title {
    font-size: 18px;
    font-family: GmarketSans, NotoSans KR, sans-serif;
    margin-top: 150px;
  }
  .galleryWrapper {
    margin-top: 24px;
    margin-bottom: 200px;
    display: flex;
    flex-wrap: wrap;
    .photoWrapper {
      width: calc(100%/3);
      min-width: calc(100%/3);
      height: 100%;
      position: relative;
      .info {
        width: 100%;
        height: 100%;
        color : #fff;
        background-color: #000;
        position: absolute;
        opacity: 0;
        transition: opacity .3s;
        z-index: 1;
        .name {
          font-size: 24px;
          font-weight: bold;
          white-space: nowrap;
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translateX(-50%);
          opacity: 1 !important;
        }
        .linkBtn {
          font-size: 12px;
          position: absolute;
          bottom: 30%;
          left: 50%;
          transform: translateX(-50%);
          opacity: 1 !important;
          cursor: pointer;
          &:hover {
            color: #9063FF;
          }
        }
      }
    }
    /* 호버시 info 투명도 조절 */
    .photoWrapper:hover { .info { opacity: .75; } }
  }
}`;

import { styled } from 'styled-components'
import { Chip } from '@mui/material'
import { Swiper } from 'swiper/react'

// Nav 이동시 위치 요소
export const MoveRef = styled.div<{height:string, mt?:string}>`&&&
{
  width: 100%;
  height: ${props => props.height || 0};
  margin-top: ${props => props.mt || 0};
}`;

// 메인배너
export const HeadBox = styled.div`&&&
{
  width: 100%;
  background-color: #e9eaf1;
  &.display_none {
    width: 100px;
  }
  .headWrapper {
    width: 100%;
    height: 400px;
    background-color: #e9eaf1;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
  }
  /* 좌측 정보 */
  .infoBox {
    margin-top: 100px;
    /* 브랜드 */
    .brand {
      font-size: 1.125rem;
      margin-bottom: 0 !important;
      font-weight: bold;
      display: flex;
      align-items: center;
      /* 브랜드-아이콘 */
      img {
        max-width: 36px;
        max-height: 18px;
        margin-right: 8px;
      }
      /* 브랜드-이름 */
      span {
        font-size: 18px;
        color: #626262;
        text-align: center;
      }
    }
    /* 차량 이름 */
    .name {
      font-size: 3rem;
      margin-bottom: 0 !important;
    }
    /* 차량 가격 */
    .price {
      color: #62478f;
      font-weight: bold;
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
  /* 우측 이미지 */
  .image {
    margin-top: 120px;
    img {
      width: 500px;
    }
  }
}`;
// 차량 정보 칩
export const StyledChip = styled(Chip)`&&&
{
  color: #626262;
  margin-right: 10px;
  background-color: #fff;
  padding: 8px 8px;
  font-size: .75rem;
  font-family: NotoSans KR bold, sans-serif !important;
  &.first {
    margin-left: -6px;
  }
}`;
// 스크롤 위치 이동 버튼그룹
export const TartgetNav = styled.div`&&&
{
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(196,196,196,0.25);
  .btnGroup {
    width: 1100px;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    z-index: 2;
    .unclick {
      color: #cacaca;
    }
    .clicked {
      color: #AB9ADD;
      font-weight: bold;
      position: relative;
      &::before {
        content: "";
        display: block;
        width: 100%;
        height: 7px;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #AB9ADD;
      }
    }
  }
}`;
// 스크롤 위치 이동 버튼
export const TargetBtn = styled.div`&&&
{
  width: 140px;
  text-align: center;
  cursor: pointer;
  p {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}`;
// 상단고정사이드 (FeatureBox가 화면에서 사라질 때 보여줄 요소)
export const FixedBox = styled.div`&&&
{
  width: 100%;
  height: 130px;
  position: fixed;
  top: 0;
  background-color: #fff;
  /* border-bottom: 1px solid #000; */
  box-shadow: 0px 4px 20px rgba(196,196,196,0.25);
  overflow: hidden;
  z-index: 2;
  /* TargetNav가 화면에 가려질때 보여주기 */
  &.unfixed { display: none; }
  &.fixed { display: block; }
  .wrap {
    width: 1100px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    position: relative;
    /* 좌측요소 */
    .featureBox {
      /* 타이틀*/
      .titleGroup {
        margin-top: 18px;
        /* 브랜드 */
        .brand {
          display: flex;
          align-items: center;
          /* 브랜드-이미지 */
          img {
            max-width: 25px;
            min-width: 15px;
            max-height: 17px;
            margin-right: 8px;
            opacity: .75;
          }
          /* 브랜드-이름 */
          span {
            font-size: 0.75rem;
            color: #626262;
            text-align: center;
            margin-top: 3px;
          }
        }
        /* 차량이름 */
        .name {
          color: #626262;
          font-size: 2.125rem;
          font-weight: 600;
          line-height: 2.5rem;
        }
      }
      /* 스크롤위치이동 탭(TargetNav) */
      .btnGroup {
        display: flex;
        position: absolute;
        bottom: 0;
        left: 0;
        p {
        }
        .targetBtn {
          font-size: 1rem;
        }
        .unclick {
            color: #cacaca;
          }
        .clicked {
          color: #AB9ADD;
          font-weight: bold;
          position: relative;
          &::before {
            content: "";
            display: block;
            width: 100%;
            height: 5px;
            position: absolute;
            bottom: 0;
            left: 0;
            background-color: #AB9ADD;
          }
        }
      }
    }
    /* 우측이미지 */
    .imgBax {
      img {
        width: 460px;
        position: relative;
        top: 7px;
        right: 60px;
      }
    }
  }
}`;
// 차량 상세정보 표 (등급별 제원)
export const ChartWrapper = styled.div`
&&& {
  .title {
    font-size: 1em;
    font-weight: bold;
    font-family: GmarketSans, NotoSans KR bold, sans-serif !important;
  }
  color: #626262;
  .infoWrap {
    width: 100%;
    margin-top: 20px;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
  }
}`;
// 등급, 트림 표
export const SelectWrapper = styled.div`
&&& {
  dl {
    background-color: #FBFBFB;
    padding: 24px 0 24px 16px;
    margin-bottom: 0;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    min-height: 46px;
  }
  dt {
    font-family: NotoSans KR bold, GmarketSans, sans-serif !important;
    width: 90px;
    height: 100%;
    margin-top: 4px;
    margin-right: 24px;
    text-align: center;
  }
  dd {
    font-family: NotoSans KR light, GmarketSans, sans-serif !important;
    width: 85%;
    height: 100%;
    font-size: .825rem;
    margin-bottom: 0;
    display: flex;
    flex-wrap: wrap;
    gap: .7em;
    .clicked {
      color: #fff;
      background-color: #AB9ADD;
    }
  }
  /* 선택 버튼 */
  .selectBtn {
    cursor: pointer;
    padding: 8px 14px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    border-radius: 1.5em;
  }
}`;
// 가격
export const PriceDl = styled.dl`
&&& {
  margin: 18px 16px 0;
  padding-bottom: 6px;
  border-bottom: 1px solid #d8d8d8;
  display: flex;
  align-items: flex-start;
  font-family: NotoSans KR bold, sans-serif !important;
  dt {
    width: 90px;
    height: 100%;
    margin-top: 13px;
    margin-right: 30px;
    text-align: center;
  }
  dd {
    width: 85%;
    font-size: 1.75rem;
    span {
      font-size: 0.75rem;
      font-weight: bold;
    }
  }
}`;
// 스펙
export const SpacDl = styled.dl`
&&& {
  margin-top: 48px;
  margin-left: 16px;
  display: flex;
  &>dt {
    width: 90px;
    height: 85%;
    margin-right: 30px;
    text-align: center;
    font-family: NotoSans KR bold, sans-serif !important;
  }
  &>dd {
    display: flex;
    width: 85%;
    span {
      font-size: 0.825em;
    }
  }
}`;
// 스펙-차트
export const ChartDl = styled.dl`
&&& {
  width: 33.3333333333%;
  font-size: .875rem;
  font-family: NotoSans KR regular, sans-serif;
  line-height: 1.5rem;
  &>dt {
    width: 40%;
    color: #9f9f9f;
    font-weight: normal;
    float: left;
    margin-bottom: 8px;
  }
  &>dd {
    color: #626262;
    margin-bottom: 8px;
  }
}`;
// 자동차 치수 이미지
export const SizeBox = styled.div`
&&& {
  width: 70%;
  height: 100%;
  margin-top: 50px;
  margin-left: 136px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  /* 차량 이미지 공통속성 */
  .size_img {
    .wrap_thumb .sizeimg {
      height: 104px;
      margin-bottom: 3px;
    }
    .wrap_size {
      display: block;
      margin: 0 auto;
      text-align: center;
      position: relative;
      line-height: 1em;
      .txt {
        font-size: .75em;
        color: #9F9F9F;
        background-color: #fff;
        padding: 0 3px;
        z-index: 1;
        position: relative;
      }
      .line {
        width: 100%;
        height: 1px;
        background-color: #b7b7b7;
        position: absolute;
        left: 0;
        top: 50%;
        z-index: 0;
        &::after {
          content: "";
          display: block;
          width: 1px;
          height: 5px;
          background-color: #b7b7b7;
          position: absolute;
          top: -5px;
          left: 0;
        }
        &::before {
          content: "";
          display: block;
          width: 1px;
          height: 5px;
          background-color: #b7b7b7;
          position: absolute;
          top: -5px;
          right: 0;
        }
      }
    }
  }
  /* 차량 앞면 이미지 */
  .size_img.front {
    /* 윤거전 */
    .track {
      width: 94px;
    }
    /* 전폭 */
    .weight {
      width: 100%;
    }
  }
  /* 차량 옆면 이미지 */
  .size_img.side {
    /* 축거 */
    .wheelbase {
      width: 180px;
    }
    /* 전장 */
    .length {
      width: 100%;
    }
  }
  /* 차량 뒷면 이미지 */
  .size_img.rear {
    position: relative;
    /* 윤거후 */
    .tread {
      width: 94px;
      margin-top: 8px;
    }
    /* 전고 (세로) */
    .height {
      height: 104px;
      position: absolute;
      top: 0;
      right: -75%;
      .txt {
        white-space: nowrap;
        padding: 5px 0;
        position: relative;
        top: 45%;
        left: -50%;
        z-index: 2;
      }
      .line {
        width: 1px;
        height: 100%;
        background-color: #b7b7b7;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        &::after {
          width: 5px;
          height: 1px;
          top: 0;
          left: -5px;
        }
        &::before {
          width: 5px;
          height: 1px;
          top: 103px;
          left: -5px;
        }
      }
    }
  }
}`;
// 포토갤러리
export const SwiperWrap = styled.div`
&&& {
  width: 100%;
  /* margin-top: 160px; */
  height: 700px;
  user-select: none;
  .slideHead {
    display: flex;
    justify-content: space-between;
    .buttonGroup {
      display: flex;
      gap: 0;
      cursor: pointer;
      .changeBtn {
        background-color: #F9F9F9;
        padding: 5px 20px;
        &.active {
          color: #fff;
          background-color: #AB9ADD;
        }
      }
    }
  }
  .block { display:block }
  .none { display:none }
}`;
export const MainSwiper = styled(Swiper)`
&&& {
  margin-top: 20px;
  /* 다음, 이전 버튼 */
  .swiper-button-next, .swiper-button-prev {
    display: block;
    /* color: #626262; */
    color: #fff;
    width: 26px;
    height: 72px;
    background-color: rgba(0,0,0,.3);
    &:hover {
      background-color: rgba(0,0,0,.5);
    }
    &::after {
      position: absolute;
      top: 50%;
    }
  }
  /* 다음버튼 */
  .swiper-button-next {
    right: 0;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    &::after{
      right: 40%;
      transform: translate(50%, -50%) scale(.5);
    }
  }
  /* 이전버튼 */
  .swiper-button-prev {
    left: 0;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    &::after{
      left: 40%;
      transform: translate(-50%, -50%) scale(.5);
    }
  }
  .swiper-button-disabled {
    display: none !important;
  }
  img {
    width: 100%;
  }
}`;
// 포토갤러리-썸네일
export const ThumbsSwiper = styled(Swiper)`
&&& {
  margin-top: 10px;
  .swiper-slide {
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .swiper-slide::after {
    display: none;
  }
  
  .swiper-slide-thumb-active {
    position: relative;
  }
  .swiper-slide-thumb-active::after { 
    content: "";
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000;
    opacity: .63;
  }
  .swiper-slide-thumb-active::before {
    content: "";
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
    border-bottom: 5px solid #62478f;
  }
}`;
// 댓글
export const CommentWrap = styled.div`
&&& {
  width: 100%;
  /* height: 100%; */
  padding-bottom: 300px;
  .top_section {
    margin-left: 24px;
    margin-bottom: 36px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .left {
      width: 300px;
      position: relative;
      .star {
        color: #AB9ADD;
        font-size: 3.5em;
      }
      .int {
        font-size: 4em;
        font-weight: bold;
        margin-top: 1rem;
        margin-left: 1rem;
      }
      .commentCount {
        color: #777777;
        font-size: 14px;
        position: absolute;
        left: 3em;
        bottom: -1.25em;
      }
      
    }
    .right {
      width: 800px;
      border-left: 1px solid #999999;
      padding-left: 36px;
      .box {
        display: flex;
        .line {
          width: 150px;
          height: 6px;
          margin: auto 0;
          margin-left: 0.5em;
          background-color: #AB9ADD;
          border-radius: 50px;
        }
      }
    }
    
  }
  .sort {
    cursor: pointer;
  }
}`;
// 댓글-쓰기
export const PostForm = styled.form`
&&& {
  padding: 10px 0;
  display: flex;
  align-items: center;
  .rating {
    color: #AB9ADD;
    margin-right: 16px;
    margin-left: 24px;
  }
  .send {
    width: 100px;
    height: 100%;
    color: #d8d8d8;
    margin-right: 16px;
    margin-left: 10px;
    height: 56px;
    border-radius: 100%;
    &:hover {
      color: #AB9ADD;
    }
    .sendIcon {
      font-size: 2em;
      width: 100%;
      height: 100%;
      margin-top: -3px;
      padding: 8px 8px 8px;
      transform: rotate(-28.42deg);
    }
  }
}`;
// 댓글-리스트
export const CommentList = styled.form`
&&& {
  .list {
    width: 100%;
    min-height: 128px;
    margin-bottom: 18px;
    padding: 24px;
    display: flex;
    align-items: center;
    background-color: #f9f9f9;
    border-radius: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .rating {
      margin-right: .5em;
      color: #AB9ADD;
    }
    .ratingNum {
      color: #000;
      font-weight: bold;
      margin-right: 1.25em;
    }
    .textBox {
      width: 100%;
      height: 100%;
      .typo {
        font-size: 1em;
      }
      .userInfo {
        margin-top: 8px;
        font-size: .75rem;
        font-weight: lighter;
        color: #626262;
        .userName {}
        .date {}
      }
  }
  }
  .like {
    width: 80px;
    text-align: center;
    .icon, .offIcon {
      color: #c6c6c6;
      font-size: 2rem;
    }
    .icon {}
    .offIcon {
      &.clicked {
        color: #AB9ADD;
        /* background-color: #AB9ADD; */
      }
    }
    .likeCtn {
      line-height: 2em;
      font-size: 0.75em;
    }
  }
}`;
// 더보기 버튼
export const MoreBtn = styled.div`
&&& {
  /* 임시 */
  display: none;

  
  width: 100%;
  border: 1px solid #000;
  border-radius: 20px;
  p {
    text-align: center;
    margin: 0;
    padding: 8px 0;
  }
}`;
import { styled } from 'styled-components';
import { Box } from '@mui/material';

// const maincolor = "#BA90FD";

export const SearchBarWraper = styled.div`
&& {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .searchIcon {
    /* opacity: 0.3; */
    /* color: #dee2e6; */
    color: rgba(0, 0, 0, 0.175);
  }
}`;

export const CarSection = styled.div`
&& {
  width: 1100px;
  /* border: 1px solid black; */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media (max-width:1440px) {
    width: 960px;
    
  }
}`;

// 차량목록
export const StyledBox = styled(Box)`
&& {
  display: flex;
  justify-content: space-between;
  border-bottom: 0;
  margin-bottom: 3rem;
  border-color: divider;
  margin-top: 50px;
  .tabs {
    height: 20px !important;
    .MuiTabs-flexContainer {
      .tab {
        font-family: GmarketSans, NotoSans KR, sans-serif;
        &.Mui-selected {
          color: #9063FF;
          font-weight: bold;
        }
      }
    }
    .MuiTabs-indicator {
      background-color: #9063FF;
      height: 3px;
    }
  }
}`;
export const CarArticle = styled.div`
&& {
  width: 25%;
  margin-bottom: 70px;
  
  .car_head {
    width: 245px;
    cursor: pointer;
    .img_wrap {
      max-width: 220px;
      height: 130px;
      position: relative;
      img {
        margin: auto 0;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        transition: all .3s;
      }
    }
    p {
      /* font-family: NotoSans KR; */
      height: 52px;
      margin-top: 16px;
      margin-bottom: 0;
      font-weight: 600;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition: all .2s;
    }
    &:hover {
      p {
        color: #9063FF;
        overflow: visible;
        white-space: normal;
      }
      img {
        left: -30px;
      }
      
    }
  }
  .car_info {
    font-size: 14px;
    div span {
      color: #999;
      margin-right: 8px;
    }
  }
  @media (max-width: 1440px){
    width: 320px;
  }
}`;
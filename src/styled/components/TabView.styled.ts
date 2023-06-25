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
export const StyledBox = styled(Box)`
&& {
  /* {display:"flex", borderBottom: 0, borderColor: 'divider' } */
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
export const CarArticle = styled.div`
&& {
  width: 275px;
  margin-bottom: 70px;
  .car_head {
    cursor: pointer;
    .img_wrap {
      max-width: 280px;
      height: 130px;
      position: relative;
      img {
        margin: auto 0;
        width: 230px;
        transition: all .5s;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    p {
      margin-top: 16px;
      margin-bottom: 20px;
      font-weight: 600;
      transition: all .2s;
    }
    &:hover {
      img {
        left: -30px;
      }
      p {
        color: #9063FF;
      }
    }
    &:not(:hover) {
      img {
        left: 0;
      }
      p {
        color: #000;
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
import { styled } from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';


// 스피너
export const StyledSpinner = styled(CircularProgress)`&&&
{
  color: #9063FF;
  position: fixed;
  top: 85%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}`;

// 상단 탭
export const StyledBox = styled.div`&&&
{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
          color: #AB9ADD;
          font-weight: bold;
        }
      }
    }
    .MuiTabs-indicator {
      background-color: #AB9ADD;
      height: 3px;
    }
  }
}`;
// 차량목록
export const CarSection = styled.div`&&&
{
  width: 1100px;
  /* border: 1px solid black; */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* margin-bottom: 200px; */
}`;
// 차량
export const CarArticle = styled.div`
&&& {
  width: 25%;
  margin-bottom: 70px !important;
  padding: 30px 0 0 45px;
  .carWrap {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  .car_head {
    width: 100%;
    cursor: pointer;
    .img_wrap {
      /* max-width: 215px; */
      height: 130px;
      position: relative;
      img {
        margin: auto 0;
        width: 90%;
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
}`;

import { styled } from 'styled-components';
import { Box } from '@mui/material';

// const maincolor = "#BA90FD";

export const SearchBarWraper = styled.div`
&& {
  width: 100%;
  display: flex;
  justify-content: space-between;
}`;
export const StyledBox = styled(Box)`
&& {
  /* {display:"flex", borderBottom: 0, borderColor: 'divider' } */
  display: flex;
  justify-content: space-between;
  border-bottom: 0;
  margin-bottom: 3rem;
  border-color: divider;
}`;
export const CarSection = styled.div`
&& {
  width: 1100px;
  /* border: 1px solid black; */
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: baseline;
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
    img {
      transition: all .5s;
    }
    p {
      margin-top: 16px;
      margin-bottom: 20px;
      font-weight: 600;
      transition: all .2s;
    }
    &:hover {
      img {
        transform: translateX(-20px);
      }
      p {
        color: #9063FF;
      }
    }
    &:not(:hover) {
      transform: translateX(0);
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
import { styled } from 'styled-components';
import { Box } from '@mui/material';


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
  @media (max-width: 1440px){
      width: 240px;
    }
}`;
import { styled } from 'styled-components'
import { Box, Button } from '@mui/material';

export const BrandNavWrap = styled.div`
&& {
  width: 100%;
  height: 100px;
  background-color: #fff;
  padding-top: 20px;
  margin: 50px 0 0;
  box-sizing: border-box;
  /* border: 1px solid rgba(0,0,0,.2); */
  /* border-radius: 10px; */
}`;

export const FlexBox = styled(Box)`
&& {
  width: 100%;
  display:flex;
  justify-content: space-evenly;
  align-items: center;
  border-color: #62478f;
  .clicked {
    border-bottom: 4px solid #62478f;
    & > .imgBox {
      display: none;
    }
    & > .logoName {
      display: block;
    }
  }
  :hover > .imgBox{
    display: none;
  }
  :hover > .logoName{
    display: block;
  }
}`;
export const LogoButton = styled(Button)`
&& {
  width: 120px;
  height: 60px;
}`;
export const ImageBox = styled.div`
&& {
  display: block;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
}`;
export const LogoName = styled.p`
&& {
  color: #000;
  font-size: 1rem;
  font-weight: bold;
  font-family: GmarketSans, NotoSans KR, sans-serif;
  margin: auto 0;
  display: none;
}`;
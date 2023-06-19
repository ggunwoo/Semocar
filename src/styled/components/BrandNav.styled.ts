import { styled } from 'styled-components'
import { Box, Button } from '@mui/material';

export const FlexBox = styled(Box)`
&& {
  display:flex;
  /* margin-top: 0; */
  justify-content: space-evenly;
  align-items: center;
  .clicked {
    border-bottom: 4px solid #e8e8e8;
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
  &:hover {
  }
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
  font-family: 'Gmarket Sans medium';
  margin: auto 0;
  display: none;
}`;
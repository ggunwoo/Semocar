import styled from 'styled-components';
import { Container } from '@mui/material';

export const MaxContainer = styled(Container)`
&& {
  max-width: 1100px;
  /* 적응형웹 */
  min-width: 1100px;
  padding-left:0;
  padding-right:0;
  @media (max-width:1440px) {
    max-width: 960px;
    min-width: 960px;
  }
}`;

export const Logo = styled.p<{fontSize : string}>`
&& {
  color: black;
  font-size: ${props => props.fontSize};
  font-family: Anders, Arial, sans-serif;
  margin-bottom: 0;
  cursor: pointer;
}`;
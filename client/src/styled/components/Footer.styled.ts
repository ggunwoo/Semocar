import { styled } from 'styled-components'
import { Button } from '@mui/material'

export const FooterCtn = styled.footer`
&&& {
  width: 100%;
  height: 150px;
  /* margin-top: 200px; */
  background: #F9F9F9;
  .infoWrap {
    width: 700px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}`;
export const FooterBtn = styled(Button)`
&& {
  color: black;
  font-weight: normal;
  margin-left: 18px;
}`;

export const Copyright = styled.div`
&& {
  width: 100%;
  background: #F9F9F9;
  text-align: center;
  .text {
    width: 70%;
    font-size: 12px;
    color: #B8B8B8;
    margin: 0 auto;
    padding: 31px 0 51px;
    border-top: 1px solid #E3E3E3;
  }
}`;
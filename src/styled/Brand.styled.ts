import { styled } from 'styled-components'

export const CheckBoxWrapper = styled.div`
&& {
  width: 100%;
  height: 200px;
  background-color: #fcfcfc;
  border: 1px solid rgba(0,0,0,.2);
  margin-top: 2rem;
  padding: 44px 36px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 20%;
  @media (max-width: 1440px ) {
    padding: 48px 36px;
  }
}`;
export const CheckLine = styled.div`
&& {
  width: 100%;
  display: flex;
  align-items: flex-start;
  .checkTitle {
    width: 5%;
    color: #626262;
    text-align: center;
  }
  .checkBoxs {
    width: 95%;
    .check {
      margin: 0 0 10px 22px;
      /* checkbox */
      .MuiTypography-root {
        font-size: 14px;
        font-family: NotoSans KR light, sans-serif !important;
        margin-left: 4px;
      }
    }
  }
}`;
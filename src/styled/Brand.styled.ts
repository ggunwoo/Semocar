import { styled } from 'styled-components'

export const CheckBoxWrapper = styled.div`
&&& {
  width: 100%;
  height: 100%;
  background-color: #fcfcfc;
  border: 1px solid rgba(0,0,0,.2);
  margin-top: 2rem;
  padding: 36px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 1.125rem;
}`;
export const CheckLine = styled.div`
&&& {
  width: 100%;
  display: flex;
  align-items: flex-start;
  .checkTitle {
    width: 4rem;
    line-height: 2.75rem;
    color: #626262;
    text-align: center;
  }
  .checkBoxs {
    width: 95%;
    .check {
      /* checkbox */
      .MuiTypography-root {
        font-size: 14px;
        font-family: NotoSans KR light, sans-serif !important;
        /* margin-left: 4px; */
      }
    }
  }
}`;
import { styled } from 'styled-components'
import { FormGroup, FormControlLabel} from '@mui/material';

export const FormWraper = styled.div`
&& {
  width: 100%;
  height: 200px;
  background-color: #fcfcfc;
  border: 1px solid rgba(0,0,0,.2);
  margin-top: 2rem;
  padding: 42px 36px 18px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
}`;
export const CheckLine = styled.div`
&& {
  width: 100%;
  display: flex;
  align-items: flex-start;

  /* TEMP */
  /* border: 1px solid #D8D8D8; */
}`;
export const CheckTitle = styled.div`
&& {
  width: 5%;
  /* margin-top: 0.47rem; */
}`;
export const CheckWraper = styled(FormGroup)`
&& {
  width: 95%;
}`;
export const FormControl = styled(FormControlLabel)`
&& {
  margin: 2px 0 8px 14px;
  /* checkbox */
  .MuiTypography-root {
    font-size: 14px;
    font-family: GmarketSans , NotoSans KR, sans-serif !important;
    margin-left: 4px;
  }
}`;
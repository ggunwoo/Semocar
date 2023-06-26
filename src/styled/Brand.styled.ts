import { styled } from 'styled-components'
import { FormGroup, FormControlLabel} from '@mui/material';

export const FormWraper = styled.div`
&& {
  width: 100%;
  height: 200px;
  background-color: #fcfcfc;
  border: 1px solid rgba(0,0,0,.2);
  margin-top: 2rem;
  padding: 4% 36px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 20%;
}`;
export const CheckLine = styled.div`
&& {
  width: 100%;
  display: flex;
  align-items: flex-start;
}`;
export const CheckTitle = styled.div`
&& {
  width: 5%;
  color: #626262;
  text-align: center;
  /* margin-top: 0.47rem; */
}`;
export const CheckWraper = styled(FormGroup)`
&& {
  width: 95%;
}`;
export const FormControl = styled(FormControlLabel)`
&& {
  margin: 2px 0 10px 22px;
  /* checkbox */
  .MuiTypography-root {
    font-size: 14px;
    font-family: NotoSans KR light, sans-serif !important;
    margin-left: 4px;
  }
}`;
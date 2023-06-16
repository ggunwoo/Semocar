import  styled  from 'styled-components'
import {AppBar, Toolbar, Button} from '@mui/material'

export const CustomAppBar = styled(AppBar)`
&& {
  width: 100%;
  background-color: #fff;
  height: 80px;
  /* margin-bottom: 80px; */
  border-bottom: 1px solid #D7D7D7;
  box-shadow: none;
}`;
export const FlexToolbar = styled(Toolbar)`
&& {
  width: 100%;
  height: 80px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width:1440px) {
    padding-left: 20px;
    padding-right: 20px;
  }
}`;
export const CustomStyledButton = styled(Button)`
&& {
  color:black;
  font-size:14px;
  font-weight: normal;
  border-color:black;
  margin-right:24px;
  border-radius:1.25rem;
  &:last-child {
    line-height: 1.25rem;
    margin-right: 0;
    margin-left: 12px;
    &:hover {
      border: 1px solid #FFA30B;
    }
  }
}`;
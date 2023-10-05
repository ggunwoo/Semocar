import  styled  from 'styled-components'
import { Toolbar, Button} from '@mui/material'

export const Header = styled.div`
&&& {
  width: 100%;
  /* background-color: #fff; */
  height: 60px;
  border-bottom: 1px solid #D7D7D7;
  box-shadow: none;
}`;
export const Container = styled.div`
&&& {
  width: 100%;
  height: 60px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}`;
export const CustomStyledButton = styled(Button)`
&&& {
  color:black;
  font-size:14px;
  font-weight: normal;
  font-family: GmarketSans, NotoSans KR, sans-serif;
  border-color:black;
  margin-right:24px;
  border-radius:1.25rem;
  /* &:last-child {
    line-height: 1.25rem;
    margin-right: 0;
    margin-left: 12px;
    &:hover {
      border: 1px solid #BA90FD;
    }
  } */
}`;
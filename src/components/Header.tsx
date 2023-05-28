import React from 'react'
import { useNavigate } from 'react-router-dom';
import  styled  from 'styled-components'
import {AppBar, Toolbar, Button} from '@mui/material'

// STYLED
import { Logo } from '../App';
const CustomAppBar = styled(AppBar)`
&& {
  width: 100%;
  background-color: #fff;
  height: 80px;
  border-bottom: 1px solid #D7D7D7;
  box-shadow: none;
}`;
const FlexToolbar = styled(Toolbar)`
&& {
  width: 100%;
  height: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}`;
const CustomStyledButton = styled(Button)`
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
  }
}`;

export function Header():JSX.Element {
  const navigate = useNavigate();  

  return(
    <>
      <CustomAppBar>
        <FlexToolbar>
          <Logo fontSize='28px' className='logo' onClick={() => { navigate('/') }}>
            SEMO CAR
          </Logo>
          <div>
            <CustomStyledButton variant="text" onClick={() => { navigate('/') }}>홈</CustomStyledButton>
            <CustomStyledButton variant="text" onClick={() => { navigate('/brand') }} >브랜드</CustomStyledButton>
            <CustomStyledButton variant="text">차량목록</CustomStyledButton>
            <CustomStyledButton variant="outlined">로그인</CustomStyledButton>
          </div>
        </FlexToolbar>
      </CustomAppBar>
    </>
  )
}
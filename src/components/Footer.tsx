import React from 'react';
import { styled } from 'styled-components'
import { Button } from '@mui/material'

import { Logo, Blank } from '../App';
const FooterCtn = styled.div`
&& {
  width: 100%;
  height: 150px;
  margin-top: 200px;
  background: #F9F9F9;
  .infoWrap {
    width: 700px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
`
const FooterBtn = styled(Button)`
&& {
  color: black;
  font-weight: normal;
  margin-left: 18px;
}
`

const Copyright = styled.div`
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
}
`

export function Footer():JSX.Element {
  return (
    <>
      <Blank />
      <FooterCtn>
        <div className='infoWrap'>
          <Logo fontSize='32px' >SEMO CAR</Logo>
          <div className='btnGroup'>
            <FooterBtn>Home</FooterBtn>
            <FooterBtn>GitHub</FooterBtn>
            <FooterBtn>Notion</FooterBtn>
            <FooterBtn>Contact</FooterBtn>
          </div>
        </div>
      </FooterCtn>
      <Copyright>
        <p className='text'>
          Copyright &copy; 2023 박건우 포트폴리오 | pgw6541@gmail.com
        </p>
      </Copyright>
    </>
  )
}
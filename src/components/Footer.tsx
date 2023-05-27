import React from 'react';
import { styled } from 'styled-components'
import { Button } from '@mui/material'

const FooterCtn = styled.div`
&& {
  width: 100%;
  height: 150px;
  margin-top: 200px;
  background: #F9F9F9;
  .infoWrap {
    width: 70%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
`
const Logo = styled.h2`
&& {
  font-family: Anders, Arial, sans-serif;
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
      <FooterCtn>
        <div className='infoWrap'>
          <Logo>SEMO CAR</Logo>
          <div>
            <Button>Home</Button>
            <Button>GitHub</Button>
            <Button>Notion</Button>
            <Button>Contact</Button>
          </div>
        </div>
      </FooterCtn>
      <Copyright>
        <p className='text'>
          Copyright © 2023 박건우 포트폴리오 | pgw6541@gmail.com
        </p>
      </Copyright>
    </>
  )
}
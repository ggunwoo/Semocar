import React from 'react';

// STYLED
import { Logo } from '../styled/Global';
import * as S from '../styled/components/Footer.styled'


export function Footer():JSX.Element {
  return (
    <>
      <S.FooterCtn>
        <div className='infoWrap'>
          <Logo fontSize='32px' >SEMO CAR</Logo>
          <div className='btnGroup'>
            <S.FooterBtn>Home</S.FooterBtn>
            <S.FooterBtn>GitHub</S.FooterBtn>
            <S.FooterBtn>Notion</S.FooterBtn>
            <S.FooterBtn>Contact</S.FooterBtn>
          </div>
        </div>
      </S.FooterCtn>
      <S.Copyright>
        <p className='text'>
          Copyright &copy; 2023 박건우 포트폴리오 | pgw6541@gmail.com
        </p>
      </S.Copyright>
    </>
  )
}
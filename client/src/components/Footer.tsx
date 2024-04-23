import React from 'react';
import { useNavigate } from 'react-router-dom';

// STYLED
import { Logo } from '../styled/Global';
import * as S from '../styled/components/Footer.styled'

export function Footer():JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <S.FooterCtn>
        <div className='infoWrap'>
          <Logo fontSize='32px' >SEMO CAR</Logo>
          <div className='btnGroup'>
            <S.FooterBtn onClick={()=>{navigate('/');}}>Home</S.FooterBtn>
            <S.FooterBtn onClick={()=>{window.open('https://github.com/ggunwoo/Semocar');}}>GitHub</S.FooterBtn>
            <S.FooterBtn onClick={()=>{window.open('https://gunw.notion.site/Front-end-0457d968679b49a29c020092b049895a?pvs=4');}}>Notion</S.FooterBtn>
            <S.FooterBtn onClick={()=>{navigate('/');}}>Contact</S.FooterBtn>
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
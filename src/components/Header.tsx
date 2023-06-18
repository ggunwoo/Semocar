import React from 'react'
import { useNavigate } from 'react-router-dom';

// STYLED
import { MaxContainer, Logo } from '../styled/Global';
import * as S from '../styled/components/Header.styled'

export function Header():JSX.Element {
  const navigate = useNavigate();  

  return(
    <>
      {/* <div style={{"height":"80px"}}></div> */}
      <S.Header>
        <MaxContainer>
          <S.FlexToolbar>
            <Logo fontSize='28px' className='logo' onClick={() => { navigate('/') }}>
              SEMO CAR
            </Logo>
            <div>
              <S.CustomStyledButton variant="text" onClick={() => { navigate('/') }}>홈</S.CustomStyledButton>
              <S.CustomStyledButton variant="text" onClick={() => { navigate('/brand') }} >브랜드</S.CustomStyledButton>
              {/* <S.CustomStyledButton variant="text">차량목록</S.CustomStyledButton> */}
              <S.CustomStyledButton variant="outlined">로그인</S.CustomStyledButton>
            </div>
          </S.FlexToolbar>
        </MaxContainer>
      </S.Header>
    </>
  )
}
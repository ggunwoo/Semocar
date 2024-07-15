import "../styles/header.scss";
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
          <S.Container>
            <figure className='logo' onClick={() => { navigate('/') }}>
              <img src={require("../../public/assets/logo-512x512.png")} alt="SEMOCAR" />
            </figure>
            <div>
              <S.CustomStyledButton variant="text" onClick={() => { navigate('/') }}>로그인</S.CustomStyledButton>
            </div>
          </S.Container>
        </MaxContainer>
      </S.Header>
    </>
  )
}
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import styled from 'styled-components';
import * as type from './types/types';

// COMPONENT
import { BrandCar } from './components/BrandCar';
import { BrandNav } from './components/BrandNav';
import { Footer } from './components/Footer';

// PAGES
import { Main } from './pages/main'
import { Detail } from './pages/Detail';
import { Brand } from './pages/Brand';

// STYLED
export const MaxContainer = styled(Container)`
&& {
  max-width: 1100px;
  /* 적응형웹 */
  min-width: 1100px;
  margin-top: 80px;
  padding-left:0;
  padding-right:0;
}
`;
export const Logo = styled.h2<{fontSize : string}>`
&& {
  font-size: ${props => props.fontSize};
  color: black;
  font-family: Anders, Arial, sans-serif;
  cursor: pointer;
}
`
const CustomAppBar = styled(AppBar)`
&& {
  width: 100%;
  background-color: #fff;
  height: 80px;
  border-bottom: 1px solid #D7D7D7;
  box-shadow: none;
  
}
`;
const FlexToolbar = styled(Toolbar)`
&& {
  width: 100%;
  height: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
`;
const CustomStyledButton = styled(Button)`
&& {
  color:black;
  font-size:14px;
  font-weight: normal;
  border-color:black;
  margin-right:24px;
  border-radius:1.25rem;
  
}
`;
function App(): JSX.Element {
  const navigate = useNavigate(); 

  return (
    <>
      <CssBaseline />
      {/* HEADER */}
      <CustomAppBar>
        <FlexToolbar>
          <Logo fontSize='34px' className='logo' onClick={() => { navigate('/'); }}>
            SEMO CAR
          </Logo>
          <div>
            <CustomStyledButton variant="text">Home</CustomStyledButton>
            <CustomStyledButton variant="text">About</CustomStyledButton>
            <CustomStyledButton variant="text">Resources</CustomStyledButton>
            <CustomStyledButton sx={{lineHeight:"1.25rem", marginLeft:"12px"}} variant="outlined">로그인</CustomStyledButton>
          </div>
        </FlexToolbar>
      </CustomAppBar>

      {/* ARTICLE */}
      <Routes>
        <Route path={'/'} element={<Main />} />
        <Route path="/brand" element={<Brand />}>
          <Route path=":id" element={<BrandCar />} />
        </Route>
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import styled from 'styled-components';

// COMPONENT
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// PAGES
import { Main } from './pages/Main'
import { Detail } from './pages/Detail';
import { Brand } from './pages/Brand';

// STYLED
export const MaxContainer = styled(Container)`
&& {
  max-width: 1100px;
  /* 적응형웹 */
  min-width: 1100px;
  padding-left:0;
  padding-right:0;
  @media (max-width:1440px) {
    max-width: 960px;
    min-width: 960px;
    
  }
}`;
export const Logo = styled.h2<{fontSize : string}>`
&& {
  font-size: ${props => props.fontSize};
  color: black;
  font-family: Anders, Arial, sans-serif;
  cursor: pointer;
}`;
export const Blank = styled.div`
&&{
  height: 100px;
}`;
function App(): JSX.Element {
  return (
    <>
      <CssBaseline />
      {/* HEADER */}
      <Header />
      {/* ARTICLE */}
      <Routes>
        <Route path={'/'} element={<Main />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
      {/* FOOTER */}
      <Footer />
    </>
  );
}
export default App;
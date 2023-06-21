import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

// COMPONENT
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// PAGES
import { Main } from './pages/Main'
import { Detail } from './pages/Detail';
import { Brand } from './pages/Brand';

function App(): JSX.Element {
  return (
    <div style={{fontFamily:"GmarketSans, sans-serif"}}>
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
    </div>
  );
}

// color
// dark : #62478f
// deep : #9063FF
// main : #BA90FD
// main : #AB9ADD
// 다음자동차 : #e9eaf1
// light : #E9DCFD
// superlight : #FAF7FF



export default App;
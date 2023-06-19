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

// color
// dark : #5C477D
// deep : #9063FF
// main : #BA90FD
// light : #E9DCFD
// superlight : #FAF7FF


export default App;
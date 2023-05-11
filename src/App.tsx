import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { AllCarsPage } from './pages/AllCars'

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="dark" variant='dark'>
        <Container>
          <Nav>
            <Nav.Link onClick={()=>{ navigate('/')}}>Main</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path={'/'} element={<AllCarsPage />}></Route>
      </Routes>
    </>
  )
}

export default App;

import React from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Detail }from './pages/Detail'
// import * as type from './types/types'
import {RootState} from './store/store'

import { useState } from 'react';
import cars from './api/carData.json';

function App():JSX.Element {
  const navigate = useNavigate();
  const carAllData = useSelector((state :RootState)=> { return state})

  console.log(carAllData.cars)

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
        <Route path={'/'} element={<AllCarsPage />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </>
  )
}

function AllCarsPage():JSX.Element{

  const navigate = useNavigate();
  const carAllData = useSelector((state :RootState)=> { return state})

  // const getAllCars = () => {
  //   const allCars: [] = [];
  //   return allCars
  // };
  
  
  return (
    <>
      {
        carAllData.cars.map((cars)=>(
          <Container>
            <Row>
              <Col>
                <img src={`https://github.com/pgw6541/CarSite/blob/main/src/images/${cars.imgUrl}.jpg?raw=true`} />
              </Col>
            </Row>
          </Container>
        ))
      }
    </>
  )
}

export default App;

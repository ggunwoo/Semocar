import React from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Detail }from './pages/Detail'
// import * as type from './types/types'
import {RootState} from './store/store'

import { useState } from 'react';
import cars from './api/carData.json';

function App() {
  const navigate = useNavigate();
  const [carsData, setData] = useState(cars)

  // console.log(carsData)

  return (
    <>
      <Navbar bg="dark" variant='dark'>
        <Container>
          <Nav>
            <Nav.Link onClick={()=>{ navigate('/')}}>Main</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* <div>{carsData[0].brand.kr}</div> */}

      <Routes>
        <Route path={'/'} element={<AllCarsPage />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </>
  )
}

function AllCarsPage():JSX.Element{

  const navigate = useNavigate();
  // const carAllData = useSelector((state :RootState)=> { return state})

  // console.log(carAllData.cars)

  // const getAllCars = (): type.Car[] => {
  //   const allCars: type.Car[] = [];
  //   carAllData.cars.forEach((brand: type.Brand) => {
  //     brand.segments.forEach((segment: type.Segments) => {
  //       if (segment.cars !== null) { 
  //         allCars.push(...segment.cars);
  //       }
  //     });
  //   });
  //   return allCars;
  // };
  // const allCars = getAllCars();
  // // console.log(allCars)


  return (
    <></>
    // <Container>
    //   <Row xs={6} className="d-flex">
    //       {
    //         allCars.map((car)=>(
    //           <Col className="align-self-center" onClick={()=>{navigate(`/${car.id}`)}} key={car.id}>
    //             <img src={`https://github.com/pgw6541/CarSite/blob/main/src/images/${car.imgUrl}.jpg?raw=true`} alt="CAR" style={{width:"100%"}}/>
    //             {/* <div>{car.krName}</div> */}
    //           </Col>
    //         ))
    //       }
    //   </Row>
    // </Container>
  )
}

export default App;

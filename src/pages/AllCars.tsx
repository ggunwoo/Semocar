// import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import cars from '../api/carData.json';
import { useSelector } from 'react-redux';
import * as type from '../types/types'
import {RootState} from '../store/store'

export function AllCarsPage():JSX.Element{
  
  // const [carAllData, setAllData] = useState(cars);
  const carAllData = useSelector((state :RootState)=> { return state})

  const getAllCars = (): type.Car[] => {
    const allCars: type.Car[] = [];
    carAllData.cars.forEach((brand: type.Brand) => {
      brand.segment.forEach((segment: type.Segment) => {
        if (segment.cars !== null) {
          allCars.push(...segment.cars);
        }
      });
    });
    return allCars;
  };
  const allCars = getAllCars();

  return (
    <Container>
      <Row xs={6} className="d-flex">
          {
            allCars.map((car)=>(
              <Col className="align-self-center">
                <img src={`https://github.com/pgw6541/CarSite/blob/main/src/images/${car.imgUrl}.jpg?raw=true`} alt="CAR" style={{width:"100%"}}/>
                {/* <div>{car.krName}</div> */}
              </Col>
            ))
          }
      </Row>
    </Container>
  )
}
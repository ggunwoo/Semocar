import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import cars from '../api/carData.json';

interface CarType {
  id: number;
  brand: string;
  segment: {
    id: number;
    seg: string;
    car: {
      krname: string,
      enname: string
    }[]
  }[]
}

export function AllCarsPage(){
  const [carData, setCarData] = useState(cars)

  return (
    <>
      <Row>
        {
          carData.map((car) => (
            <Col xs={2} key={car.id}>
              {
                car.segment.map((segment) => (
                  <Card key={segment.id}>
                    {
                      segment.car.map((carDetails) => (
                        <Card.Body key={carDetails.krname}>
                          <Card.Img src={"http://via.placeholder.com/100x80"}/>
                          <Card.Title>{carDetails.krname}</Card.Title>
                        </Card.Body>
                      ))
                    }
                  </Card>
                ))
              }
            </Col>
          ))
        }
      </Row>
    </>
  )
}
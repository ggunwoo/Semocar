import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { RootState } from '../store/store'
import { Container } from '@mui/material'

import * as type from '../types/types'

export function Detail():JSX.Element {

  const carAllData = useSelector((state :RootState)=>{ return state})
  console.log(carAllData.cars)
  

  const {id} = useParams();
  // console.log(id)
  const searchCar = carAllData.cars.find(function(e){ return e.id === Number(id) })
  console.log(searchCar)

  return (
    <Container>
      {
        searchCar === undefined
        ?
        <div> 잘못된 접근입니다.</div>
        :
        <div>
          <img src={`https://github.com/pgw6541/CarSite/blob/main/src/images/${searchCar?.imgUrl}.png?raw=true`} />
          <p>{searchCar?.brand.kr} {searchCar?.name.kr}</p>
          <p>{searchCar?.price.min} ~ {searchCar?.price.max} 만원</p>
          <p>{searchCar?.attribute.fuelType}</p>
          <p>{searchCar?.attribute.displacement}</p>
          <p>{searchCar?.attribute.gasMileage}</p>
          <p>{searchCar?.attribute.power}</p>
          <p>{searchCar?.attribute.torque}</p>
          <p>{searchCar?.attribute.length}</p>
          <p>{searchCar?.attribute.width}</p>
          <p>{searchCar?.attribute.height}</p>
        </div>
      }
    </Container>
  )
}
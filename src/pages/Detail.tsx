import { useParams } from "react-router-dom"
import { Container, Box, Typography, Toolbar } from '@mui/material'
import { useCarData } from '../hook/useCarData'

// import * as type from '../types/types'

export function Detail():JSX.Element {

  const carData = useCarData();
  

  const {id} = useParams();
  console.log(id)
  const searchCar = carData.find(function(e){ return e.id === Number(id) })
  console.log(searchCar)

  return (
    <Container>
      <Toolbar />
      {searchCar === undefined
        ?
        <div> 잘못된 접근입니다.</div>
        :
        <Box sx={{width: "50%", margin:"0 auto", textAlign:"center"}}>
          <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${searchCar.imgUrl}.png`} alt={searchCar?.name.en} />
          <Typography>{searchCar.brand.kr} {searchCar.name.kr}</Typography>
          <Typography>{searchCar.price.min} ~ {searchCar.price.max} 만원</Typography>
          <Typography>{searchCar.attribute.fuelType}</Typography>
          <Typography>{searchCar.attribute.displacement}</Typography>
          <Typography>{searchCar.attribute.gasMileage}</Typography>
          <Typography>{searchCar.attribute.power}</Typography>
          <Typography>{searchCar.attribute.torque}</Typography>
          <Typography>{searchCar.attribute.length}</Typography>
          <Typography>{searchCar.attribute.width}</Typography>
          <Typography>{searchCar.attribute.height}</Typography>
        </Box>
      }
    </Container>
  )
}
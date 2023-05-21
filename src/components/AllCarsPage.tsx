import { Container, Box } from '@mui/material';
import { useCarData } from '../hook/useCarData'

import * as type from '../types/types'

export function AllCarsPage():JSX.Element{

  const carData = useCarData();
  
  return (
    <Container className="img_container" maxWidth={false}>
        {carData.map((cars: type.Cars)=>(
          <Box className="img_wrap" key={cars.id}>
            <img className="carImg" src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${cars.imgUrl}.png`} alt={cars.name.en} />
          </Box>
        ))}
    </Container>
  )
}


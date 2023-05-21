import { Container, Box } from '@mui/material';
import { useCarData } from '../hook/useCarData'
import { useNavigate } from 'react-router-dom';

import * as type from '../types/types'

export function AllCarsPage():JSX.Element{
  const navigate = useNavigate();
  const carData = useCarData();
  
  return (
    <Container className="img_container" maxWidth={false}>
        {carData.map((cars: type.Cars)=>(
          <Box className="img_wrap" key={cars.id} onClick={()=>{ navigate(`/detail/${cars.id}`)}}>
            <img className="carImg" src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${cars.imgUrl}.png`} alt={cars.name.en} />
          </Box>
        ))}
    </Container>
  )
}


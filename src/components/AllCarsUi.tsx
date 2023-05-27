import { Container, Box, ButtonGroup, Button } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import { useCarData } from '../hook/useCarData';
import { useCarBrands } from '../hook/useCarData';

import * as type from '../types/types'

// IMPORT COMPONENT


export function AllCarsUi():JSX.Element{
  const navigate = useNavigate();
  const carData = useCarData();
  const carBrands = useCarBrands();

  return (
    <Container maxWidth={false}>
      {/* LOGO Nav */}
      <Box>
          <ButtonGroup size="large">
            {carBrands.map((brand):JSX.Element => (
              <Button key={brand.id} onClick={()=>{navigate(`/brand/${brand.id}`)}} variant='text'>
                <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${brand.imgUrl}.png`} alt={brand.name.en} />
                {/* {brand.name.kr} */}
              </Button>
            ))}
          </ButtonGroup>
      </Box>
        
        {carData.map((cars: type.Cars)=>(
          <Box key={cars.id}>
            <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${cars.imgUrl}.png`} alt={cars.name.en} />
          </Box>
        ))}

        <Outlet></Outlet>

    </Container>
  )
}


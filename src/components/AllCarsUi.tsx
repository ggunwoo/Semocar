import { Container, Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { ButtonGroup, Button } from '@mui/material';

import { useCarData } from '../hook/useCarData';
import { useCarBrands } from '../hook/useCarData';

import * as type from '../types/types'

// IMPORT COMPONENT


export function AllCarsUi():JSX.Element{
  const navigate = useNavigate();
  const carData = useCarData();
  const carBrands = useCarBrands();

  return (
    <Container className="img_container" maxWidth={false}>
      {/* LOGO Nav */}
      <Box className='nav'>
          <ButtonGroup size="large">
            {carBrands.map((brand):JSX.Element => (
              <Button className='brand_btn' key={brand.id} onClick={()=>{navigate(`/brand/${brand.id}`)}} variant='text'>
                <img className="img" src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${brand.imgUrl}.png`} alt={brand.name.en} />
                {/* {brand.name.kr} */}
              </Button>
            ))}
          </ButtonGroup>
      </Box>
        
        {carData.map((cars: type.Cars)=>(
          <Box className="img_wrap" key={cars.id} onClick={()=>{ navigate(`/detail/${cars.id}`)}}>
            <img className="carImg" src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${cars.imgUrl}.png`} alt={cars.name.en} />
          </Box>
        ))}

        <Outlet></Outlet>

    </Container>
  )
}


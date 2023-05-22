import { useNavigate } from 'react-router-dom';
import { useCarBrands } from '../hook/useCarData';
import { Container, Box, ButtonGroup, Button } from '@mui/material';

export function BrandNav () {
  
  const navigate = useNavigate();
  const carBrands = useCarBrands();

  return (
    <Container>
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
    </Container>
  )
}
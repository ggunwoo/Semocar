import { useNavigate, useParams } from 'react-router-dom'
import { Container, Typography, Box } from '@mui/material'
import { useCarData, useCarBrands } from '../hook/useCarData'
import { styled } from 'styled-components';

// STYLED
const CarBox  = styled(Box)`
&& {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .carImg {
    width: 150px;
  }
}
`;

export function BrandCar(){

  const navigate = useNavigate();

  const carData = useCarData();
  const carBrands = useCarBrands();

  const {id} = useParams();
  const searchBrand = carBrands.find(function(e){ return e.id === Number(1) }) ;
  const sameData = searchBrand ? carData.filter((e) => e.brand.en === searchBrand.name.en) : [];
  // console.log(id)
  // console.log(searchBrand)

  return (
    <Container>
      <Typography variant="h2">{searchBrand?.name.kr}</Typography>
      <CarBox>
        {
          sameData.length === 0
          ?
          <div>해당 브랜드의 차 데이터가 없습니다.</div>
          :
          sameData.map((cars) => (
            <Box className="img_wrap" key={cars.id} onClick={()=>{ navigate(`/Detail/${cars.id}`)}}>
              <img
                className="carImg"
                src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${cars.imgUrl}.png`}
                alt={cars.name.en}
              />
            </Box>
          ))
          
        }
      </CarBox>
    </Container>
  )
}
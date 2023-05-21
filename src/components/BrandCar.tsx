import { useParams } from 'react-router-dom'
import { Container, Typography, Box } from '@mui/material'
import { useCarData, useCarBrands } from '../hook/useCarData'

export function Brand(){

  const carData = useCarData();
  const carBrands = useCarBrands();

  const {id} = useParams();
  const searchBrand = carBrands.find(function(e){ return e.id === Number(id) }) ;
  const sameData = searchBrand ? carData.filter((e) => e.brand.en === searchBrand.name) : [];

  return (
    <Container className="brand_container">
      <Typography variant="h2">{searchBrand?.name}</Typography>
      <Box className='list_container'>
        {
          sameData.length !== 0
          ?
          sameData.map((cars) => (
            <Box className="img_wrap" key={cars.id}>
              <img
                className="carImg"
                src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${cars.imgUrl}.png`}
                alt={cars.name.en}
              />
            </Box>
          ))
          :
          <div>해당 브랜드의 차 데이터가 없습니다.</div>
        }
      </Box>
    </Container>
  )
}
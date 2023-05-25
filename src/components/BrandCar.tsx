import { useNavigate, useParams } from 'react-router-dom'
import { Container, Typography, Box } from '@mui/material'
import { useCarData, useCarBrands } from '../hook/useCarData'

export function BrandCar(){

  const navigate = useNavigate();

  const carData = useCarData();
  const carBrands = useCarBrands();

  const {id} = useParams();
  const searchBrand = carBrands.find(function(e){ return e.id === Number(id) }) ;
  const sameData = searchBrand ? carData.filter((e) => e.brand.en === searchBrand.name.en) : [];
  console.log(id)
  console.log(searchBrand)

  return (
    <Container className="brand_container">
      <Typography variant="h2">{searchBrand?.name.kr}</Typography>
      <Box className='list_container'>
        {
          sameData.length === 0
          ?
          <div>해당 브랜드의 차 데이터가 없습니다.</div>
          :
          sameData.map((cars) => (
            <Box className="img_wrap" key={cars.id} onClick={()=>{ navigate(`/detail/${cars.id}`)}}>
              <img
                className="carImg"
                src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${cars.imgUrl}.png`}
                alt={cars.name.en}
              />
            </Box>
          ))
          
        }
      </Box>
    </Container>
  )
}
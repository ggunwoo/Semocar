import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Container, Typography, Box } from '@mui/material'

export function Brand(){

  const carAllData = useSelector((state: RootState)=> state)

  const {id} = useParams();
  const searchBrand = carAllData.brands.find(function(e){ return e.id === Number(id) }) ;
  // const sameData = searchBrand?.find((e)=> e.name === carAllData.cars.brand.en );
  const sameData = searchBrand ? carAllData.cars.filter((e) => e.brand.en === searchBrand.name) : [];

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
                src={`https://github.com/pgw6541/CarSite/blob/main/src/images/${cars.imgUrl}.png?raw=true`}
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
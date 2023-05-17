import './main.scss';
// import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline ,Container, Box, AppBar, Toolbar, Typography, ButtonGroup, Button } from '@mui/material';
// import * as type from './types/types'

import { Detail }from './pages/Detail';
import { Brand }from './pages/BrandCar';
// import cars from './api/carData.json';


function App():JSX.Element {
  const navigate = useNavigate();
  const carAllData = useSelector((state :RootState)=> state);
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#000000'
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{width: "100%"}}
      >
        <Toolbar className='ToolBar'>
          <Typography className="Toolbar_title" variant="h5" noWrap component="div" color='secondary' onClick={()=>{navigate('/')}}>
            붕붕
          </Typography>
          <ButtonGroup className='Toolbar_btns' color='secondary' >
            <Button variant="text">Home</Button>
            <Button variant="text">About</Button>
            <Button variant="text">Resources</Button>
            <Button variant="text">Contact</Button>
            <Button variant="outlined">로그인</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      
      <Box className='nav'>
        <Container className='nav_container'>
          <Typography variant="h3" className='navTitle'>Domaestic Cars</Typography>
          <ButtonGroup size="large">
            {carAllData.brands.map((brand):JSX.Element=>(
              <Button key={brand.id} onClick={()=>{navigate(`/brand/${brand.id}`)}} className='brand_btn' variant='text'>{brand.name}</Button>
            ))}
          </ButtonGroup>
        </Container>
      </Box>
    
      <Routes>
        <Route path={'/'} element={<AllCarsPage />} />
        <Route path='/brand/:id' element={<Brand />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
      </ThemeProvider>
  )
}

function AllCarsPage():JSX.Element{
  // const navigate = useNavigate();
  const carAllData = useSelector((state :RootState)=> { return state})
  
  return (
    <Container className="img_container" maxWidth={false}>
        {carAllData.cars.map((cars)=>(
          <Box className="img_wrap" key={cars.id}>
            <img className="carImg" src={`https://github.com/pgw6541/CarSite/blob/main/src/images/${cars.imgUrl}.png?raw=true`} alt={cars.name.en} />
          </Box>
        ))}
    </Container>
  )
}

export default App;

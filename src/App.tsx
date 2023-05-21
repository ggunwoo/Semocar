import React from 'react';
import './main.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline ,Container, Box, AppBar, Toolbar, Typography, ButtonGroup, Button } from '@mui/material';
import { useCarBrands } from './hook/useCarData';
// import * as type from './types/types'

// pages 
import { AllCarsPage } from './components/AllCarsPage';
import { Brand } from './components/BrandCar';
import { Detail } from './components/Detail';


function App():JSX.Element {
  const navigate = useNavigate();

  const carBrands = useCarBrands();
  console.log(carBrands)
  
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
            Logo
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
            {carBrands.map((brand):JSX.Element=>(
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
export default App;
import React from 'react';
import './main.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CssBaseline ,Container, Box, Grid, AppBar, Toolbar, Typography, ButtonGroup, Button } from '@mui/material';
import { useCarBrands } from './hook/useCarData';
// import * as type from './types/types'

// PAGES
import { Detail } from './pages/Detail';
import { Brand } from './pages/Brand'

// COMPONENT
import { AllCarsUi } from './components/AllCarsUi';
import { BrandCar } from './components/BrandCar';
import { BrandNav } from './components/BrandNav';


function App():JSX.Element {
  const navigate = useNavigate();

  return (
    <Container className='container'>
      <AppBar className='AppBar'>
        <Toolbar className='ToolBar container'>
          <Typography className="Toolbar_title" variant="h5" noWrap component="div" color='secondary' onClick={()=>{navigate('/')}}>
            Logo
          </Typography>
          <ButtonGroup className='Toolbar_btns' color='secondary' >
            <Button variant="text">Home</Button>
            <Button variant="text">About</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      
      <Routes>
        <Route path={'/'} element={<BrandNav />} />
        <Route path='/brand' element={<Brand />} >
          <Route path=':id' element={<BrandCar />} />
        </Route>
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </Container>
  )
}
export default App;
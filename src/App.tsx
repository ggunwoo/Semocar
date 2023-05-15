import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Box, Grid, AppBar, Drawer, Toolbar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, CssBaseline } from '@mui/material';
import { DirectionsCar } from '@mui/icons-material';
import theme from './theme';

// import * as type from './types/types'
import { Detail }from './pages/Detail';
import cars from './api/carData.json';


function App():JSX.Element {
  const navigate = useNavigate();
  const carAllData = useSelector((state :RootState)=> { return state});
  const drawerWidth = "200px";

  return (
      <Box>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme)=> theme.zIndex.drawer+1}}>
          <Toolbar>
            <Typography variant="h6" component="div">
              main
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box"}
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto"}}>
            <List>
              <ListItem key={"car"} disablePadding>
                <ListItemButton onClick={()=>{ navigate("/") }}>
                  <ListItemIcon><DirectionsCar /></ListItemIcon>
                  <ListItemText primary={"Main"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        
        <Routes>
          <Route path={'/'} element={<AllCarsPage />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Box>
  )
}

function AllCarsPage():JSX.Element{

  const navigate = useNavigate();
  const carAllData = useSelector((state :RootState)=> { return state})

  // const getAllCars = () => {
  //   const allCars: [] = [];
  //   return allCars
  // };
  
  
  return (
    <Container sx={{maxWidth:"1100px"}} maxWidth={false}>
      <Toolbar sx={{marginBottom : "100px"}} />
        {
          carAllData.cars.map((cars)=>(
            <Grid container>
              <Grid xs={6} item  key={cars.id}>
                <img style={{width:"200px"}} src={`https://github.com/pgw6541/CarSite/blob/main/src/images/${cars.imgUrl}.png?raw=true`} />
              </Grid>
              <Grid xs={6} item sx={{textAlign: "center"}}>
                <Typography onClick={()=>{ navigate(`/detail/${cars.id}`); }}>{cars.brand.kr} {cars.name.kr}</Typography>
              </Grid>
            </Grid>
          ))
        }
    </Container>
  )
}

export default App;

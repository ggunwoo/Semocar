import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { Container, Box, Grid, AppBar, Drawer, Toolbar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, CssBaseline, Button } from '@mui/material';
import { DirectionsCar } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import * as type from './types/types'

import './css/App.scss';
import { Detail }from './pages/Detail';
// import cars from './api/carData.json';


function App():JSX.Element {
  const navigate = useNavigate();
  // const carAllData = useSelector((state :RootState)=> { return state});
  const [mobileOpen, setMobileOpen] = useState(false)
  const drawerWidth = "200px";
  console.log(drawerWidth)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const drawer :JSX.Element = (
    <Box>
      <List>
        <ListItem key={"car"} disablePadding>
          <ListItemButton onClick={()=>{ navigate("/") }}>
            <ListItemIcon><DirectionsCar /></ListItemIcon>
            <ListItemText primary={"Main"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <div>
      <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>

    <CssBaseline />
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{ [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box"}, display: {xs:"block", md:"none"} }}
      >
        {drawer}
      </Drawer>
      <Drawer 
        variant='permanent'
        sx={{ [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box"}, display: {xs:"none", md:"block"} }}
      >
        {drawer}
      </Drawer>
      
      <Routes>
        <Route path={'/'} element={<AllCarsPage drawerWidth={drawerWidth} />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  )
}

function AllCarsPage(props: type.AllCarsPageProps):JSX.Element{
  const navigate = useNavigate();
  const carAllData = useSelector((state :RootState)=> { return state})
  
  return (
    <Container sx={{width : {xs: '100%', md:`calc(100% - ${props.drawerWidth})`}, marginTop:"64px", marginRight:"0"}} maxWidth={false}>
        {
          carAllData.cars.map((cars)=>(
            <Grid container className="grid_wrap" key={cars.id}>
              <Grid item className="img" xs={6} md={5} lg={4} xl={2}>
                <img className="carImg" src={`https://github.com/pgw6541/CarSite/blob/main/src/images/${cars.imgUrl}.png?raw=true`} alt={cars.name.en} />
              </Grid>
              <Grid item className="info" xs={6} md={7} lg={8} xl={10}>
                <Typography>{cars.segment}</Typography>
                <Typography>{cars.brand.kr} {cars.name.kr}</Typography>
              </Grid>
              <Grid container className="btn_group" xs={12}>
                <Button onClick={()=>{ navigate(`/detail/${cars.id}`)}}>상세정보 &gt; </Button>
              </Grid>
            </Grid>
          ))
        }
    </Container>
  )
}

export default App;

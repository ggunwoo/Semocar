import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import { useCarData } from '../hook/useCarData'
import { Container, Box, Toolbar } from '@mui/material'
// import * as type from '../types/types'


export function Detail():JSX.Element {
  const carData = useCarData();
  const {id} = useParams();
  const searchCar = carData.find(function(e){ return e.id === Number(id) })
  
  console.log(id)
  console.log(searchCar)
  console.log(searchCar?.attribute)

  const [tempState, setTempState] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
  const [tempEngState, setTempEngState] = useState(["A","B","C","D","E","F","G","H","I","J","K","L","N","M","O","P","Q","R","S","T"])

  return (
    <Container>
      <Toolbar />
      {searchCar === undefined
        ?
        <div> 잘못된 접근입니다.</div>
        :
        <Box sx={{width: "50%", margin:"0 auto", textAlign:"center"}}>
          <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${searchCar.imgUrl}.png`} alt={searchCar?.name.en} />
          <Container sx={{ height:"250px" ,display:"flex", flexWrap:"wrap", flexDirection:"column", justifyContent:"flex-start", alignContent:"space-between"}}>
              {/* {
                tempState.map((a)=>(
                  <dl>
                    {
                      tempState.map((a)=>(
                        <dt>{a+100}</dt>
                        ))
                    }{
                      tempState.map((a)=>(
                        <dd>{a+10}</dd>
                      ))
                    }
                  </dl>
                ))
              } */}
          </Container>
        </Box>
      }
    </Container>
  )
}
import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import { useCarData } from '../hook/useCarData'
import { Chip } from '@mui/material'
import { styled } from 'styled-components' 

// STYLED
import { MaxContainer, Blank } from '../App' 
const BgBox = styled.div`
&& {
  width: 100%;
  background-color: #e9e9e9;
}`;
const TitleBox = styled.div`
&& {
  width: 100%;
  height: 300px;
  margin-top: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}`;
const InfoBox = styled.div`
&& {
  div.brand {}
  div.name {}
  p.price {
    color: #FFA30B;
    font-weight: bold;
    font-size: 1.25rem;
    line-height: 2rem;
    letter-spacing: 0.175rem;
  }
}`;
const StyledChip = styled(Chip)`
&& {
  margin-right: 8px;
}`;
const ImgBox = styled.div`
&& {
  
}`;


export function Detail():JSX.Element {
  const carData = useCarData();
  const {id} = useParams();
  const searchCar = carData.find(function(e){ return e.id === Number(id) })

  const minPrice = (searchCar?.price.min)?.toLocaleString('ko-KR')
  const maxPrice = (searchCar?.price.max)?.toLocaleString('ko-KR')
  
  console.log(id)
  console.log(searchCar)

  return (
    <>
      <BgBox>
        {searchCar === undefined
          ?
          <div>해당차량의 정보가 없거나 잘못된 접근입니다.</div>
          :
        <MaxContainer>
          <TitleBox>
            <InfoBox>
              <h5 className='brand'>{searchCar.brand.kr}</h5>
              <h1 className='name'>{searchCar.name.kr}</h1>
              <p className='price'>{minPrice} ~ {maxPrice} 만원</p>
              <StyledChip label={`${searchCar.segment}`} variant='outlined' />
              <StyledChip label={`${searchCar.fuelTypes}`} variant='outlined' />
              <StyledChip label={`${searchCar.gasMileage}`} variant='outlined' />
            </InfoBox>
            <ImgBox>
              <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${searchCar.imgUrl}.png`} alt={searchCar?.name.en} />
            </ImgBox>
          </TitleBox>
        </MaxContainer>}
      </BgBox>
    </>
  )
}
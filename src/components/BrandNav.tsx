import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Avatar } from '@mui/material';
import { styled } from 'styled-components';
import { useCarBrands } from '../hook/useCarData';
import { useAppSelector, useAppDispatch } from '../store/hooks';

import {
  brandIn,
  brandReset,
} from '../store/carFilter'

import {
  toggleHandler,
  toggleReset,
} from '../store/brandNav'


// STYLED
import { MaxContainer, Blank } from '../App';
const FlexBox = styled(Box)`
&& {
  display:flex;
  margin-top: 2rem;
  justify-content: space-evenly;
  align-items: center;
  .clicked {
    /* color: #FFF; */
    /* background-color: rgb(243, 227, 84, .4); */
    border-bottom: 4px solid #FFA30B;
    border-radius: 0 !important;
  }
  :hover > .imgBox{
    display: none;
  }
  :hover > .logoName{
    display: block;
  }
}`;
const LogoButton = styled(Button)`
&& {
  &:hover {
    border-bottom: 4px solid #FFA30B;
  }
  width: 120px;
  height: 60px;
  /* border-radius: 20px; */
  :hover {}
}`;
const ImageBox = styled.div`
&& {
  display: block;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
}`;
const LogoName = styled.p`
&& {
  color: #FFA30B;
  font-size: 14px;
  font-weight: bold;
  margin: auto 0;
  display: none;
}`;

export function BrandNav () {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const carBrands = useCarBrands();
  
  
  // const selectedBrand = useAppSelector((state)=> state.selectedBrand )
  // const brand = ['현대', '기아', 'KG', '제네시스', '르노코리아', '쉐보레']
  // const [toggle, setToggle] = useState(Array(brand.length).fill(false));
  const toggle = useAppSelector((state)=>{ return state.toggle })

  const brandHandler = (brand:string, index: number) => {
    dispatch(brandIn(brand));
    dispatch(toggleHandler(index));
  }
  const brandAll = () => {
    dispatch(brandReset());
    dispatch(toggleReset())
  }

  return (
    <MaxContainer>
      <FlexBox>
        {carBrands.map((brand, index):JSX.Element => (
          <LogoButton
            key={brand.id} 
            className={`${ toggle[index] ? 'clicked' : null}` }
            onClick={()=>{brandHandler(brand.name.kr, index); navigate(`/brand`);} } 
            variant='text'
          >
            <ImageBox className='imgBox'>
              <img style={{width:"40px"}} src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${brand.imgUrl}.png`} alt={brand.name.en} />
            </ImageBox>
            <LogoName className='logoName'>{brand.name.kr}</LogoName>
          </LogoButton>
        ))}
        <LogoButton onClick={()=>{brandAll(); navigate(`/brand`)}}>
          <ImageBox className='imgBox'>
            <img style={{width:"40px"}} src={`https://via.placeholder.com/40x40`} alt='ICON' />
          </ImageBox>
          <LogoName className='logoName'>전체보기</LogoName>
        </LogoButton>
      </FlexBox>
    </MaxContainer>
  )
}
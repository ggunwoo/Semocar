import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import { useCarData } from '../hook/useCarData'
import { Chip, Button, ButtonGroup } from '@mui/material'
import { styled } from 'styled-components' 

// STYLED
import { MaxContainer } from '../styled/global' 
const BgBox = styled.div`
&& {
  width: 100%;
  background-color: #e9e9e9;
}`;
const TitleBox = styled.div`
&& {
  width: 100%;
  height: 400px;
  margin-top: 80px;
  background-color: #e2e2e2;
  display: flex;
  justify-content: space-around;
  align-items: center;
}`;
const InfoBox = styled.div`
&& {
  h5.brand {
    font-size: 1.125rem;
    margin-bottom: 0 !important;
    font-weight: bold;
  }
  h1.name {
    font-size: 3.75rem;
  }
  p.price {
    color: #FFA30B;
    font-weight: bold;
    font-size: 1.25rem;
    line-height: 2rem;
    letter-spacing: 0.125rem;
  }
}`;
const StyledChip = styled(Chip)`
&& {
  margin-right: 10px;
}`;
const ImgBox = styled.div`
&& {

}`;

const StyledBtnGroup = styled(ButtonGroup)`
&& {
  margin-top: 50px;
}`;
const StyledBtn = styled(Button)`
&& {
  color: black;
  border-color: black;
  transition: all 1;
  &.clicked {
    color: white;
    background-color: black;
  }
}`;
const MoreInfo = styled.div`
&& {
  width: 100%;
  border: 1px solid black;
}`;
const FormDl = styled.dl`
&& {
  display: flex;
  flex-wrap: wrap;
}`;
const FormDt = styled.dt`
&& {
  width: 10%;
  height: 100%;
}`;
const FormDd = styled.dd`
&& {
  width: 90%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;

}`;
const ChipBtn = styled.div`
&& {
  padding: 5px 10px;
  border: 1px solid #d8d8d8;
  border-radius: 1.5em;
}`;


export function Detail():JSX.Element {
  const carData = useCarData();
  const {id} = useParams();
  const searchCar = carData.find((e) => e.id === Number(id))
  const ifElectric = searchCar?.fuelTypes.includes('전기')

  const minPrice = (searchCar?.price.min)?.toLocaleString('ko-KR')
  const maxPrice = (searchCar?.price.max)?.toLocaleString('ko-KR')
  const [ClickCheck, setClickCheck] = useState([true, false, false]);
  const [selectGrade, segSelectGrade] = useState(0)
  const [selectTrim, segSelectTrim] = useState(0)

  const BtnClick = (index: number) => {
    setClickCheck(ClickCheck.fill(false))
    const copyCheck = [...ClickCheck]
    copyCheck[index] = !copyCheck[index]
    setClickCheck(copyCheck);
  }

  return (
    <>
    {/* 상단 Article */}
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
              {
                minPrice === '-' && maxPrice === '-'
                ?
                <p>가격정보없음</p>
                :
                <p className='price'>{minPrice} ~ {maxPrice} 만원</p>
              }
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

      <MaxContainer sx={{height: '1000px'}}>
        {/* 스크롤탭 */}
        <StyledBtnGroup>
          {[{'name':'상세정보'},{'name':'포토'},{'name':'댓글'}].map((item, index)=>(
            <StyledBtn key={item.name} className={`${ClickCheck[index] ? 'clicked' : 'unclick'}`} onClick={()=>{BtnClick(index)}}>{item.name}</StyledBtn>
          ))}
        </StyledBtnGroup>
        <MoreInfo>
          <form action="#">
            <FormDl>
              <FormDt>등급</FormDt>
              <FormDd>
                {searchCar?.grades.map((grade, index)=>(
                  <ChipBtn key={index} onClick={()=>{segSelectGrade(index)}}>{grade.name}</ChipBtn>
                ))}
              </FormDd>
            </FormDl>
            <FormDl>
              <FormDt>트림</FormDt>
              <FormDd>
                {searchCar?.grades[selectGrade].trims.map((trim, index)=>(
                  <ChipBtn key={trim.name} onClick={()=>{segSelectTrim(index)}}>{trim.name}</ChipBtn>
                ))}
              </FormDd>
            </FormDl>
          </form>
        </MoreInfo>
      </MaxContainer>
    </>
  )
}
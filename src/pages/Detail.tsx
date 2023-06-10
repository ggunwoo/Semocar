import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import { useCarData } from '../hook/useCarData'

// STYLED
import { MaxContainer } from '../styled/Global'
import * as S from '../styled/Detail.styled'

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
      <S.BgBox>
        {searchCar === undefined
          ?
          <div>해당차량의 정보가 없거나 잘못된 접근입니다.</div>
          :
        <MaxContainer>
          <S.TitleBox>
            <S.InfoBox>
              <h5 className='brand'>{searchCar.brand.kr}</h5>
              <h1 className='name'>{searchCar.name.kr}</h1>
              {
                minPrice === '-' && maxPrice === '-'
                ?
                <p>가격정보없음</p>
                :
                <p className='price'>{minPrice} ~ {maxPrice} 만원</p>
              }
              <S.StyledChip label={`${searchCar.segment}`} variant='outlined' />
              <S.StyledChip label={`${searchCar.fuelTypes}`} variant='outlined' />
              <S.StyledChip label={`${searchCar.gasMileage}`} variant='outlined' />
            </S.InfoBox>
            <S.ImgBox>
              <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${searchCar.imgUrl}.png`} alt={searchCar?.name.en} />
            </S.ImgBox>
          </S.TitleBox>
        </MaxContainer>}
      </S.BgBox>

      <MaxContainer sx={{height: '1000px'}}>
        {/* 스크롤탭 */}
        <S.StyledBtnGroup>
          {[{'name':'상세정보'},{'name':'포토'},{'name':'댓글'}].map((item, index)=>(
            <S.StyledBtn key={item.name} className={`${ClickCheck[index] ? 'clicked' : 'unclick'}`} onClick={()=>{BtnClick(index)}}>{item.name}</S.StyledBtn>
          ))}
        </S.StyledBtnGroup>
        <S.MoreInfo>
          <form action="#">
            <S.FormDl>
              <S.FormDt>등급</S.FormDt>
              <S.FormDd>
                {searchCar?.grades.map((grade, index)=>(
                  <S.ChipBtn key={index} onClick={()=>{segSelectGrade(index)}}>{grade.name}</S.ChipBtn>
                ))}
              </S.FormDd>
            </S.FormDl>
            <S.FormDl>
              <S.FormDt>트림</S.FormDt>
              <S.FormDd>
                {searchCar?.grades[selectGrade].trims.map((trim, index)=>(
                  <S.ChipBtn key={trim.name} onClick={()=>{segSelectTrim(index)}}>{trim.name}</S.ChipBtn>
                ))}
              </S.FormDd>
            </S.FormDl>
          </form>
        </S.MoreInfo>
      </MaxContainer>
    </>
  )
}
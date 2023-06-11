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
  
  const minPrice = (searchCar?.price.min)?.toLocaleString('ko-KR')
  const maxPrice = (searchCar?.price.max)?.toLocaleString('ko-KR')
  const [ClickCheck, setClickCheck] = useState([true, false, false]);
  const [selectGrade, segSelectGrade] = useState(0)
  const [selectTrim, segSelectTrim] = useState(0)
  const choosed = searchCar?.grades[selectGrade].trims[selectTrim];
  const choosedElectric = choosed?.fuelType === '전기';
  const choosedHybrid = choosed?.fuelType === '하이브리드';

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
          {/* FORM */}
          <form action="#">
            <S.FormDl>
              <S.FormDt>등급</S.FormDt>
              <S.FormDd>
                {searchCar?.grades.map((grade, index)=>(
                  <S.ChipBtn key={index} onClick={()=>{segSelectGrade(index); segSelectTrim(0)}}>{grade.name}</S.ChipBtn>
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
          
          {/* INFO */}
          <S.PriceDl>
            <S.PriceDt>가격</S.PriceDt>
            <S.PriceDd>
              <h2>{choosed?.price.toLocaleString('ko-KR')} <span>만원</span></h2>
            </S.PriceDd>
          </S.PriceDl>
          
          {/* SPAC */}
          <S.SpacDl>
            <S.SpacDt>제원</S.SpacDt>

            {/* 가솔린, 디젤, LPG */}
            {(choosed?.fuelType === '가솔린' || choosed?.fuelType === '디젤' || choosed?.fuelType ==='LPG') &&
              <S.SpacDd>
              {/* OPTION 1LINE */}
              <S.OptionDl>
                <S.OptionDt>연료</S.OptionDt>
                <S.OptionDd>{choosed?.fuelType}</S.OptionDd>
                <S.OptionDt>엔진형식</S.OptionDt>
                <S.OptionDd>{choosed?.engine}</S.OptionDd>
                <S.OptionDt>배기량</S.OptionDt>
                <S.OptionDd>{choosed?.displacement}</S.OptionDd>
                <S.OptionDt>변속기</S.OptionDt>
                <S.OptionDd>{choosed?.transMission}</S.OptionDd>
                <S.OptionDt>구동방식</S.OptionDt>
                <S.OptionDd>{choosed?.drivingSystem}</S.OptionDd>
                <S.OptionDt>최고출력</S.OptionDt>
                <S.OptionDd>{choosed?.power}</S.OptionDd>
                <S.OptionDt>최대토크</S.OptionDt>
                <S.OptionDd>{choosed?.torque}</S.OptionDd>
                <S.OptionDt>최고속도</S.OptionDt>
                <S.OptionDd>-</S.OptionDd>
                {/* <S.OptionDd>{choosed?.}</S.OptionDd> */}
              </S.OptionDl>

              {/* OPTION 2LINE */}
              <S.OptionDl>
                <S.OptionDt>연비등급</S.OptionDt>
                <S.OptionDd>{choosed?.ratingGasMileage}</S.OptionDd>
                <S.OptionDt>복합연비</S.OptionDt>
                <S.OptionDd>{choosed?.complexGasMileage}</S.OptionDd>
                <S.OptionDt>도심연비</S.OptionDt>
                <S.OptionDd>{choosed?.urbanGasMileage}</S.OptionDd>
                <S.OptionDt>고속도로연비</S.OptionDt>
                <S.OptionDd>{choosed?.highwayGasMileage}</S.OptionDd>
                <S.OptionDt>저공해등급</S.OptionDt>
                <S.OptionDd>{choosed?.lowEmission}</S.OptionDd>
                <S.OptionDt>공차중량</S.OptionDt>
                <S.OptionDd>{choosed?.vehicleWeight}</S.OptionDd>
                <S.OptionDt>자율주행 레벨</S.OptionDt>
                <S.OptionDd>{choosed?.autoLevel}</S.OptionDd>
                <S.OptionDt>제로백</S.OptionDt>
                <S.OptionDd>zero100</S.OptionDd>
                {/* <S.OptionDd>{choosed?.}</S.OptionDd> */}
              </S.OptionDl>

              {/* OPTION 3LINE */}
              <S.OptionDl>
                <S.OptionDt>앞타이어규격</S.OptionDt>
                <S.OptionDd>{choosed?.frontTire}</S.OptionDd>
                <S.OptionDt>뒷타이어규격</S.OptionDt>
                <S.OptionDd>{choosed?.rearTire}</S.OptionDd>
                <S.OptionDt>전륜브레이크</S.OptionDt>
                <S.OptionDd>{choosed?.frontSuspension}</S.OptionDd>
                <S.OptionDt>후륜브레이크</S.OptionDt>
                <S.OptionDd>{choosed?.rearSuspension}</S.OptionDd>
                <S.OptionDt>전륜서스펜션</S.OptionDt>
                <S.OptionDd>{choosed?.frontBrake}</S.OptionDd>
                <S.OptionDt>후륜서스펜션</S.OptionDt>
                <S.OptionDd>{choosed?.rearBrake}</S.OptionDd>
                <S.OptionDt>탑승정원</S.OptionDt>
                <S.OptionDd>{choosed?.capacity}</S.OptionDd>
              </S.OptionDl>

              </S.SpacDd>}

            {/* 하이브리드 */}
            {choosed?.fuelType === '하이브리드' &&
              <S.SpacDd>
                {/* OPTION 1LINE */}
                <S.OptionDl>
                  <S.OptionDt>연료</S.OptionDt>
                  <S.OptionDd>{choosed?.fuelType}</S.OptionDd>
                  <S.OptionDt>엔진형식</S.OptionDt>
                  <S.OptionDd>{choosed?.engine}</S.OptionDd>
                  <S.OptionDt>배기량</S.OptionDt>
                  <S.OptionDd>{choosed?.displacement}</S.OptionDd>
                  <S.OptionDt>변속기</S.OptionDt>
                  <S.OptionDd>{choosed?.transMission}</S.OptionDd>
                  <S.OptionDt>구동방식</S.OptionDt>
                  <S.OptionDd>{choosed?.drivingSystem}</S.OptionDd>
                  <S.OptionDt>최고출력</S.OptionDt>
                  <S.OptionDd>{choosed?.power}</S.OptionDd>
                  <S.OptionDt>최대토크</S.OptionDt>
                  <S.OptionDd>{choosed?.torque}</S.OptionDd>
                  <S.OptionDt>최고속도</S.OptionDt>
                  <S.OptionDd>-</S.OptionDd>
                  {/* <S.OptionDd>{choosed?.}</S.OptionDd> */}
                  <S.OptionDt>제로백</S.OptionDt>
                  <S.OptionDd>zero100</S.OptionDd>
                  {/* <S.OptionDd>{choosed?.}</S.OptionDd> */}
                </S.OptionDl>

                {/* OPTION 2LINE */}
                <S.OptionDl>
                  <S.OptionDt>연비등급</S.OptionDt>
                  <S.OptionDd>{choosed?.ratingGasMileage}</S.OptionDd>
                  <S.OptionDt>복합연비</S.OptionDt>
                  <S.OptionDd>{choosed?.complexGasMileage}</S.OptionDd>
                  <S.OptionDt>도심연비</S.OptionDt>
                  <S.OptionDd>{choosed?.urbanGasMileage}</S.OptionDd>
                  <S.OptionDt>고속도로연비</S.OptionDt>
                  <S.OptionDd>{choosed?.highwayGasMileage}</S.OptionDd>
                  <S.OptionDt>저공해등급</S.OptionDt>
                  <S.OptionDd>{choosed?.lowEmission}</S.OptionDd>
                  <S.OptionDt>모터출력</S.OptionDt>
                  <S.OptionDd>{choosed?.motorPower}</S.OptionDd>
                  <S.OptionDt>모터토크</S.OptionDt>
                  <S.OptionDd>{choosed?.motorTorque}</S.OptionDd>
                  <S.OptionDt>배터리타입</S.OptionDt>
                  <S.OptionDd>{choosed?.batteryType}</S.OptionDd>
                  <S.OptionDt>배터리용량</S.OptionDt>
                  <S.OptionDd>{choosed?.batteryVolume}</S.OptionDd>
                </S.OptionDl>

                {/* OPTION 3LINE */}
                <S.OptionDl>
                  <S.OptionDt>자율주행 레벨</S.OptionDt>
                  <S.OptionDd>{choosed?.autoLevel}</S.OptionDd>
                  <S.OptionDt>공차중량</S.OptionDt>
                  <S.OptionDd>{choosed?.vehicleWeight}</S.OptionDd>
                  <S.OptionDt>앞타이어규격</S.OptionDt>
                  <S.OptionDd>{choosed?.frontTire}</S.OptionDd>
                  <S.OptionDt>뒷타이어규격</S.OptionDt>
                  <S.OptionDd>{choosed?.rearTire}</S.OptionDd>
                  <S.OptionDt>전륜브레이크</S.OptionDt>
                  <S.OptionDd>{choosed?.frontSuspension}</S.OptionDd>
                  <S.OptionDt>후륜브레이크</S.OptionDt>
                  <S.OptionDd>{choosed?.rearSuspension}</S.OptionDd>
                  <S.OptionDt>전륜서스펜션</S.OptionDt>
                  <S.OptionDd>{choosed?.frontBrake}</S.OptionDd>
                  <S.OptionDt>후륜서스펜션</S.OptionDt>
                  <S.OptionDd>{choosed?.rearBrake}</S.OptionDd>
                  <S.OptionDt>탑승정원</S.OptionDt>
                  <S.OptionDd>{choosed?.capacity}</S.OptionDd>
                </S.OptionDl>
              </S.SpacDd>}

            {/* 전기 */}
            {choosed?.fuelType === '전기' &&
              <S.SpacDd>
                {/* OPTION 1LINE */}
                <S.OptionDl>
                  <S.OptionDt>연료</S.OptionDt>
                  <S.OptionDd>{choosed?.fuelType}</S.OptionDd>
                  
                  <S.OptionDt>모터출력</S.OptionDt>
                  <S.OptionDd>{choosed?.motorPower}</S.OptionDd>
                  <S.OptionDt>모터토크</S.OptionDt>
                  <S.OptionDd>{choosed?.motorTorque}</S.OptionDd>
                  <S.OptionDt>제로백</S.OptionDt>
                  <S.OptionDd>zero100</S.OptionDd>
                  {/* <S.OptionDd>{choosed?.}</S.OptionDd> */}
                  <S.OptionDt>구동방식</S.OptionDt>
                  <S.OptionDd>{choosed?.drivingSystem}</S.OptionDd>
                  <S.OptionDt>배터리종류</S.OptionDt>
                  <S.OptionDd>{choosed?.batteryType}</S.OptionDd>
                  <S.OptionDt>배터리용량</S.OptionDt>
                  <S.OptionDd>{choosed?.batteryVolume}</S.OptionDd>
                </S.OptionDl>

                {/* OPTION 2LINE */}
                <S.OptionDl>
                  <S.OptionDt>연비</S.OptionDt>
                  <S.OptionDd>{choosed?.complexGasMileage}</S.OptionDd>
                  <S.OptionDt>저공해등급</S.OptionDt>
                  <S.OptionDd>{choosed?.lowEmission}</S.OptionDd>
                  <S.OptionDt>충전방식</S.OptionDt>
                  <S.OptionDd>{choosed?.charging}</S.OptionDd>
                  <S.OptionDt>충전시간(급속)</S.OptionDt>
                  <S.OptionDd>{choosed?.chargingQuick}</S.OptionDd>
                  <S.OptionDt>충전시간(완속)</S.OptionDt>
                  <S.OptionDd>{choosed?.chargingSlow}</S.OptionDd>
                  <S.OptionDt>자율주행 레벨</S.OptionDt>
                  <S.OptionDd>{choosed?.autoLevel}</S.OptionDd>
                  <S.OptionDt>공차중량</S.OptionDt>
                  <S.OptionDd>{choosed?.vehicleWeight}</S.OptionDd>
                </S.OptionDl>

                {/* OPTION 3LINE */}
                <S.OptionDl>
                  <S.OptionDt>앞타이어규격</S.OptionDt>
                  <S.OptionDd>{choosed?.frontTire}</S.OptionDd>
                  <S.OptionDt>뒷타이어규격</S.OptionDt>
                  <S.OptionDd>{choosed?.rearTire}</S.OptionDd>
                  <S.OptionDt>전륜브레이크</S.OptionDt>
                  <S.OptionDd>{choosed?.frontSuspension}</S.OptionDd>
                  <S.OptionDt>후륜브레이크</S.OptionDt>
                  <S.OptionDd>{choosed?.rearSuspension}</S.OptionDd>
                  <S.OptionDt>전륜서스펜션</S.OptionDt>
                  <S.OptionDd>{choosed?.frontBrake}</S.OptionDd>
                  <S.OptionDt>후륜서스펜션</S.OptionDt>
                  <S.OptionDd>{choosed?.rearBrake}</S.OptionDd>
                  <S.OptionDt>탑승정원</S.OptionDt>
                  <S.OptionDd>{choosed?.capacity}</S.OptionDd>
                </S.OptionDl>
              </S.SpacDd>
            }

          </S.SpacDl>
        </S.MoreInfo>
      </MaxContainer>
    </>
  )
}
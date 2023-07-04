import React, {ChangeEvent, useState } from 'react';
import {OutlinedInput, InputAdornment, List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import { useCarData } from '../hook/useCarData';
import { useNavigate } from 'react-router-dom';
import * as type from '../types/types'
import Hangul from 'hangul-js';

// ICON
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// STYLED
import * as S from '../styled/components/SearchBar.styled'


export function Search() {
  const carData = useCarData();
  const navigate = useNavigate(); 
  const [searchText, setSearchText] = useState('')
  const [filteredCars, setFilteredCars] = useState<type.Car[]>([])

  // 검색창 인풋텍스트 -> searchText
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchText(searchValue)
    if(searchValue === ''){
      setFilteredCars([]);
    // 사용자가 검색어를 입력하면 결과물 보여주는 로직(초성가능)
    } else {
      const filtered = carData.filter((car)=>{
        const carName = car.name.kr;
        const carInitials = Hangul.disassemble(carName)
        .reduce((acc, curr)=>{
          if(Hangul.isComplete(curr)){
            const initial = Hangul.assemble([curr]);
            if(initial !== ''){
              acc += initial;
            }
          } else {
            acc += curr
          }
          return acc;
        }, '')
        .toLowerCase();

        const searchInitials = Hangul.disassemble(searchValue)
        .reduce((acc, curr) => {
          if (Hangul.isComplete(curr)) {
            const initial = Hangul.assemble([curr]);
            if (initial !== '') {
              acc += initial;
            }
          } else {
            acc += curr;
          }
          return acc;
        }, '')
        .toLowerCase();

        return carInitials.includes(searchInitials);
      });

      setFilteredCars(filtered);
    }
  }
  // 인풋텍스트 초기화(Clear)
  const handleInputClear = () => {
    setSearchText('')
  }
  return (
    <>
    {/* 검색창 */}
        <S.SearchBarWrapper>
        {/* <div></div> */}
        <S.InputForm size='small' sx={{m:1}}>
          <OutlinedInput
            id="input-with-icon-adornment"
            style={{cursor:'default'}}
            placeholder='자동차검색'
            type='text'
            onChange={handleInputChange}
            value={searchText}
            // 아이콘
            endAdornment={
              <InputAdornment position="end" style={{gap: '10px'}}>
                {/* INPUT 초기화 아이콘 */}
                {searchText === '' && <ClearIcon style={{opacity:0, cursor:'default'}} />}
                {searchText !== '' && <ClearIcon onClick={handleInputClear} style={{cursor:'pointer'}} />}
                {/* 검색아이콘 */}
                <SearchIcon className='searchIcon' style={{color: searchText === '' ? '' : '#626262', cursor:'pointer'}} />
              </InputAdornment>
            }
          />
        </S.InputForm>
        {/* 검색리스트 */}
        {
          filteredCars.length !== 0
          &&
          <S.ListWrapper>
            <div>
              {filteredCars?.map((car, index)=>(
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={()=>{navigate(`/detail/${car.id}`)}}>
                      <ListItemText>{car.name.kr}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </div>
            <S.ListPhoto>
                <img src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/hyundai/Avante.png`} alt="" />
            </S.ListPhoto>
          </S.ListWrapper>
        }
      </S.SearchBarWrapper>
    </>
  )
}
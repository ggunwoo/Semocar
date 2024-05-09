import React, {ChangeEvent, useState } from 'react';
import {OutlinedInput, InputAdornment, ListItem, ListItemButton, ListItemText} from '@mui/material';
import { useCarData } from '../../utils/useCarData';
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
  const [searchText, setSearchText] = useState('');
  const [filteredCars, setFilteredCars] = useState<type.Car[]>([]);
  const [listHover, setListHover] = useState<string>('photo/select_model');

  // 검색 함수
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchText(searchValue)
    if(searchValue === ''){
      setFilteredCars([]);
    } else {
      // 사용자가 검색어를 입력하면 결과물 보여주는 로직(초성가능)
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
      console.log(filtered)
      setFilteredCars(filtered);
    }
  }
  // 인풋텍스트 초기화(Clear) 함수
  const handleInputClear = () => {
    setSearchText('');
    setFilteredCars([]);
  }
  /** 리스트 호버시 이미지 변경 함수 */
  const handleHover = (url:string) => {
    setListHover(url)
  }
  /** 리스트 리브시 이미지 초기화 */
  const handleLeave = () => {
    setListHover('photo/select_model')
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
            <S.ListTexts>
              {filteredCars?.map((car, index)=>(
                <ListItem className='item' key={index} disablePadding>
                  <ListItemButton onMouseLeave={()=>{handleLeave()}} onMouseEnter={()=>{handleHover(car.imgUrl)}} className='btn' onClick={()=>{navigate(`/detail/${car.id}`)}}>
                      <ListItemText className='name'>{car.name.kr}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </S.ListTexts>
            <S.ListPhoto>
                <img src={`https://raw.githubusercontent.com/ggunwoo/Semocar/main/src/images/${listHover}.png`} alt="" />
            </S.ListPhoto>
          </S.ListWrapper>
        }
      </S.SearchBarWrapper>
    </>
  )
}
import React, {ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCarAllList } from '../../store/api/carApi';
import { imageUrl } from '../../../utils/constants';
import {OutlinedInput, InputAdornment, ListItem, ListItemButton, ListItemText} from '@mui/material';
import { useCarData } from '../../../utils/useCarData';
import * as type from '../../types/types'
import Hangul from 'hangul-js';

// ICON
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// STYLED
import * as S from '../../styled/components/SearchBar.styled'

import { changeCarListStyle } from '../../store/slice/listStyleSlice';


export default function SearchBar() {
  const dispatch = useAppDispatch();
  const carData = useCarData();
  const cars = useAppSelector(state => state.carList.items);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [filteredCars, setFilteredCars] = useState<type.ModelListType[]>([]);
  const [listHover, setListHover] = useState<string>(`${imageUrl}/select_model.png`);

  useEffect(()=>{
    dispatch(fetchCarAllList());
    console.log("전체 차 리스트 호출")
  }, [searchText])

  // 검색 함수
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchText(searchValue)
    if(searchValue === ''){
      setFilteredCars([]);
    } else {
      // 사용자가 검색어를 입력하면 결과물 보여주는 로직(초성가능)
      const filtered = cars.filter((car)=>{
        const carName = car.name;
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
    setListHover(url+"/model_image.png")
  }
  /** 리스트 리브시 이미지 초기화 */
  const handleLeave = () => {
    setListHover(`${imageUrl}/select_model.png`)
  }

  const handleCarListStyle = (style: string) => {
    dispatch(changeCarListStyle(style))
  }
  return (
    <nav>
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
                  <ListItemButton onMouseLeave={()=>{handleLeave()}} onMouseEnter={()=>{handleHover(car.generations[0].image_path)}} className='btn' onClick={()=>{navigate(`/detail/${car.generations[0].id}`)}}>
                      <ListItemText className='name'>{car.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </S.ListTexts>
            <S.ListPhoto>
                <img src={`${listHover}`} alt="CAR IMAGE" />
            </S.ListPhoto>
          </S.ListWrapper>
        }
      </S.SearchBarWrapper>
    </nav>
  )
}
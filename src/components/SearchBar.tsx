import React, {ChangeEvent, useState } from 'react';
import {OutlinedInput, InputAdornment} from '@mui/material';

// ICON
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// STYLED
import * as S from '../styled/components/SearchBar.styled'

export function Search() {
  const [searchText, setSearchText] = useState('')
  const [submitValue, setSubmitValue] = useState('')

  // 검색창 인풋텍스트 -> searchText
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  // 인풋텍스트로 차량 검색하기
  const handleSearch = () => {
    setSubmitValue(searchText)
  }
  const handleKeyPress = (e: React.KeyboardEvent<SVGSVGElement>) => {
    if(e.key === 'Enter'){
      setSubmitValue(searchText)
    }
  }
  // 인풋텍스트 초기화
  const handleInputClear = () => {
    setSearchText('')
  }

  return (
    <>
    {/* 검색창 */}
        <S.SearchBarWrapper>
        <div></div>
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
                <SearchIcon onKeyPress={handleKeyPress} onClick={handleSearch} className='searchIcon' style={{color: searchText === '' ? '' : '#626262', cursor:'pointer'}} />
              </InputAdornment>
            }
          />
        </S.InputForm>
      </S.SearchBarWrapper>
    </>
  )
}
import {styled} from 'styled-components'
import { FormControl } from '@mui/material';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

// 검색창
export const SearchBarWrapper = styled.div`&&&
{
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  .searchIcon {
    /* opacity: 0.3; */
    /* color: #dee2e6; */
    color: rgba(0, 0, 0, 0.175);
  }
  .Mui-focused {
    /* border-color: #9063FF !important; */
  }
}`;
// 검색폼
export const InputForm = styled(FormControl)({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#AB9ADD',
    },
  },
});
// 검색리스트
export const ListWrapper = styled(List)`&&&
{
  width: 500px;
  height: auto;
  background-color: #fff;

  display: flex;
  justify-content: space-between;

  position: absolute;
  right: 8px;
  top: 55px;
  border: 1px solid #000;
  z-index: 9;
}`;
export const ListPhoto = styled.div`&&&
{
  img {
    width: 9rem;
  }
}`;

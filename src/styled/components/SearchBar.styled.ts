import {styled} from 'styled-components'
import { FormControl } from '@mui/material';

// 검색창
export const SearchBarWrapper = styled.div`&&&
{
  width: 100%;
  display: flex;
  justify-content: space-between;
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
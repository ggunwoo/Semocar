import { useNavigate } from 'react-router-dom';
import { useCarBrands } from '../hook/useCarData';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button } from '@mui/material';

import {
  brandIn,
  brandReset,
} from '../store/carFilter'

import {
  toggleHandler,
  toggleReset,
} from '../store/brandNav'

// STYLED
import { MaxContainer } from '../styled/Global';
import * as S from '../styled/components/BrandNav.styled'


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
    <S.NavWrapper>
      <MaxContainer>
      <S.Nav>
        {carBrands.map((brand, index):JSX.Element => (
          <Button
            className={`logoBtn ${ toggle[index] ? 'clicked' : 'unclick'}` }
            key={brand.id} 
            onClick={()=>{brandHandler(brand.name.kr, index); navigate(`/brand`);} } 
            variant='text'
          >
            <div className='imgBox'>
              <img style={{width:"40px"}} src={`https://raw.githubusercontent.com/ggunwoo/CarSite/main/src/images/${brand.imgUrl}.png`} alt={brand.name.en} />
            </div>
            <p className='logoName'>{brand.name.kr}</p>
          </Button>
        ))}
        <Button className='logoBtn' onClick={()=>{brandAll(); navigate(`/brand`)}}>
          <div className='imgBox'>
            {/* <img style={{width:"40px"}} src={`https://via.placeholder.com/40x40`} alt='ICON' /> */}
            <MenuIcon sx={{"fontSize":"36px", "color":"#333"}} />
          </div>
          <p className='logoName'>전체보기</p>
        </Button>
      </S.Nav>
      </MaxContainer>
    </S.NavWrapper>
  )
}
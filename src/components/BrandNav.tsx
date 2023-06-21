import { useNavigate } from 'react-router-dom';
import { useCarBrands } from '../hook/useCarData';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import MenuIcon from '@mui/icons-material/Menu';

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
    <MaxContainer>
      <S.FlexBox>
        {carBrands.map((brand, index):JSX.Element => (
          <S.LogoButton
            key={brand.id} 
            className={`${ toggle[index] ? 'clicked' : 'unclick'}` }
            onClick={()=>{brandHandler(brand.name.kr, index); navigate(`/brand`);} } 
            variant='text'
          >
            <S.ImageBox className='imgBox'>
              <img style={{width:"40px"}} src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${brand.imgUrl}.png`} alt={brand.name.en} />
            </S.ImageBox>
            <S.LogoName className='logoName'>{brand.name.kr}</S.LogoName>
          </S.LogoButton>
        ))}
        <S.LogoButton onClick={()=>{brandAll(); navigate(`/brand`)}}>
          <S.ImageBox className='imgBox'>
            {/* <img style={{width:"40px"}} src={`https://via.placeholder.com/40x40`} alt='ICON' /> */}
            <MenuIcon sx={{"fontSize":"36px", "color":"#333"}} />
          </S.ImageBox>
          <S.LogoName className='logoName'>전체보기</S.LogoName>
        </S.LogoButton>
      </S.FlexBox>
    </MaxContainer>
  )
}
import { useNavigate } from 'react-router-dom';
import { useCarBrands } from '../hook/useCarData';
import { Box, Button } from '@mui/material';
import { styled } from 'styled-components';


// STYLED
import { MaxContainer } from '../App';

const FlexBox = styled(Box)`
&& {
  display:flex;
  justify-content: space-evenly;
}
`;
const LogoButton = styled(Button)`
&& {
  display:block;
  width: 100px;
}
`;
const ImageBox = styled.div`
&& {
  width: 40px;
  height: 80px;
  display: flex;
  align-items: center;
  margin: 0 auto;
}
`;
const LogoName = styled.p`
&& {
  color: black;
  font-size: 14px;
}
`;

export function BrandNav () {

  const navigate = useNavigate();
  const carBrands = useCarBrands();

  return (
    <MaxContainer>
      <FlexBox>
        {carBrands.map((brand):JSX.Element => (
          <LogoButton key={brand.id} onClick={()=>{navigate(`/brand`)}} variant='text'>
            <ImageBox>
              <img style={{width:"40px"}} src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${brand.imgUrl}.png`} alt={brand.name.en} />
            </ImageBox>
            <LogoName>{brand.name.kr}</LogoName>
          </LogoButton>
        ))}
        <LogoButton>
          <ImageBox>
            <img style={{width:"40px"}} src={`https://via.placeholder.com/40x40`} alt='ICON' />
          </ImageBox>
          <LogoName>전체보기</LogoName>
        </LogoButton>
      </FlexBox>
    </MaxContainer>
  )
}
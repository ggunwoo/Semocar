import { Checkbox } from '@mui/material'
import { FormGroup, FormControlLabel} from '@mui/material';
import { segments } from '../api/getCarData';

// Redux
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { segIn, segReset, fuelIn, fuelReset } from '../store/slice/carFilter';
import { segAllChange, segHandle, fuelAllChange, fuelHandle } from '../store/slice/carCheck-slice';

// COMPONENT
import {BrandNav} from '../components/BrandNav';
import {CarView} from '../components/CarView';

// STYLED COMPONENTS
  // SearchBox Styled
import { MaxContainer } from '../styled/Global';
import * as S from '../styled/Brand.styled'

// Search View Styled
export function Brand ():JSX.Element {
  const dispatch = useAppDispatch();

  const segmentList = segments
  const fuelTypeList = ['가솔린', '디젤', 'LPG', '하이브리드', '전기', '수소']
  
  const segChecked = useAppSelector((state)=> state.segCheck);
  const segAll = useAppSelector((state)=> state.segAll);

  const fuelChecked = useAppSelector((state)=> state.fuelCheck);
  const fuelAll = useAppSelector((state)=> state.fuelAll)

  // 차급 전체 체크박스 로직
  const segmentAllHandle = () => {
    const updatedChecked = Array(segmentList.length).fill(false);
    dispatch(segHandle(updatedChecked))
    dispatch(segAllChange(true))

    // selected reset
    dispatch(segReset())
    
  };
  // 차급 체크박스 로직
  const segmentHandle = (segment: string, index: number) => {

    const updatedChecked = [...segChecked];  
    updatedChecked[index] = !updatedChecked[index];
    dispatch(segHandle(updatedChecked))

    dispatch(segAllChange(false))

    if(segAll === false && updatedChecked.find( e => e === true) === undefined ){
      dispatch(segAllChange(true))
    }

    // selected Segment
    dispatch(segIn(segment));
  };
  // 연료 전체 체크박스 로직
  const fuelTypeAllHandle = () => {
    const updatedChecked = Array(fuelTypeList.length).fill(false);
    dispatch(fuelHandle(updatedChecked))

    dispatch(fuelAllChange(true))

    // selected reset
    dispatch(fuelReset());
  };
  // 연료 체크박스 로직
  const fuelTypeHandle = (fuelType:string, index: number) => {

    const updatedChecked = [...fuelChecked];
    updatedChecked[index] = !updatedChecked[index];
    dispatch(fuelHandle(updatedChecked))

    dispatch(fuelAllChange(false))

    if(fuelAll === false && updatedChecked.find( e => e === true) === undefined ){
      dispatch(fuelAllChange(true))
    }
    // selected Fuel Type
    dispatch(fuelIn(fuelType));
  };

  return (
    <MaxContainer>
      {/* Brand Search Nav */}
      <BrandNav />
      {/* Search Check Box */}


      <S.CheckBoxWrapper>
        {/* 차급라인 */}
        <S.CheckLine>
          <div className='checkTitle'>차급</div>
          {/* 체크박스 */}
          <FormGroup className='checkBoxs' row={true}>
            {/* 차급 전체 체크박스 */}
            <FormControlLabel className='check' control={
              <Checkbox checked={segAll} onChange={() => {segmentAllHandle();}} />} label="전체"
            ></FormControlLabel>
            {/* 차급 체크박스들 */}
            {segmentList.map((segment, index)=>(
              <FormControlLabel className='check' key={segment} control={
                <Checkbox checked={segChecked[index]} onChange={() => { segmentHandle(segment, index);}}  />} label={`${segment}`}
              ></FormControlLabel>
            ))}
          </FormGroup>
        </S.CheckLine>

        {/* ----------------------------------------- */}

        {/* 연료라인 */}
        <S.CheckLine>
          <div className='checkTitle'>연료</div>
          {/* 체크박스 */}
          <FormGroup className='checkBoxs' row={true}>
            {/* 연료 전체 체크박스 */}
            <FormControlLabel className='check' control={
              <Checkbox checked={fuelAll} onChange={() => { fuelTypeAllHandle() }}  />} label="전체"
            ></FormControlLabel>
            {/* 연료 체크박스들 */}
            {fuelTypeList.map((fuelType, index)=>(
              <FormControlLabel className='check' key={fuelType} control={
                <Checkbox checked={fuelChecked[index]} onChange={()=> { fuelTypeHandle(fuelType, index) }}  />} label={`${fuelType}`}
              ></FormControlLabel>
            ))}
          </FormGroup>
        </S.CheckLine>
      </S.CheckBoxWrapper>


      {/* 차 목록 */}
      <CarView />

      {/* variant='outlined' size="sm" color="neutral" */}
      
    </MaxContainer>
  )
}


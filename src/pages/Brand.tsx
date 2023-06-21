import { Checkbox } from '@mui/joy'
// import * as type from '../types/types'

// Redux
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { segIn, segReset, fuelIn, fuelReset } from '../store/carFilter';
import { segAllChange, segHandle, fuelAllChange, fuelHandle } from '../store/check';

// COMPONENT
import {BrandNav} from '../components/BrandNav';
import {TabView} from '../components/TabView';

// STYLED COMPONENTS
  // SearchBox Styled
import { MaxContainer } from '../styled/Global';
import * as S from '../styled/Brand.styled'

// Search View Styled
export function Brand ():JSX.Element {
  const dispatch = useAppDispatch();

  const segmentList = ['경차', '소형세단', '준중형세단', '중형세단', '준대형세단', '대형세단', '소형SUV','준중형SUV', '중형SUV', '준대형SUV', '대형SUV', 'RV', 'MPV', '픽업', '벤', '쿠페', '해치백', '왜건']
  const fuelTypeList = ['가솔린', '디젤', 'LPG', '하이브리드', '전기', '수소']
  
  const segChecked = useAppSelector((state)=> state.segCheck);
  const segAll = useAppSelector((state)=> state.segAll);

  const fuelChecked = useAppSelector((state)=> state.fuelCheck);
  const fuelAll = useAppSelector((state)=> state.fuelAll)

// 차급 체크박스 Checked 로직
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

// 연료 체크박스 Checked 로직
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
      <S.FormWraper>
        <S.CheckLine>
          <S.CheckTitle>차급</S.CheckTitle>
          <S.CheckWraper row={true}>
            <S.FormControl control={
              <Checkbox checked={segAll} onChange={() => {segmentAllHandle();}} variant='outlined' size="sm" color="neutral" />} label="전체"
            ></S.FormControl>
            {segmentList.map((segment, index)=>(
              <S.FormControl key={segment} control={
                <Checkbox checked={segChecked[index]} onChange={() => { segmentHandle(segment, index);}} variant='outlined' size="sm" color="neutral" />} label={`${segment}`}
              ></S.FormControl>
            ))}
          </S.CheckWraper>
        </S.CheckLine>
        <S.CheckLine>
          <S.CheckTitle>연료</S.CheckTitle>
          <S.CheckWraper row={true}>
            <S.FormControl control={
              <Checkbox checked={fuelAll} onChange={() => { fuelTypeAllHandle() }} variant='outlined' size="sm" color="neutral" />} label="전체"
            ></S.FormControl>
            {fuelTypeList.map((fuelType, index)=>(
              <S.FormControl key={fuelType} control={
                <Checkbox checked={fuelChecked[index]} onChange={()=> { fuelTypeHandle(fuelType, index) }} variant='outlined' size="sm" color="neutral" />} label={`${fuelType}`}
              ></S.FormControl>
            ))}
          </S.CheckWraper>
        </S.CheckLine>
      </S.FormWraper>

      {/* Search View */}
      <TabView />
      
    </MaxContainer>
  )
}


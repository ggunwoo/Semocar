import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { fetchCarMaps } from "../../store/api/carApi";

export default function TestList(){

  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(fetchCarMaps());
  },[])

  // console.log();

  return (<div>TEST</div>)
}
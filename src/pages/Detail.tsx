import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { RootState } from '../store/store'
// import * as type from '../types/types'

export function Detail():JSX.Element {

  const carAllData = useSelector((state :RootState)=>{ return state})
  console.log(carAllData)
  

  const { id } = useParams();


  return (
    <>
      <div>디테일페이지</div>
    </>
  )
}
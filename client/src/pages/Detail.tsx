import "../styles/detail.scss"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchCar } from '../store/api/carApi'

export default function DetailPage() {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const car = useAppSelector(state => state.car.item)
  const status = useAppSelector(state => state.car.status)
  const error = useAppSelector(state => state.car.error)

  useEffect(()=>{
    if(status === "idle"){
      dispatch(fetchCar(id))
    }
  }, [id, dispatch])

  return (
    <section>
      <p>디테일</p>
    </section>
  );
}

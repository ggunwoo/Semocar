import React from 'react';
import {Outlet} from 'react-router-dom'

// COMPONENT
import {BrandCar} from '../components/BrandCar'
import {BrandNav} from '../components/BrandNav'

export function Brand ():JSX.Element {

  return (
    <>
      <BrandNav />
      
      <Outlet></Outlet>
    </>
  )
}
/* eslint-disable no-unused-vars */

import React from 'react'

  import { useCarStatusActiveQuery } from "../../services/carAPI";
import B2BCard from './B2BCard';

export default function ActiveCarList() {
  
    const {data} = useCarStatusActiveQuery() 
    console.log("data",data)
    return (
        <div className='flex flex-wrap justify-center'>
          {data?.map((item, index) => (
    <div key={index}>
      <B2BCard item={item} />
    </div>
))}
       
        </div>
      )
}

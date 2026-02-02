/* eslint-disable no-unused-vars */

import React from 'react'
import {useGetbeadingCarImageQuery} from "../../services/biddingAPI"
export default function B2Bimage(beadingCarId) {
    
console.log(beadingCarId)
  const {data} = useGetbeadingCarImageQuery(beadingCarId)
  console.log(data)
  const coverImage = data?.object
    .filter(img => img.doctype === "coverImage")?.[0]?.documentLink;

  console.log(coverImage);
  
  return (
    <div className='w-full h-full'>
       <img src={coverImage} alt=""  className='h-[12rem] w-full '/>
    </div>
  )
}

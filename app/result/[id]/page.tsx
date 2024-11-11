import React from 'react'

export default function page({params}:any) {
  return (
    <div className='w-screen h-screen grid place-content-center gap-4 text-center'>
      <b className='text-2xl'>berhasil membuat pesanan</b>
      <b>id : {params.id}</b>
    </div>
  )
}

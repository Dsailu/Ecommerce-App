"use client"


import { useCartStore } from '@/store/cart-store'
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function Successpage() {
    const {clearCart} = useCartStore();
    useEffect(()=>{
        clearCart();
    },[clearCart])
  return (
    <div className='container mx-auto p-4 text-center'>
      <h1 className='text-3xl font-bold mb-4'>Payment Successful!</h1>
      <p className='mb-4'>Thank you for your purchase. Your order is being processed.</p>
      <Link href="/" className='text-blue-600 hover:underline'>Go back to Home</Link>
    </div>
  )
}

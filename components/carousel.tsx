"use client"

import React, { useEffect, useState } from 'react'
import Stripe from 'stripe';
import { Card, CardContent, CardTitle } from './ui/card';
import Image from 'next/image';
interface CarouselProps {
  products: Stripe.Product[];
}
export default function Carousel({ products }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000)
    return () => clearInterval(interval);
  }, [products.length]);
  const currentProduct = products[currentIndex];
  const price = currentProduct?.default_price as Stripe.Price;
  return (
      <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
        {currentProduct.images && currentProduct.images[0] && (
        <div className="relative h-80 w-full">
          <Image alt={currentProduct.name} 
          src={currentProduct.images[0]}
           layout='fill' objectFit='cover'
          className="transition-opacity duration-500 ease-in-out"></Image>
        </div>
      )}
        <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <CardTitle className="text-3xl font-bold text-white mb-2">
            {currentProduct.name}
            </CardTitle>
          <p className='mt-2 text-lg font-semibold text-gray-900'>
            {price ? `$${(price.unit_amount || 0) / 100}` : 'N/A'}
          </p>
        </CardContent>
      </Card>
  )
}

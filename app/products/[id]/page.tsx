 import ProductDetails from '@/components/productDetails'
import { stripeClient } from '@/lib/stripe'
import React from 'react'
export default async function ProductPage({params}: {params:{id:string }}) {
    const products = await stripeClient.products.retrieve(params.id, {
        expand: ['default_price']
      })
  const plainProducts = JSON.parse(JSON.stringify(products))
  return (
  <ProductDetails product = {plainProducts}/>
  )
}

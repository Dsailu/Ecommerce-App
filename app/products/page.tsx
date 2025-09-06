import React from 'react'
import { stripeClient } from '@/lib/stripe'
import ProductList from '@/components/productList'

async function Productspage() {
  const products = await stripeClient.products.list({
    expand: ['data.default_price'],
    limit: 10,
  })
  return (
    <div className="pb-8">
      <h2 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">
        Products</h2>
      <ProductList products = {products.data}/>
    </div>
  )
}

export default Productspage

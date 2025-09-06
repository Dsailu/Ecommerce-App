"use client"

import React from 'react'
import Stripe from 'stripe'
import Image from 'next/image'
import { Button } from './ui/button';
import { useCartStore } from '@/store/cart-store';
import { on } from 'events';
interface props {
    product: Stripe.Product
}
export default function productDetails({ product }: props) {
    const {items, addItem, removeItem} = useCartStore();
    const price = product?.default_price as Stripe.Price;
    const cartItem = items.find((item)=> item.id === product.id)
    const quantity = cartItem ? cartItem.quantity : 0;
    const onClickAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name, 
            price: price.unit_amount ? price.unit_amount / 100 : 0,
            imageUrl: product.images && product.images[0] ? product.images[0] : null,
            quantity: 1,
        })
    }
    const onremoveItem = () => {
        if(cartItem){
            if(cartItem.quantity === 1){
                removeItem(cartItem.id) // Remove item from cart if quantity is 1
            } else {
                addItem({
                    ...cartItem,            
                    quantity: -1, // Decrease quantity by 1
                })
            }
        }
    }
    return (
        <div>
            {product.images && product.images[0] && (
                <div className="relative h-60 w-full">
                    <Image alt={product.name}
                        src={product.images[0]}
                        layout='fill' objectFit='cover'
                        className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
                    ></Image>
                </div>
            )}
            <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
            {product.description && (
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            )}
            {price && price.unit_amount && (
                <p className="text-lg font-semibold text-gray-900">
                    ${(price.unit_amount / 100).toFixed(2)}
                </p>
            )}
            <div>
                <Button variant = "outline" className="mt-4 bg-black text-white" onClick = {onremoveItem}>-</Button>  
                <span className="mx-2">{quantity}</span>
                <Button variant = "outline" className="mt-4 bg-black text-white" onClick={onClickAddToCart}
                >+</Button>                
            </div>
        </div>
    )
}

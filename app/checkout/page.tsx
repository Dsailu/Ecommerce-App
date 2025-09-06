"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCartStore } from '@/store/cart-store'
import React from 'react'
import { checkoutAction } from './chekout-action';

function Checkoutpage() {
  const { items, addItem, removeItem } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="mb-4">Looks like you have not added anything to your cart yet.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader className="text-2xl font-bold mb-4">Order Summary</CardHeader>
        <CardContent>
          <div className="p-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <Button variant="outline" className="mt-2 bg-black text-white" onClick={() => {
                    if (item.quantity === 1) {
                      removeItem(item.id)
                    } else {
                      addItem({ ...item, quantity: -1 })
                    }
                  }}>-</Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button variant="outline" className="mt-2 bg-black text-white" onClick={() => addItem({ ...item, quantity: 1 })}
                  >+</Button>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <hr className="my-4" />
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <form action = {checkoutAction} className="max-w-md mx-auto">
        <input type = "hidden" name  = "items" value = {JSON.stringify(items)}/>
        <Button type = "submit" className="w-full">Proceed to Payment</Button>  
      </form>
    </div>
  )
}

export default Checkoutpage

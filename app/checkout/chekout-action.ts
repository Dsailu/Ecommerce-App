"use server"

import { stripeClient } from "@/lib/stripe";
import { CartItem } from "@/store/cart-store";
import { redirect } from "next/navigation";

export const checkoutAction = async (formData: FormData): Promise<void>=> {
const itemjson = formData.get("items") as string;
const items = JSON.parse(itemjson);
const line_items = items.map((item: CartItem) => ({
    price_data: {
        currency: 'usd',
        product_data: {
            name: item.name,
        },
        unit_amount: item.price * 100,
    },
    quantity: item.quantity,
}))

const session = await stripeClient.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
});

redirect(session.url!);
}
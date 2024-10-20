import React from 'react'

import { CartCard } from './CartCard'


export default function CartList({ cartItems = [], onRemove = () => { } }) {
  return (
    <div className="bg-base-200/50 p-8 container mx-auto">
      <h1 className='font-extrabold tracking-wider text-2xl uppercase'>
        Your Items
      </h1>
      <div className="divider"></div>

      {!(cartItems?.length && cartItems[0]?.id) && <h1 className="text-center w-full font-bold uppercase">
        No items in cart.
      </h1>}
      <div className="flex flex-col gap-4">
        {
          cartItems?.length ?
            cartItems.map((item) => (
              <CartCard
                key={item.id} item={item}
                onRemove={onRemove}
              />
            )) : ''
        }
      </div>
    </div >

  )
}

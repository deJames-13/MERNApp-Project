import { CartPage } from '@features'
import React from 'react'
import ShopWrapper from './Wrapper'

export default function Cart() {
  return (
    <ShopWrapper bannerText="SHOPPING CART" childClass="flex-col md:flex-row">

      <CartPage />
    </ShopWrapper>
  )
}

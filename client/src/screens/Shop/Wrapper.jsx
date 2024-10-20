import { cn } from '@common/lib/utils'
import { Banner } from '@partials'
import React from 'react'

export default function ShopWrapper({ bannerText, children, childClass, bgImage }) {
  return (
    <div className="w-full">
      {/* BANNER */}
      <Banner label={bannerText} noLabel={!bannerText} bgImage={bgImage} />
      <div className={cn('flex min-h-screen', childClass)} >
        {children}
      </div>
    </div>

  )
}

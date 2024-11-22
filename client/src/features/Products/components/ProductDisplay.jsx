import React from 'react';

import { BackButton } from '@common';
import { Counter, Gallery } from '@custom';
import { useCartActions } from '@features';
import { Breadcrumbs } from '@partials';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productApi } from '../product.api';

const productExample = {
  name: 'Lorem ipsum dolor sit amet.',
  description: 'Dolor praesentium in sed rerum nostrum. Laborum in aliquid illum, quidem cumque excepturi. Iure ea in, dolore fugiat repudiandae quod soluta corporis!',
  price: 1999.99,
  currency: 'PHP',
}

export default function ProductDisplay({ data = productExample, children }) {
  /* DECLARATIONS #################################################### */
  const nav = useNavigate();
  const slugParam = useParams().slug;
  const [getProduct, { isLoading }] = productApi.useGetProductMutation();
  const { addItem } = useCartActions();
  const [product, setProduct] = React.useState(data)
  const [cartItem, setCartItem] = React.useState({
    quantity: 1,
    total: product.price,
    product: product.id,
  })
  /* END DECLARATIONS ################################################ */

  const handleQuantity = (quantity) => {
    setCartItem({
      ...cartItem,
      quantity,
      total: product.price * quantity,
    })
  }
  const fetchProduct = React.useCallback(async () => {
    getProduct(slugParam).unwrap().then((res) => {
      setProduct(res?.resource);
      setCartItem({
        ...cartItem,
        product: res?.resource?.id,
        total: res?.resource?.price
      })
    })
  });
  const ToastContent = () => (
    <div>
      <p>
        <span className='font-bold text-primary'>
          {product.name}
        </span>
        <span className='italic'>
          has been added to cart!
        </span>
      </p>
      <button
        onClick={() => nav('/cart')}
        className="btn btn-sm btn-outline btn-primary mt-4">
        View Cart
      </button>
    </div>
  );
  const handleAddToCart = () => {
    addItem({
      ...cartItem,
      incrementBy: cartItem.quantity,
      quantity: 0,
    }).then(() => {
      toast.success(<ToastContent />);
    })
  }


  React.useEffect(() => {
    fetchProduct();
  }, [])

  return (
    <div className='w-screen min-h-screen flex flex-col lg:flex-row items-start'>
      <div className='w-full'>
        <div className="overflow-hidden max-h-[42rem] bg-base-200/30 border-y border-base-content/10 p-1">
          <Breadcrumbs />
          <Gallery
            imageList={product.images || []}
            className="h-[30rem] max-h-[42rem]" />
        </div>

        {children}
      </div>

      <div className='py-4 px-8 container lg:max-w-sm border border-base-content/10 bg-base-100'>
        <div className="flex items-end justify-end">
          <BackButton className="btn-ghost" />
        </div>
        <h1 className='font-bold text-4xl'>
          {product.name}
        </h1>
        <p className='text-sm my-2'>
          {product.description.split('.')[0]}
        </p>
        <p className='text-md my-2 flex gap-4 items-center'>
          Stock:
          <span>
            {product.stock}
          </span>
        </p>

        <div className="divider"></div>
        <span className='text-3xl font-light'>
          {product.currency || 'PHP'} {product.price}
        </span>
        <p className='font-light my-2'>
          {product.description.split('.').slice(1).join('.')}
        </p>

        <Counter
          onChange={(count) => handleQuantity(count)}
          max={product.stock}
        />


        <div className="divider"></div>
        <div className="flex items-center justify-between text-xl font-light">
          <span>
            Item Total:
          </span>
          <span className='font-normal'>
            {product.currency || 'PHP'} {cartItem.total}
          </span>
        </div>


        <div className="flex gap-2 items-center my-8">
          <button
            onClick={handleAddToCart}
            className="w-1/2 btn btn-primary btn-outline">
            Add To Cart
          </button>
          <button className="w-1/2 btn btn-primary">
            Buy Now
          </button>
        </div>
        <p className='text-xs italic font-light'>
          {product?.footerMessage || 'allah!'}
        </p>

      </div>
    </div >
  )
}

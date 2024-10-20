import React from 'react';

import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCartActions } from '../hooks/useCartActions';
import CartList from './CartList';

export function CartPage() {
  const {
    items,
    subTotal,
    getItems,
    removeItem,

  } = useCartActions()

  React.useEffect(() => {
    getItems();
  }, []);

  const handleRemove = async (cartItem) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to remove ${cartItem.product.name}? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(cartItem).then(() => {
          Swal.fire({
            title: 'Success',
            text: 'Item removed successfully.',
            icon: 'success',
          });
          getItems();
        });
      }
    });
  }




  return (
    <>
      <CartList cartItems={items} onRemove={handleRemove} />

      <div className="bg-base-200 min-h-96 p-8 container mx-auto md:max-w-sm border-l">
        <h1 className='font-extrabold tracking-wider text-2xl uppercase'>
          Subtotal
        </h1>
        <div className="flex justify-between my-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">
            {items.length && items[0]?.currency || ''} {subTotal}
          </span>
        </div>
        <i className="text-xs font-light">
          *Taxes and shipping calculated at checkout
        </i>
        {/* Terms and Condition */}
        <div className="flex items-center my-4">
          <input type="checkbox" />
          <span className="text-xs ml-2">
            I agree with the terms and conditions
          </span>
        </div>

        <button className={`${!items?.length ? 'btn-disabled' : ''} btn btn-outline btn-primary w-full`}>
          Proceed to Checkout
        </button>
        <Link to="/" className="group flex gap-2 items-center my-4 hover:text-primary  transition-all ease-in">
          Continue Shopping
          <span className="group-hover:ml-8 transition-all ease-in">
            <FaArrowRight />
          </span>
        </Link>




      </div>
    </>
  )
}

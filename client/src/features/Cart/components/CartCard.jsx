import { Counter } from '@custom';
import React from 'react';
import { Link } from 'react-router-dom';
import { useCartActions } from '../hooks/useCartActions';

const itemDefault = {
  id: -1,
  product: {
    name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    currency: "PHP",
    price: 0,
  },
  quantity: 0,
  total: 0,
}

export function CartCard({ item = itemDefault, onRemove = () => { }, ...props }) {
  const [product, setProduct] = React.useState(item?.product || itemDefault.product);
  const [cartItem, setCartItem] = React.useState(item || itemDefault);
  const { updateItem } = useCartActions();

  const handleQuantity = (value) => {
    const payload = {
      id: cartItem.id,
      product: product.id,
      quantity: value,
      total: product.price * value,
    }
    updateItem(payload).then((updatedItem) => {
      setCartItem((prev) => ({
        ...prev,
        quantity: updatedItem.quantity,
        total: updatedItem.total,
      }));
    });

  };

  const handlRemove = () => {
    onRemove(cartItem)
  }


  return cartItem && cartItem.id != -1 && (
    <div {...props} className="flex flex-col lg:min-h-64 lg:h-64 lg:flex-row items-center justify-between border border-gray-400">
      <div className="container flex flex-col lg:flex-row lg:items-start items-center ">
        <img
          className="w-1/2 lg:max-w-64 lg:w-2/5 aspect-square object-contain"
          src={product.image || "https://placehold.co/150"}
          alt="product"
        />

        <div className="p-4 flex  lg:flex-1 flex-col">
          <div className="ml-4 my-8 text-lg">
            <Link to={`/shop/${product.slug}`} className="group">
              <h1 className="font-bold text-primary group-hover:link transition-all ease-in">
                {product.name}
              </h1>
            </Link>
            <div className="flex text-sm gap-2">
              <span className="text-gray-600">Price: </span>
              <span className=" font-semibold">
                {product.currency || 'PHP'} {product.price}
              </span>
            </div>
            <div className="flex text-sm gap-2">
              <span className="text-gray-600">Quantity: </span>
              <span className=" font-semibold">
                {cartItem.quantity}
              </span>
            </div>
            <div className="flex text-sm gap-2">
              <span className="text-gray-600">Item total: </span>
              <span className=" font-semibold">
                {product.currency || 'PHP'} {cartItem.total}
              </span>
            </div>
          </div>

          <Counter
            count={cartItem.quantity}
            onChange={handleQuantity}
            max={product.stock}
          />
        </div>
      </div>

      <button
        onClick={handlRemove}
        className="lg:h-full btn btn-ghost text-red-500 flex-1">
        Remove
      </button>
    </div>
  )
}

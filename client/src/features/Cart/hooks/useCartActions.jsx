import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartApi } from '../cart.api';
import { addItem, removeItem, setItems, updateItem } from '../cart.slice';

export function useCartActions() {
  /* DECLARATIONS #################################################### */
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const subTotal = useSelector((state) => state.cart.subTotal);

  const [getCartItems] = cartApi.useGetItemsMutation();
  const [createCartItem] = cartApi.useCreateItemMutation();
  const [updateCartItem] = cartApi.useUpdateItemMutation();
  const [deleteCartItem] = cartApi.useDeleteItemMutation();
  /* END DECLARATIONS ################################################ */

  const getItems = React.useCallback(() => {
    return getCartItems().unwrap().then((data) => {
      dispatch(setItems(data?.resource || []));
    });
  }, [dispatch, getCartItems]);

  const addItemToCart = React.useCallback((item) => {
    return createCartItem(item).unwrap().then((data) => {
      dispatch(addItem(data?.resource || {}));
      return data?.resource || {};
    });
  }, [dispatch, createCartItem]);

  const updateCartItemInCart = React.useCallback((item) => {
    return updateCartItem({
      id: item.id,
      item,
    }).unwrap().then((data) => {
      dispatch(updateItem(data?.resource || {}));
      return data?.resource || {};
    });
  }, [dispatch, updateCartItem]);

  const removeItemFromCart = React.useCallback((item) => {
    return deleteCartItem(item.id).unwrap().then(() => {
      dispatch(removeItem(item));
    });
  }, [dispatch, deleteCartItem]);

  return {
    items,
    subTotal,
    getItems,
    addItem: addItemToCart,
    updateItem: updateCartItemInCart,
    removeItem: removeItemFromCart,
  };
}
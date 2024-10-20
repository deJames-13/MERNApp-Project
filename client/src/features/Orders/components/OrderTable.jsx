import { ActionButtons, Table } from '@common';
import { confirmDelete } from '@custom';
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orderApi } from '../order.api';
import OrderWrapper from './OrderWrapper';

const allowedColumns = () => [
  { key: 'name', label: 'Name' },
  { key: 'actions', label: '' },
  // More columns can be added here
];

const OrderTable = () => {
  const navigate = useNavigate();
  const { useGetOrdersMutation, useDeleteOrderMutation } = orderApi;
  const [orders, setOrders] = useState([]);
  const [getOrders, { isLoading, isError }] = useGetOrdersMutation();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const handleDelete = async (id) => {
    try {
      confirmDelete(async () => {
        await deleteOrder(id).unwrap();
        setOrders(orders.filter((order) => order.id !== id));
        toast.success('Order deleted successfully');
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getOrders().unwrap();
      setOrders(res.resource || []);
    };

    return () => {
      try {
        fetchOrders();
      } catch (error) {
        toast.error(error.message);
      }
    };
  }, [getOrders]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders</div>;
  if (!orders.length)
    return (
      <div className="flex items-center justify-center space-x-2 font-bold text-center">
        <span>No data found! Create one. </span>
        <Button
          color="primary"
          className="my-4"
          onClick={() => navigate('/dashboard/orders/create')}
        >
          <FaPlus />
        </Button>
      </div>
    );
  return (
    <>
      <OrderWrapper title="Orders Table">
        <Table
          data={orders.map((order) => ({
            ...order,
            actions: (
              <ActionButtons
                key={'action_' + order.slug}
                className="flex justify-end"
                isLoading={isDeleting}
                onDelete={() => handleDelete(order.id)}
                onEdit={() => navigate(`/dashboard/orders/${order.slug}/edit`)}
                onView={() => navigate(`/dashboard/orders/${order.slug}/view`)}
              />
            ),
          }))}
          columns={allowedColumns()}
        />
      </OrderWrapper>
    </>
  );
};

export default OrderTable;

import { ActionButtons, Table } from '@common';
import { confirmDelete } from '@custom';
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { courierApi } from '../courier.api';
import CourierWrapper from './CourierWrapper';

const allowedColumns = () => [
  { key: 'name', label: 'Name' },
  { key: 'contactNumber', label: 'Contact Number' },
  { key: 'serviceArea', label: 'Service Area' },
  { key: 'image', label: 'Courier Image' },
  { key: 'actions', label: '' },
  // More columns can be added here
];

const CourierTable = () => {
  const navigate = useNavigate();
  const { useGetCouriersMutation, useDeleteCourierMutation } = courierApi;
  const [couriers, setCouriers] = useState([]);
  const [getCouriers, { isLoading, isError }] = useGetCouriersMutation();
  const [deleteCourier, { isLoading: isDeleting }] = useDeleteCourierMutation();

  const handleDelete = async (id) => {
    try {
      confirmDelete(async () => {
        await deleteCourier(id).unwrap();
        setCouriers(couriers.filter((courier) => courier.id !== id));
        toast.success('Courier deleted successfully');
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchCouriers = async () => {
      const res = await getCouriers().unwrap();
      setCouriers(res.resource || []);
    };

    return () => {
      try {
        fetchCouriers();
      } catch (error) {
        toast.error(error.message);
      }
    };
  }, [getCouriers]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading couriers</div>;
  if (!couriers.length)
    return (
      <div className="flex items-center justify-center space-x-2 font-bold text-center">
        <span>No data found! Create one. </span>
        <Button
          color="primary"
          className="my-4"
          onClick={() => navigate('/dashboard/couriers/create')}
        >
          <FaPlus />
        </Button>
      </div>
    );
  return (
    <>
      <CourierWrapper title="Couriers Table">
        <Table
          data={couriers.map((courier) => ({
            ...courier,
            actions: (
              <ActionButtons
                key={'action_' + courier.slug}
                className="flex justify-end"
                isLoading={isDeleting}
                onDelete={() => handleDelete(courier.id)}
                onEdit={() => navigate(`/dashboard/couriers/${courier.slug}/edit`)}
                onView={() => navigate(`/dashboard/couriers/${courier.slug}/view`)}
              />
            ),
          }))}
          columns={allowedColumns()}
        />
      </CourierWrapper>
    </>
  );
};

export default CourierTable;

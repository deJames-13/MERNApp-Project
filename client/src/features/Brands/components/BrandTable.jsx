import { ActionButtons, Table } from '@common';
import { confirmDelete } from '@custom';
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { brandApi } from '../brand.api';
import BrandWrapper from './BrandWrapper';

const allowedColumns = () => [
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
  { key: 'actions', label: '' },
  // More columns can be added here
];

const BrandTable = () => {
  const navigate = useNavigate();
  const { useGetBrandsMutation, useDeleteBrandMutation } = brandApi;
  const [brands, setBrands] = useState([]);
  const [getBrands, { isLoading, isError }] = useGetBrandsMutation();
  const [deleteBrand, { isLoading: isDeleting }] = useDeleteBrandMutation();

  const handleDelete = async (id) => {
    try {
      confirmDelete(async () => {
        await deleteBrand(id).unwrap();
        setBrands(brands.filter((brand) => brand.id !== id));
        toast.success('Brand deleted successfully');
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await getBrands().unwrap();
      setBrands(res.resource || []);
    };

    return () => {
      try {
        fetchBrands();
      } catch (error) {
        toast.error(error.message);
      }
    };
  }, [getBrands]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading brands</div>;
  if (!brands.length)
    return (
      <div className="flex items-center justify-center space-x-2 font-bold text-center">
        <span>No data found! Create one. </span>
        <Button
          color="primary"
          className="my-4"
          onClick={() => navigate('/dashboard/brands/create')}
        >
          <FaPlus />
        </Button>
      </div>
    );
  return (
    <>
      <BrandWrapper title="Brands Table">
        <Table
          data={brands.map((brand) => ({
            ...brand,
            actions: (
              <ActionButtons
                key={'action_' + brand.slug}
                className="flex justify-end"
                isLoading={isDeleting}
                onDelete={() => handleDelete(brand.id)}
                onEdit={() => navigate(`/dashboard/brands/${brand.slug}/edit`)}
                onView={() => navigate(`/dashboard/brands/${brand.slug}/view`)}
              />
            ),
          }))}
          columns={allowedColumns()}
        />
      </BrandWrapper>
    </>
  );
};

export default BrandTable;

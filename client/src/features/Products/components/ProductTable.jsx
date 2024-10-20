import { ActionButtons, Table } from '@common';
import { confirmDelete } from '@custom';
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productApi } from '../product.api';
import ProductWrapper from './ProductWrapper';

const allowedColumns = () => [
  { key: 'name', label: 'Name' },
  { key: 'actions', label: '' },
  // More columns can be added here
];

const ProductTable = () => {
  const navigate = useNavigate();
  const { useGetProductsMutation, useDeleteProductMutation } = productApi;
  const [products, setProducts] = useState([]);
  const [getProducts, { isLoading, isError }] = useGetProductsMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    try {
      confirmDelete(async () => {
        await deleteProduct(id).unwrap();
        setProducts(products.filter((product) => product.id !== id));
        toast.success('Product deleted successfully');
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts().unwrap();
      setProducts(res.resource || []);
    };

    return () => {
      try {
        fetchProducts();
      } catch (error) {
        toast.error(error.message);
      }
    };
  }, [getProducts]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;
  if (!products.length)
    return (
      <div className="flex items-center justify-center space-x-2 font-bold text-center">
        <span>No data found! Create one. </span>
        <Button
          color="primary"
          className="my-4"
          onClick={() => navigate('/dashboard/products/create')}
        >
          <FaPlus />
        </Button>
      </div>
    );
  return (
    <>
      <ProductWrapper title="Products Table">
        <Table
          data={products.map((product) => ({
            ...product,
            actions: (
              <ActionButtons
                key={'action_' + product.slug}
                className="flex justify-end"
                isLoading={isDeleting}
                onDelete={() => handleDelete(product.id)}
                onEdit={() => navigate(`/dashboard/products/${product.slug}/edit`)}
                onView={() => navigate(`/dashboard/products/${product.slug}/view`)}
              />
            ),
          }))}
          columns={allowedColumns()}
        />
      </ProductWrapper>
    </>
  );
};

export default ProductTable;

import { ActionButtons, Table } from '@common';
import { confirmDelete } from '@custom';
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { categoryApi } from '../category.api';
import CategoryWrapper from './CategoryWrapper';

const allowedColumns = () => [
  { key: 'name', label: 'Name' },
  { key: 'actions', label: '' },
  // More columns can be added here
];

const CategoryTable = () => {
  const navigate = useNavigate();
  const { useGetCategoriesMutation, useDeleteCategoryMutation } = categoryApi;
  const [categories, setCategories] = useState([]);
  const [getCategories, { isLoading, isError }] = useGetCategoriesMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const handleDelete = async (id) => {
    try {
      confirmDelete(async () => {
        await deleteCategory(id).unwrap();
        setCategories(categories.filter((category) => category.id !== id));
        toast.success('Category deleted successfully');
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories().unwrap();
      setCategories(res.resource || []);
    };

    return () => {
      try {
        fetchCategories();
      } catch (error) {
        toast.error(error.message);
      }
    };
  }, [getCategories]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading categories</div>;
  if (!categories.length)
    return (
      <div className="flex items-center justify-center space-x-2 font-bold text-center">
        <span>No data found! Create one. </span>
        <Button
          color="primary"
          className="my-4"
          onClick={() => navigate('/dashboard/categories/create')}
        >
          <FaPlus />
        </Button>
      </div>
    );
  return (
    <>
      <CategoryWrapper title="Categories Table">
        <Table
          data={categories.map((category) => ({
            ...category,
            actions: (
              <ActionButtons
                key={'action_' + category.slug}
                className="flex justify-end"
                isLoading={isDeleting}
                onDelete={() => handleDelete(category.id)}
                onEdit={() => navigate(`/dashboard/categories/${category.slug}/edit`)}
                onView={() => navigate(`/dashboard/categories/${category.slug}/view`)}
              />
            ),
          }))}
          columns={allowedColumns()}
        />
      </CategoryWrapper>
    </>
  );
};

export default CategoryTable;

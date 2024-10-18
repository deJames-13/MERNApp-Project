// import { ActionButtons, Table } from '@common';
// import { confirmDelete } from '@custom';
// import { useEffect, useState } from 'react';
// import { Button } from 'react-daisyui';
// import { FaPlus } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { supplierApi } from '../supplier.api';
// import SupplierWrapper from './SupplierWrapper';

// const allowedColumns = () => [
//   { key: 'name', label: 'Name' },
//   { key: 'emailAddress', label: 'Email Address' },
//   { key: 'contactNumber', label: 'Contact Number' },
//   { key: 'image', label: 'Courier Image' },
//   { key: 'actions', label: '' },
//   // More columns can be added here
// ];

// const SupplierTable = () => {
//   const navigate = useNavigate();
//   const { useGetSuppliersMutation, useDeleteSupplierMutation } = supplierApi;
//   const [suppliers, setSuppliers] = useState([]);
//   const [getSuppliers, { isLoading, isError }] = useGetSuppliersMutation();
//   const [deleteSupplier, { isLoading: isDeleting }] = useDeleteSupplierMutation();

//   const handleDelete = async (id) => {
//     try {
//       confirmDelete(async () => {
//         await deleteSupplier(id).unwrap();
//         setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
//         toast.success('Supplier deleted successfully');
//       });
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     const fetchSuppliers = async () => {
//       const res = await getSuppliers().unwrap();
//       setSuppliers(res.resource || []);
//     };

//     return () => {
//       try {
//         fetchSuppliers();
//       } catch (error) {
//         toast.error(error.message);
//       }
//     };
//   }, [getSuppliers]);

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error loading suppliers</div>;
//   if (!suppliers.length)
//     return (
//       <div className="flex items-center justify-center space-x-2 font-bold text-center">
//         <span>No data found! Create one. </span>
//         <Button
//           color="primary"
//           className="my-4"
//           onClick={() => navigate('/dashboard/suppliers/create')}
//         >
//           <FaPlus />
//         </Button>
//       </div>
//     );
//   return (
//     <>
//       <SupplierWrapper title="Suppliers Table">
//         <Table
//           data={suppliers.map((supplier) => ({
//             ...supplier,
//             actions: (
//               <ActionButtons
//                 key={'action_' + supplier.slug}
//                 className="flex justify-end"
//                 isLoading={isDeleting}
//                 onDelete={() => handleDelete(supplier.id)}
//                 onEdit={() => navigate(`/dashboard/suppliers/${supplier.slug}/edit`)}
//                 onView={() => navigate(`/dashboard/suppliers/${supplier.slug}/view`)}
//               />
//             ),
//           }))}
//           columns={allowedColumns()}
//         />
//       </SupplierWrapper>
//     </>
//   );
// };

// export default SupplierTable;



import { ActionButtons, Table } from '@common';
import { confirmDelete } from '@custom';
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supplierApi } from '../supplier.api';
import SupplierWrapper from './SupplierWrapper';

const allowedColumns = () => [
  { key: 'name', label: 'Name' },
  { key: 'emailAddress', label: 'Email Address' },
  { key: 'contactNumber', label: 'Contact Number' },
  { key: 'image', label: 'Supplier Image' },  // Updated column label
  { key: 'actions', label: '' },
  // More columns can be added here
];

const SupplierTable = () => {
  const navigate = useNavigate();
  const { useGetSuppliersMutation, useDeleteSupplierMutation } = supplierApi;
  const [suppliers, setSuppliers] = useState([]);
  const [getSuppliers, { isLoading, isError }] = useGetSuppliersMutation();
  const [deleteSupplier, { isLoading: isDeleting }] = useDeleteSupplierMutation();

  const handleDelete = async (id) => {
    try {
      confirmDelete(async () => {
        await deleteSupplier(id).unwrap();
        setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
        toast.success('Supplier deleted successfully');
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      const res = await getSuppliers().unwrap();
      setSuppliers(res.resource || []);
    };

    return () => {
      try {
        fetchSuppliers();
      } catch (error) {
        toast.error(error.message);
      }
    };
  }, [getSuppliers]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading suppliers</div>;
  if (!suppliers.length)
    return (
      <div className="flex items-center justify-center space-x-2 font-bold text-center">
        <span>No data found! Create one. </span>
        <Button
          color="primary"
          className="my-4"
          onClick={() => navigate('/dashboard/suppliers/create')}
        >
          <FaPlus />
        </Button>
      </div>
    );

  return (
    <>
      <SupplierWrapper title="Suppliers Table">
        <Table
          data={suppliers.map((supplier) => ({
            ...supplier,
            actions: (
              <ActionButtons
                key={'action_' + supplier.slug}
                className="flex justify-end"
                isLoading={isDeleting}
                onDelete={() => handleDelete(supplier.id)}
                onEdit={() => navigate(`/dashboard/suppliers/${supplier.slug}/edit`)}
                onView={() => navigate(`/dashboard/suppliers/${supplier.slug}/view`)}
              />
            ),
          }))}
          columns={allowedColumns()}
        />
      </SupplierWrapper>
    </>
  );
};

export default SupplierTable;

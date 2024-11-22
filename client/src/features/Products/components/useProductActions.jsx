
import { ActionButtons, useSlug } from '@common';
import { Checkbox } from "@common/components/ui/checkbox";
import { confirmDelete, confirmSave, requestError, toFormData } from '@custom';
import { ArrowUpDown } from "lucide-react";
import { useMemo, useState } from 'react';
import { Button } from "react-daisyui";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productApi } from '../product.api';
import { getAltFields, getFields } from '../product.fields';


const fields = typeof getFields === 'function' ? getFields() : getFields || [];
const altFields = typeof getAltFields === 'function' ? getAltFields() : getAltFields || [];
const images = [
  {
    src: "https://placehold.co/600",
    alt: "n/a",
  },
]

const makeData = (products, handleDelete, toggleExpand) => {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    stock: `${product.stock}`,
    price: `${product.price}`,
    details: product.details, // for expandable rows
    image: product.image,
    actions: { id: product.id, handleDelete },
    isExpanded: false, // for controlling row expansion
    ...product,
    toggleExpand,
  }));
};

const makeColumns = (navigate, toggleExpand) => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => <img src={row.getValue("image")} alt="Product" className="w-16 h-16" />,
    enableSorting: false,
    enableHiding: false,
    enableCustomFilter: false,
  },
  ...["name", "stock", "price"].map((key) => ({
    accessorKey: key,
    header: ({ column }) => (
      <Button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="bg-transparent border-none btn-sm capitalize"
      >
        {key}
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <p className="px-3">{row.getValue(key)}</p>,
  })),
  {
    id: "expand",
    header: "Details",
    cell: ({ row }) => (
      <>
        <Button
          className="btn-xs"
          onClick={() => row.original.toggleExpand(row.original.id)}
        >
          {row.original.isExpanded ? "Collapse" : "Expand"}
        </Button>
        {row.original.isExpanded && <p className="px-3 text-sm break-all">{row.original.description}</p>}
      </>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionButtons
        onDelete={() => row.getValue("actions").handleDelete(row.getValue("actions").id)}
        onEdit={() => navigate(`/dashboard/products/${row.original.slug}/edit`)}
        onView={() => navigate(`/dashboard/products/${row.original.slug}/view`)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];


const useProductActions = ({ id, action = 'create' } = {}) => {

  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();

  const {
    useGetProductsMutation,
    useDeleteProductMutation,
    useCreateProductMutation,
    useUpdateProductMutation,
    useGetProductMutation,
  } = productApi;

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [getProduct, { isLoading: isFetching }] = useGetProductMutation();
  const [getProducts] = useGetProductsMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [previewImages, setPreviewImages] = useState(images);
  const [productSchema, setProductSchema] = useState(fields);

  const [selectedRows, setSelectedRows] = useState([]);

  const { slug, setSlug } = useSlug();

  const initialValues = useMemo(
    () =>
      productSchema.reduce((acc, field) => {
        acc[field.name] = action === 'create' ? '' : product?.[field.name] ?? '';
        return acc;
      }, {}),
    [product, productSchema, action]
  );
  /* END DECLARATIONS ################################################ */
  const fetchProduct = async () => {
    return getProduct(slug).then((res) => {
      if (res.error) {
        toast.error(res.error.data.message);
        navigate('/dashboard/products/table');
      } else if (res.data) setProduct(res.data.resource);
    });
  };

  const handleImageInput = (e) => {
    const files = e.target.files;
    const images = Array.from(files).map((file) => {
      return {
        src: URL.createObjectURL(file),
        alt: file.name,
        file,
      };
    });

    setPreviewImages(images);
  }

  const handleCreate = async (values) => {
    await createProduct(values).unwrap();
    navigate('/dashboard/products/table');
    toast.success('Create successful!');
  };

  const handleUpdate = async (values) => {
    const res = await updateProduct({ id: product.id, product: values }).unwrap();
    const updatedProduct = res?.resource || { ...product, ...values };
    setSlug(updatedProduct.slug);
    toast.success('Update successful!');
  };

  const onSubmit = async (values) => {
    confirmSave(async () => handleSubmit(values));
  };

  const handleSubmit = async (values) => {
    try {
      values = toFormData(values);
      if (action === 'create') await handleCreate(values);
      else await handleUpdate(values);
    } catch (error) {
      requestError(error);
    }
  };


  const fetchProducts = async (qStr) => {
    return getProducts(qStr).unwrap().then(res => {
      setProducts(res.resource || []);
    });
  };


  const toggleExpand = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isExpanded: !p.isExpanded } : p))
    );
  };

  const handleDelete = async (id) => {
    try {
      confirmDelete(async () => {
        await deleteProduct(id).unwrap();
        setProducts(products.filter((product) => product.id !== id));
        toast.success("Product deleted successfully");
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedRows.length) return;
    confirmDelete(async () => {
      Promise.all(selectedRows.map((row) => deleteProduct(row.id).unwrap())).then(() => {
        setProducts(products.filter((product) => !selectedRows.some((row) => row.id === product.id)));
        setSelectedRows([]);
        toast.success("Selected products deleted successfully");
      });
    });
  };

  const table = {
    data: makeData(products, handleDelete, toggleExpand),
    columns: makeColumns(navigate, toggleExpand),
    rowCount: products.length,
    selectionFunc: (rows) => setSelectedRows(rows),
  }



  return {
    fields,
    altFields,
    slug,
    product,
    products,
    table,
    selectedRows,
    initialValues,
    productSchema,
    previewImages,
    isCreating,
    isUpdating,
    isFetching,
    setSlug,
    setProductSchema,
    fetchProduct,
    fetchProducts,
    handleImageInput,
    onSubmit,
    handleSubmit,
    handleDelete,
    handleBulkDelete,
  };
};

export default useProductActions;
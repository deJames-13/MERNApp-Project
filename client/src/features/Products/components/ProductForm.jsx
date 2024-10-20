import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';

import { useSlug } from '@common';
import { FormikForm } from '@common/components';
import { confirmSave, requestError, toFormData } from '@custom';
import { CarouselComponent } from '@custom/components';
import { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productApi } from '../product.api';
import { getAltFields, getFields } from '../product.fields';
import { productValidation } from '../product.validation';
import ProductWrapper from './ProductWrapper';

const fields = typeof getFields === 'function' ? getFields() : getFields || [];
const altFields = typeof getAltFields === 'function' ? getAltFields() : getAltFields || [];

const images = [
  {
    src: "https://placehold.co/600",
    alt: "n/a",
  },
]

const ProductForm = ({ title = 'Product Form', action = 'create' }) => {
  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [productSchema, setProductSchema] = useState(fields);
  const [createProduct, { isLoading: isCreating }] = productApi.useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = productApi.useUpdateProductMutation();
  const [getProduct, { isLoading: isFetching }] = productApi.useGetProductMutation();
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

  const handleImageInput = (e) => {
    const files = e.target.files;
    const images = Array.from(files).map((file) => URL.createObjectURL(file));
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

  useEffect(() => {
    const fetchProduct = async () => {
      getProduct(slug).then((res) => {
        if (res.error) {
          toast.error(res.error.data.message);
          navigate('/dashboard/products/table');
        } else if (res.data) setProduct(res.data.resource);
        console.log(res.data.resource);

      });
    };

    if (slug) fetchProduct();
    else setProductSchema(action === 'create' ? fields : altFields);
  }, [action, slug, getProduct, navigate]);

  return (
    <ProductWrapper
      title={title}
      prevUrl="/dashboard/products/table"
    >
      <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start">

        <div className="container lg:w-1/3 w-96 aspect-square">
          <CarouselComponent imageList={
            product?.images?.length ?
              product?.images.map((image) => ({ src: image.url, alt: image.alt }))
              : images} />
        </div>


        <div className="container w-2/3">

          <FormikForm
            formSchema={productSchema}
            formikProps={{
              initialValues,
              validationSchema: productValidation,
              onSubmit: onSubmit,
              enableReinitialize: true,
            }}
            className="grid grid-cols-3 gap-8"
            element={({ isSubmitting, values }) => {
              const isFormChanged = !isEqual(initialValues, values);
              const isProcessing = isSubmitting || isCreating || isUpdating;
              const isButtonDisabled = isProcessing || isFetching || !isFormChanged;

              return (
                <div className="flex w-full col-span-3">
                  <Button
                    variant="outline"
                    type="submit"
                    color="primary"
                    className="max-w-md"
                    disabled={isButtonDisabled}
                  >
                    {isProcessing && <span className="loading loading-spinner"></span>}
                    {action === 'create' ? 'Create Product' : 'Update Product'}
                  </Button>
                </div>
              );
            }}
          />
        </div>
      </div>
    </ProductWrapper>
  );
};

ProductForm.propTypes = {
  action: PropTypes.oneOf(['create', 'edit', 'view']),
  title: PropTypes.string,
};

export default ProductForm;

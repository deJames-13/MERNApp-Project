import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';

import { FormikForm } from '@common/components';
import { CarouselComponent } from '@custom/components';
import { useEffect } from 'react';
import { Button } from 'react-daisyui';
import { productValidation } from '../product.validation';
import ProductWrapper from './ProductWrapper';
import useProductActions from './useProductActions';



const ProductForm = ({ title = 'Product Form', action = 'create' }) => {
  const {
    slug,
    product,
    initialValues,
    productSchema,
    setProductSchema,
    previewImages,
    isCreating,
    isUpdating,
    isFetching,
    fetchProduct,
    handleImageInput,
    onSubmit,
    fields,
  } = useProductActions({ action });



  useEffect(() => {
    if (slug) fetchProduct();
    else setProductSchema(action === 'create' ? fields : fields);
  }, [action, slug]);



  return (
    <ProductWrapper
      title={title}
    >
      <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start">

        <div className="container lg:w-1/3 w-96 aspect-square">
          <CarouselComponent imageList={
            product?.images?.length ?
              product?.images.map((image) => ({ src: image.url, alt: image.alt }))
              : previewImages} />
        </div>


        <div className="container w-2/3">

          <FormikForm
            formSchema={productSchema.map(f => f.name === 'image' ? { ...f, onChange: handleImageInput } : f)}
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

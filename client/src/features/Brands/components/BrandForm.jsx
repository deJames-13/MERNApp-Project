import { useSlug } from '@common';
import { FormikForm } from '@common/components';
import { confirmSave, requestError, toFormData } from '@custom';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { brandApi } from '../brand.api';
import { getAltFields, getFields } from '../brand.fields';
import { brandValidation } from '../brand.validation';
import BrandWrapper from './BrandWrapper';

const fields = typeof getFields === 'function' ? getFields() : getFields || [];
const altFields = typeof getAltFields === 'function' ? getAltFields() : getAltFields || [];

const BrandForm = ({ title = 'Brand Form', action = 'create' }) => {
  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [brandSchema, setBrandSchema] = useState(fields);
  const [createBrand, { isLoading: isCreating }] = brandApi.useCreateBrandMutation();
  const [updateBrand, { isLoading: isUpdating }] = brandApi.useUpdateBrandMutation();
  const [getBrand, { isLoading: isFetching }] = brandApi.useGetBrandMutation();
  const { slug, setSlug } = useSlug();

  const initialValues = useMemo(
    () =>
      brandSchema.reduce((acc, field) => {
        acc[field.name] = action === 'create' ? '' : brand?.[field.name] ?? '';
        return acc;
      }, {}),
    [brand, brandSchema, action]
  );
  /* END DECLARATIONS ################################################ */

  const handleCreate = async (values) => {
    await createBrand(values).unwrap();
    navigate('/dashboard/brands/table');
    toast.success('Create successful!');
  };

  const handleUpdate = async (values) => {
    const res = await updateBrand({ id: brand.id, brand: values }).unwrap();
    const updatedBrand = res?.resource || { ...brand, ...values };
    setSlug(updatedBrand.slug);
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
    const fetchBrand = async () => {
      getBrand(slug).then((res) => {
        if (res.error) {
          toast.error(res.error.data.message);
          navigate('/dashboard/brands/table');
        } else if (res.data) setBrand(res.data.resource);
      });
    };

    if (slug) fetchBrand();
    else setBrandSchema(action === 'create' ? fields : altFields);
  }, [action, slug, getBrand, navigate]);

  return (
    <BrandWrapper
      title={title}
      prevUrl="/dashboard/brands/table"
    >
      <FormikForm
        formSchema={brandSchema}
        formikProps={{
          initialValues,
          validationSchema: brandValidation,
          onSubmit: onSubmit,
          enableReinitialize: true,
        }}
        className="flex flex-wrap gap-8"
        element={({ isSubmitting, values }) => {
          const isFormChanged = !isEqual(initialValues, values);
          const isProcessing = isSubmitting || isCreating || isUpdating;
          const isButtonDisabled = isProcessing || isFetching || !isFormChanged;

          return (
            <div className="flex w-full">
              <Button
                variant="outline"
                type="submit"
                color="primary"
                className="max-w-md"
                disabled={isButtonDisabled}
              >
                {isProcessing && <span className="loading loading-spinner"></span>}
                {action === 'create' ? 'Create Brand' : 'Update Brand'}
              </Button>
            </div>
          );
        }}
      />
    </BrandWrapper>
  );
};

BrandForm.propTypes = {
  action: PropTypes.oneOf(['create', 'edit', 'view']),
  title: PropTypes.string,
};

export default BrandForm;

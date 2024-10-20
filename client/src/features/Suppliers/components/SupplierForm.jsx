import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';

import { useSlug } from '@common';
import { FormikForm } from '@common/components';
import { confirmSave, requestError, toFormData } from '@custom';
import { CarouselComponent } from '@custom/components'; // CAROUSEL
import { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supplierApi } from '../supplier.api';
import { getAltFields, getFields } from '../supplier.fields';
import { supplierValidation } from '../supplier.validation';
import SupplierWrapper from './SupplierWrapper';

const fields = typeof getFields === 'function' ? getFields() : getFields || [];
const altFields = typeof getAltFields === 'function' ? getAltFields() : getAltFields || [];// CAROUSEL
const images = [
  {
    src: "https://placehold.co/600",
    alt: "n/a",
  },
]

const SupplierForm = ({ title = 'Supplier Form', action = 'create' }) => {
  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [supplierSchema, setSupplierSchema] = useState(fields);
  const [createSupplier, { isLoading: isCreating }] = supplierApi.useCreateSupplierMutation();
  const [updateSupplier, { isLoading: isUpdating }] = supplierApi.useUpdateSupplierMutation();
  const [getSupplier, { isLoading: isFetching }] = supplierApi.useGetSupplierMutation();
  const { slug, setSlug } = useSlug();

  const initialValues = useMemo(
    () =>
      supplierSchema.reduce((acc, field) => {
        acc[field.name] = action === 'create' ? '' : supplier?.[field.name] ?? '';
        return acc;
      }, {}),
    [supplier, supplierSchema, action]
  );
  /* END DECLARATIONS ################################################ */

  const handleCreate = async (values) => {
    await createSupplier(values).unwrap();
    navigate('/dashboard/suppliers/table');
    toast.success('Create successful!');
  };

  const handleUpdate = async (values) => {
    const res = await updateSupplier({ id: supplier.id, supplier: values }).unwrap();
    const updatedSupplier = res?.resource || { ...supplier, ...values };
    setSlug(updatedSupplier.slug);
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
    const fetchSupplier = async () => {
      getSupplier(slug).then((res) => {
        if (res.error) {
          toast.error(res.error.data.message);
          navigate('/dashboard/suppliers/table');
        } else if (res.data) setSupplier(res.data.resource);
      });
    };

    if (slug) fetchSupplier();
    else setSupplierSchema(action === 'create' ? fields : altFields);
  }, [action, slug, getSupplier, navigate]);

  return (
    <SupplierWrapper
      title={title}
      prevUrl="/dashboard/suppliers/table"
    >


      <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start">

        {/* CAROUSEL */}
        <div className="container lg:w-1/3 w-96">
          <CarouselComponent imageList={
            supplier?.images?.length ?
              supplier?.images.map((image) => ({ src: image.url, alt: image.alt }))
              : images} />
        </div>

        <div className="container w-2/3">
          <FormikForm
            formSchema={supplierSchema}
            formikProps={{
              initialValues,
              validationSchema: supplierValidation,
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
                    {action === 'create' ? 'Create Supplier' : 'Update Supplier'}
                  </Button>
                </div>
              );
            }}
          />
        </div>
      </div>
    </SupplierWrapper>
  );
};

SupplierForm.propTypes = {
  action: PropTypes.oneOf(['create', 'edit', 'view']),
  title: PropTypes.string,
};

export default SupplierForm;

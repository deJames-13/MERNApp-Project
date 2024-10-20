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
import { courierApi } from '../courier.api';
import { getAltFields, getFields } from '../courier.fields';
import { courierValidation } from '../courier.validation';
import CourierWrapper from './CourierWrapper';

const fields = typeof getFields === 'function' ? getFields() : getFields || [];
const altFields = typeof getAltFields === 'function' ? getAltFields() : getAltFields || [];
// CAROUSEL
const images = [
  {
    src: "https://placehold.co/600",
    alt: "n/a",
  },
]

const CourierForm = ({ title = 'Courier Form', action = 'create' }) => {
  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();
  const [courier, setCourier] = useState(null);
  const [courierSchema, setCourierSchema] = useState(fields);
  const [createCourier, { isLoading: isCreating }] = courierApi.useCreateCourierMutation();
  const [updateCourier, { isLoading: isUpdating }] = courierApi.useUpdateCourierMutation();
  const [getCourier, { isLoading: isFetching }] = courierApi.useGetCourierMutation();
  const { slug, setSlug } = useSlug();

  const initialValues = useMemo(
    () =>
      courierSchema.reduce((acc, field) => {
        acc[field.name] = action === 'create' ? '' : courier?.[field.name] ?? '';
        return acc;
      }, {}),
    [courier, courierSchema, action]
  );
  /* END DECLARATIONS ################################################ */

  const handleCreate = async (values) => {
    await createCourier(values).unwrap();
    navigate('/dashboard/couriers/table');
    toast.success('Create successful!');
  };

  const handleUpdate = async (values) => {
    const res = await updateCourier({ id: courier.id, courier: values }).unwrap();
    const updatedCourier = res?.resource || { ...courier, ...values };
    setSlug(updatedCourier.slug);
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
    const fetchCourier = async () => {
      getCourier(slug).then((res) => {
        if (res.error) {
          toast.error(res.error.data.message);
          navigate('/dashboard/couriers/table');
        } else if (res.data) setCourier(res.data.resource);
        console.log(res.data.resource);
      });
    };

    if (slug) fetchCourier();
    else setCourierSchema(action === 'create' ? fields : altFields);
  }, [action, slug, getCourier, navigate]);

  return (
    <CourierWrapper
      title={title}
      prevUrl="/dashboard/couriers/table"
    >
      <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start">

        {/* CAROUSEL */}
        <div className="container lg:w-1/3 w-96">
          <CarouselComponent imageList={
            courier?.images?.length ?
              courier?.images.map((image) => ({ src: image.url, alt: image.alt }))
              : images} />
        </div>

        <div className="container w-2/3">
          <FormikForm
            formSchema={courierSchema}
            formikProps={{
              initialValues,
              validationSchema: courierValidation,
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
                    {action === 'create' ? 'Create Courier' : 'Update Courier'}
                  </Button>
                </div>
              );
            }}
          />
        </div>
      </div>
    </CourierWrapper>
  );
};

CourierForm.propTypes = {
  action: PropTypes.oneOf(['create', 'edit', 'view']),
  title: PropTypes.string,
};

export default CourierForm;

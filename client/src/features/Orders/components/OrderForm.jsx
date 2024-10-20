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
import { orderApi } from '../order.api';
import { getAltFields, getFields } from '../order.fields';
import { orderValidation } from '../order.validation';
import OrderWrapper from './OrderWrapper';

const fields = typeof getFields === 'function' ? getFields() : getFields || [];
const altFields = typeof getAltFields === 'function' ? getAltFields() : getAltFields || [];
// CAROUSEL
const images = [
  {
    src: "https://placehold.co/600",
    alt: "n/a",
  },
]

const OrderForm = ({ title = 'Order Form', action = 'create' }) => {
  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [orderSchema, setOrderSchema] = useState(fields);
  const [createOrder, { isLoading: isCreating }] = orderApi.useCreateOrderMutation();
  const [updateOrder, { isLoading: isUpdating }] = orderApi.useUpdateOrderMutation();
  const [getOrder, { isLoading: isFetching }] = orderApi.useGetOrderMutation();
  const { slug, setSlug } = useSlug();
  /* END DECLARATIONS ################################################ */

  const initialValues = useMemo(
    () =>
      orderSchema.reduce((acc, field) => {
        acc[field.name] = action === 'create' ? '' : order?.[field.name] ?? '';
        return acc;
      }, {}),
    [order, orderSchema, action]
  );

  const handleCreate = async (values) => {
    await createOrder(values).unwrap();
    navigate('/dashboard/orders/table');
    toast.success('Create successful!');
  };

  const handleUpdate = async (values) => {
    const res = await updateOrder({ id: order.id, order: values }).unwrap();
    const updatedOrder = res?.resource || { ...order, ...values };
    setSlug(updatedOrder.slug);
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
    const fetchOrder = async () => {
      getOrder(slug).then((res) => {
        if (res.error) {
          toast.error(res.error.data.message);
          navigate('/dashboard/orders/table');
        } else if (res.data) setOrder(res.data.resource);
      });
    };

    if (slug) fetchOrder();
    else setOrderSchema(action === 'create' ? fields : altFields);
  }, [action, slug, getOrder, navigate]);

  return (
    <OrderWrapper
      title={title}
      prevUrl="/dashboard/orders/table"
    >

      <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start">

        {/* CAROUSEL */}
        <div className="container lg:w-1/3 w-96">
          <CarouselComponent images={
            order?.images?.length ?
              order?.images.map((image) => ({ src: image.url, alt: image.alt }))
              : images} />
        </div>

        <div className="container w-2/3">
          <FormikForm
            formSchema={orderSchema}
            formikProps={{
              initialValues,
              validationSchema: orderValidation,
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
                    {action === 'create' ? 'Create Order' : 'Update Order'}
                  </Button>
                </div>
              );
            }}
          />
        </div>
      </div>
    </OrderWrapper>
  );
};

OrderForm.propTypes = {
  action: PropTypes.oneOf(['create', 'edit', 'view']),
  title: PropTypes.string,
};

export default OrderForm;

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
import { _exampleApi } from '../_example.api';
import { getAltFields, getFields } from '../_example.fields';
import { _exampleValidation } from '../_example.validation';
import _ExampleWrapper from './_ExampleWrapper';

const fields = typeof getFields === 'function' ? getFields() : getFields || [];
const altFields = typeof getAltFields === 'function' ? getAltFields() : getAltFields || [];
// CAROUSEL
const images = [
  {
    src: "https://placehold.co/600",
    alt: "n/a",
  },
]

const _ExampleForm = ({ title = '_Example Form', action = 'create' }) => {
  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();
  const [_example, set_Example] = useState(null);
  const [_exampleSchema, set_ExampleSchema] = useState(fields);
  const [create_Example, { isLoading: isCreating }] = _exampleApi.useCreate_ExampleMutation();
  const [update_Example, { isLoading: isUpdating }] = _exampleApi.useUpdate_ExampleMutation();
  const [get_Example, { isLoading: isFetching }] = _exampleApi.useGet_ExampleMutation();
  const { slug, setSlug } = useSlug();
  /* END DECLARATIONS ################################################ */

  const initialValues = useMemo(
    () =>
      _exampleSchema.reduce((acc, field) => {
        acc[field.name] = action === 'create' ? '' : _example?.[field.name] ?? '';
        return acc;
      }, {}),
    [_example, _exampleSchema, action]
  );

  const handleCreate = async (values) => {
    await create_Example(values).unwrap();
    navigate('/dashboard/_examples/table');
    toast.success('Create successful!');
  };

  const handleUpdate = async (values) => {
    const res = await update_Example({ id: _example.id, _example: values }).unwrap();
    const updated_Example = res?.resource || { ..._example, ...values };
    setSlug(updated_Example.slug);
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
    const fetch_Example = async () => {
      get_Example(slug).then((res) => {
        if (res.error) {
          toast.error(res.error.data.message);
          navigate('/dashboard/_examples/table');
        } else if (res.data) set_Example(res.data.resource);
      });
    };

    if (slug) fetch_Example();
    else set_ExampleSchema(action === 'create' ? fields : altFields);
  }, [action, slug, get_Example, navigate]);

  return (
    <_ExampleWrapper
      title={title}
      prevUrl="/dashboard/_examples/table"
    >

      <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start">

        {/* CAROUSEL */}
        <div className="container lg:w-1/3 w-96">
          <CarouselComponent images={
            _example?.images?.length ?
              _example?.images.map((image) => ({ src: image.url, alt: image.alt }))
              : images} />
        </div>

        <div className="container w-2/3">
          <FormikForm
            formSchema={_exampleSchema}
            formikProps={{
              initialValues,
              validationSchema: _exampleValidation,
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
                    {action === 'create' ? 'Create _Example' : 'Update _Example'}
                  </Button>
                </div>
              );
            }}
          />
        </div>
      </div>
    </_ExampleWrapper>
  );
};

_ExampleForm.propTypes = {
  action: PropTypes.oneOf(['create', 'edit', 'view']),
  title: PropTypes.string,
};

export default _ExampleForm;

import { FormikForm, FormikInput } from '@common/components';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-daisyui';

const accSchema = [];
const accFormik = {
  initialValues: accSchema.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {}),
};
function AccountInformation(props) {
  return (
    <div className="w-full">
      <h1 className="font-extrabold text-xl  mb-4">Account Information</h1>
      <div className="divider"></div>
      <div className="form-wrapper">
        <FormikForm
          formikProps={{ ...accFormik, onSubmit: () => { } }}
          formSchema={accSchema}
          element={({ isSubmitting, ...rest }) => {
            return (
              <>
                <div className="top flex items-top gap-8">
                  <div className="right w-1/3 shadow-2xl p-4 py-8">
                    <div className="image-preview flex flex-col items-center gap-4">
                      <img
                        src="https://placehold.co/150"
                        alt="profile"
                        className="rounded-full w-2/3 aspect-square"
                      />
                      <div className="image-preview__edit">
                        <label
                          htmlFor="image"
                          className="btn btn-outline btn-xs"
                        >
                          Select Profile
                        </label>
                        <input
                          type="file"
                          id="image"
                          hidden
                        />
                      </div>
                    </div>
                  </div>
                  <div className="left flex flex-col gap-2">
                    {/* Full Name */}
                    <div className="flex gap-2 items-center">
                      <FormikInput
                        label="First Name"
                        name="first_name"
                        type="text"
                        {...rest}
                      />
                      <FormikInput
                        label="Last Name"
                        name="last_name"
                        type="text"
                        {...rest}
                      />
                    </div>

                    {/* Email */}
                    <FormikInput
                      label="Email"
                      name="email"
                      type="email"
                      {...rest}
                    />

                    {/* Contact */}
                    <FormikInput
                      label="Contact"
                      name="contact"
                      type="text"
                      {...rest}
                    />
                    {/* Birthday + Age (disabled) */}
                    <div className="flex gap-2 items-center">
                      <div className="w-full">
                        <FormikInput
                          label="Birthday"
                          name="birthday"
                          type="date"
                          {...rest}
                        />
                      </div>
                      <div className="w-1/3">
                        <FormikInput
                          label="Age"
                          name="age"
                          type="text"
                          disabled
                          {...rest}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bottom">
                  {/* Address */}
                  <FormikInput
                    label="Address"
                    name="address"
                    type="text"
                    {...rest}
                  />

                  {/* Street */}
                  <FormikInput
                    label="Street"
                    name="street"
                    type="text"
                    {...rest}
                  />

                  {/* City + province + zipcode */}
                  <div className="flex gap-2 items-center justify-between">
                    <FormikInput
                      label="City"
                      name="city"
                      type="text"
                      {...rest}
                    />
                    <FormikInput
                      label="Province"
                      name="province"
                      type="text"
                      {...rest}
                    />
                    <FormikInput
                      label="Zipcode"
                      name="zipcode"
                      type="text"
                      {...rest}
                    />
                  </div>
                </div>

                <Button
                  variant="outline"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}

AccountInformation.propTypes = {};

export default AccountInformation;


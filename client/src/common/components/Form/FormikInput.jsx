import { useField } from 'formik';
import PropTypes from 'prop-types';
import FloatingInput from './FloatingInput';
import FormInput from './FormInput';
import LongText from './LongText';


function FormikInput({ label, variant, ...props }) {
  const [field, meta] = useField(props);
  switch (variant) {
    case 'divider':
      return (
        <div className="divider"></div>
      )
    case 'textarea':
      return (
        <LongText
          label={label}
          meta={meta}
          {...field}
          {...props}
        />
      );
    case 'floating':
      return (
        <FloatingInput
          label={label}
          meta={meta}
          {...field}
          {...props}
        />
      );

    default:
      return (
        <FormInput
          label={label}
          meta={meta}
          {...field}
          {...props}
        />
      );
  }
}

FormikInput.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
};

export default FormikInput;

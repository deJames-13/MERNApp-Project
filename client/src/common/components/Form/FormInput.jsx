import PropTypes from 'prop-types';

function FormInput({ label, refer, meta, outerStyle, ...inputProps }) {
  return (
    <div className={outerStyle}>
      <label className={`${meta?.touched && meta?.error ? 'text-error' : 'text-base-content'}`}>{label}</label>
      <input
        className={`input input-bordered ${meta?.touched && meta?.error ? 'input-error' : 'input-primary'} w-full`}
        ref={refer}
        {...inputProps}
      />
      {meta?.touched && meta?.error && <div className="text-xs italic text-error">{meta?.error}</div>}
    </div>
  );
}

FormInput.propTypes = {
  label: PropTypes.string,
  outerStyle: PropTypes.string,
  refer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  meta: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default FormInput;

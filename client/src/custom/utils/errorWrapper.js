import { toast } from 'react-toastify';

const errorWrapper = (fn, onError = () => {}) => {
  try {
    return fn();
  } catch (e) {
    console.log(e);
    const errors = e?.data?.errors?.details;
    if (Array.isArray(errors)) {
      errors.forEach((error) => {
        toast.error(error?.msg || 'Error while performing action');
      });
    } else toast.error(e?.data?.message || 'Client Broken: Error while performing action.');
    return onError(e);
  }
};

const requestError = (error) => {
  try {
    const errors = error?.response?.data?.errors?.details;
    if (Array.isArray(errors)) {
      errors.forEach((error) => {
        toast.error(error?.msg || 'Error while performing action');
      });
    } else toast.error(error?.response?.data?.message || 'Client Broken: Error while performing action.');
  } catch (e) {
    console.log(e);
    toast.error('Client Broken: Error while performing action.');
  }
};

export { errorWrapper, requestError };


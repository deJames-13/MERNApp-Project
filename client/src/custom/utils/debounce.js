export const debounce = (func, delay) => {
  let debounceTimer;
  let isDelayed = false;

  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    isDelayed = true;

    debounceTimer = setTimeout(() => {
      isDelayed = false;
      func.apply(context, args);
    }, delay);

    if (isDelayed) {
      return () => {};
    } else {
      return func.apply(context, args);
    }
  };
};
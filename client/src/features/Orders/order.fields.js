const getFields = () => [
  { label: 'Name', name: 'name', type: 'text' },
  { label: 'Image', name: 'image', type: 'image', accept: 'image/*', multiple: true },
  // More getFields can be added here
];

const getAltFields = () => [
  { label: 'Name', name: 'name', type: 'text' },
  // alternate getFields can be added here
];

export { getAltFields, getFields };


const getFields = () => [
  { label: 'Name', name: 'name', type: 'text' },
  { label: 'Contact Number', name: 'contactNumber', type: 'text' },
  { label: 'Service Area', name: 'serviceArea', type: 'text' },
  { label: 'Image', name: 'image', type: 'image', accept: 'image/*', multiple: true },
];

const getAltFields = () => [
  { label: 'Name', name: 'name', type: 'text' },

];

export { getAltFields, getFields };


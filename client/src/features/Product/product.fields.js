const getFields = () => [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    outerStyle: 'w-full col-span-3 row-span-2 md:col-span-1',
  },
  {
    label: 'Price',
    name: 'price',
    type: 'number',
    outerStyle: 'w-full col-span-3 row-span-2 md:col-span-1',
  },
  {
    label: 'Stock',
    name: 'stock',
    type: 'number',
    outerStyle: 'w-full col-span-3 row-span-2 md:col-span-1',
  },
  {
    label: 'Description',
    name: 'description',
    variant: 'textarea',
    outerStyle: 'w-full col-span-3 row-span-2',
    placeholder: 'Enter your product description.',
  },
  {
    label: 'Image',
    name: 'image',
    type: 'image',
    accept: 'image/*',
    multiple: true,
    outerStyle: 'w-full col-span-3 row-span-2',
  },
  // More getFields can be added here
];

const getAltFields = () => [
  { label: 'Name', name: 'name', type: 'text' },
  // alternate getFields can be added here
];

export { getAltFields, getFields };


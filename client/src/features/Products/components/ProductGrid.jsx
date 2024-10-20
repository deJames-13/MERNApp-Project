import { PaginationComponent, useQueries } from '@custom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { productApi } from '../product.api';
import ProductCard from './ProductCard';

const defaultQuery = {
  q: '',
  page: 1,
  order: 'desc',
  sortBy: 'created_at',
  limit: 6,
};

function ProductGrid() {
  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();
  const query = useQueries(defaultQuery);
  const [getProducts, { isLoading }] = productApi.useGetProductsMutation();
  const [products, setProducts] = React.useState([]);
  const [paginate, setPaginate] = React.useState({
    current: 1,
    last: 1,
  });

  /* END DECLARATIONS ################################################ */
  const fetchProducts = React.useCallback(async (qStr) => {
    getProducts(qStr).unwrap().then((res) => {
      setProducts(res?.resource);
      setPaginate({
        current: res?.meta.page,
        last: res?.meta.last_page,
      });
    })
  });

  React.useEffect(() => {
    fetchProducts(query.toStrQuery(query.queries));
  }, []);


  const handlePaginate = page => {
    const newQuery = {
      ...query.queries,
      page: page,
    }
    setPaginate({ ...paginate, current: page });
    fetchProducts(query.toStrQuery(newQuery));

  };


  return (
    <div className="flex flex-col h-full">
      <div className="my-8 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {
          products?.length ? products?.flat().map((product, i) => (
            <ProductCard key={i} product={product} />
          )) : ''
        }

      </div>

      {/* Pagination */}
      <div className="mt-auto">
        <PaginationComponent
          last={paginate.last}
          current={paginate.current}
          onChange={(page) => handlePaginate(page)}
        />
      </div>
    </div>
  )
}

export default ProductGrid;

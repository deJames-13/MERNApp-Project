import { setSilentLoading } from '@app/slices';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productApi } from '../product.api';
import { setQueries } from '../product.slice';

const useProductFilter = () => {
  const dispatch = useDispatch();
  const productQuery = useSelector((state) => state.product);
  const { silentLoading } = useSelector(state => state.loading);

  const [getFiltered] = productApi.useGetFilteredMutation();

  const [products, setProducts] = useState([]);
  const [paginate, setPaginate] = useState({
    current: 1,
    last: 1,
  });

  const fetchProducts = async (queries) => {
    if (!queries) queries = productQuery;
    dispatch(setSilentLoading(true));
    return getFiltered(queries).then(({ data }) => {
      setProducts(data.resource || []);
      setPaginate({
        current: data?.meta?.page || 1,
        last: data?.meta?.last_page || 1,
      });
      dispatch(setSilentLoading(false));
    });
  }

  useEffect(() => {
    console.log('Query changed: ', productQuery);
    fetchProducts();
  }, [productQuery]);

  const handlePaginate = page => {
    dispatch(setQueries({ page }));
    setPaginate({ ...paginate, current: page });
  };

  return {
    productQuery,
    products,
    paginate,
    setPaginate,
    handlePaginate,
    fetchProducts,
  };
};

export default useProductFilter;
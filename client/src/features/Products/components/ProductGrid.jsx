import { PaginationComponent } from '@custom';
import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from './ProductCard';
import useProductFilter from './useProductFilter';


function ProductGrid() {
  /* DECLARATIONS #################################################### */
  const {
    products,
    paginate,
    fetchProducts,
    handlePaginate,
  } = useProductFilter()

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  */}
      {/* <div className="max-h-[200vh] overflow-auto my-8 gap-4 flex "> */}
      <InfiniteScroll
        className='max-h-[200vh] overflow-auto my-8 gap-4 flex grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 '
        dataLength={products?.length}
        next={fetchProducts}
        hasMore={!(products.length > paginate.total)}
        loader={<h4>Loading...</h4>}
        endMessage={
          <h4 className='font-bold text-lg text-center py-24 col-span-2 lg:col-span-3 2xp:col-span-4'>
            You have reach the end
          </h4>
        }
      >
        {
          products?.length ? products?.flat().map((product, i) => (
            <ProductCard key={i} product={product} />
          )) : ''
        }
      </InfiniteScroll>

      {/* </div> */}

      {/* Pagination */}
      <div className="mt-auto">
        {/* <PaginationComponent
          last={paginate.last}
          current={paginate.current}
          onChange={(page) => handlePaginate(page)}
        /> */}
      </div>
    </div>
  )
}

export default ProductGrid;

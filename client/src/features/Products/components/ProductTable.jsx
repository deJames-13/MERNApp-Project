
import { DataTable } from '@custom';
import { useEffect } from "react";
import { Button } from "react-daisyui";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import ProductWrapper from "./ProductWrapper";
import useProductActions from "./useProductActions";

const ProductTable = () => {
  const navigate = useNavigate();
  const {
    table,
    selectedRows,
    fetchProducts,
    handleBulkDelete,
  } = useProductActions();


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductWrapper title="Products Table">
      <div className="mb-4 flex justify-end">
        <Button
          color="primary"
          className="mr-4"
          onClick={() => navigate("/dashboard/products/create")}
        >
          <FaPlus /> Add Product
        </Button>
        {
          selectedRows.length > 0 && (
            <Button
              color="error"
              onClick={handleBulkDelete}
            >
              <FaTrash /> Delete Selected
            </Button>
          )
        }
      </div>
      <DataTable {...table} />
    </ProductWrapper>
  );
};

export default ProductTable;

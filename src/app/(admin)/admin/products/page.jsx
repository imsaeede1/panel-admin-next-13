"use client";
import Loading from "@/common/Loading";
import { useGetProducts } from "@/hooks/useProducts";
import ProductsTable from "./ProductsTable";

const ProductsPage = () => {
  const { data, isLoading } = useGetProducts();
  const { products } = data || {};
  console.log(products);
  if (isLoading) <Loading />;
  return (
    <div>
      <h1>محصولات</h1>
      <ProductsTable products={products} />
    </div>
  );
};

export default ProductsPage;

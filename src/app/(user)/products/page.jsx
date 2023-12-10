import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import Link from "next/link";
import CategorySidebar from "./CategorySidebar";
import queryString from "query-string";
import { toLocalDateString } from "@/utils/toLocalDate";
import AddToCart from "./[slug]/AddToCart";
import LikeProduct from "./LikeProduct";
import { cookies } from "next/headers";
import { toStringCookies } from "@/utils/toStringCookies";
export const dynamic = "force-dynamic";

const Products = async ({ searchParams }) => {
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);
  console.log(strCookies);
  const productsPromise = getProducts(
    queryString.stringify(searchParams),
    strCookies
  );

  const categoryPromise = getCategories();
  const [{ products }, { categories }] = await Promise.all([
    productsPromise,
    categoryPromise,
  ]);
  return (
    <div>
      <h1 className="text-xl font-bold mb-6">صفحه محصولات</h1>
      <div className="grid grid-cols-4">
        <CategorySidebar categories={categories} />
        <div className="col-span-3 grid grid-cols-3 gap-4">
          {products.map((product) => {
            return (
              <div
                key={product._id}
                className="col-span-1 border rounded-xl shadow-md p-4"
              >
                <h2 className="font-bold">{product.title}</h2>
                <p>
                  <span>تاریخ ساختن:</span>
                  <span> {toLocalDateString(product.createdAt)} </span>
                </p>
                <Link
                  className="text-primary-900 font-bold "
                  href={`/products/${product.slug}`}
                >
                  مشاهده محصول
                </Link>
                <LikeProduct product={product} />
                <AddToCart product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;

import { productListTableTHeads } from "@/constants/tableHeads";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import Link from "next/link";
import { HiCheckCircle } from "react-icons/hi";

function ProductsTable({ products }) {
  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {productListTableTHeads.map((item) => {
              return (
                <th className="whitespace-nowrap table__th" key={item.id}>
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => {
            return (
              <tr key={product._id}>
                <td className="table__td">{index}</td>
                <td className="table__td  whitespace-nowrap">
                  {product.title}
                </td>
                <td className="table__td">{product.category.title}</td>
                <td className="table__td">
                  <div className="flex whitespace-nowrap gap-x-2 items-center">
                    {product.price}{" "}
                  </div>
                </td>
                <td className="table__td">{product.discount}</td>
                <td className="table__td">{product.offPrice}</td>
                <td className="table__td font-bold text-lg">
                  {product.countInStock}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ProductsTable;

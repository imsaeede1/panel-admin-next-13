"use client";

import RadioInput from "@/common/RadioInput";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const sortOptions = [
  {
    id: 1,
    value: "latest",
    label: "جدید ترین",
  },
  {
    id: 2,
    value: "earliest",
    label: "قدیمی ترین",
  },
  {
    id: 3,
    value: "popular",
    label: "محبوب ترین",
  },
];
const ProductsSort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("");
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const sortHandler = (e) => {
    const value = e.target.value;
    setSort(value);
    router.push(pathname + "?" + createQueryString("sort", value));
  };
  useEffect(() => {
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);
  return (
    <>
      <p className="font-bold my-4"> مرتب سازی</p>
      <ul className="space-y-4">
        {sortOptions.map((item) => {
          return (
            <RadioInput
              id={item.id}
              key={item.id}
              label={item.label}
              name="product-sort"
              value={item.value}
              checked={sort == item.value}
              onChange={sortHandler}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ProductsSort;

// "use client";

// import toast from "react-hot-toast";
// import { useGetUser } from "../../../../hook/useAuth";
// import { useRouter } from "next/navigation";
// import { QueryClient, useMutation } from "@tanstack/react-query";
// import { addToCart } from "@/services/cartService";

// const AddToCart = ({ product }) => {
//   const { data } = useGetUser();
//   const { user } = data || {};
//   const router = useRouter();
//   const { mutateAsync } = useMutation({ mutationFn: addToCart });

//   const addToCartHandler = async () => {
//     if (!user) {
//       toast.error("لطفا لاگین کنید");
//       router.push("/auth");
//     } else {
//       try {
//         const { message } = await mutateAsync(product._id);
//         toast.success(message);
//         QueryClient.invalidateQueries({ queryKey: ["get-user"] });
//       } catch (error) {
//         if (error?.response?.data) toast.error(error.response.data.message);
//       }
//     }
//   };
//   return (
//     <button className="btn btn--primary py-2" onClick={addToCartHandler}>
//       اضافه کردن به سبد خرید
//     </button>
//   );
// };

// export default AddToCart;
"use client";

import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import { useAddToCart } from "@/hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function AddToCart({ product }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useGetUser();
  const { isLoading, mutateAsync } = useAddToCart();
  const { user } = data || {};

  const addToCartHandler = async () => {
    if (!user) {
      toast.error("لطفا ابتدا لاگین کنید.");
      router.push("/auth");
      return;
    }

    try {
      const { message } = await mutateAsync(product._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  const isInCart = (user, product) => {
    if (!user) return false;
    return user.cart?.products.some((p) => p.productId === product._id);
  };

  return (
    <div className="mt-2">
      {isInCart(user, product) ? (
        <Link href="/cart" className="text-primary-900 font-bold">
          ادامه سفارش
        </Link>
      ) : isLoading ? (
        <Loading />
      ) : (
        <button onClick={addToCartHandler} className="btn btn--primary py-2">
          اضافه کردن به سبد خرید
        </button>
      )}
    </div>
  );
}
export default AddToCart;

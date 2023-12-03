"use client";
import Link from "next/link";
import { useGetUser } from "../hook/useAuth";

function Header() {
  const { data, isLoading, error } = useGetUser();
  const { user, cart } = data || {};
  return (
    <header
      className={`shadow-md mb-10 sticky top-0 transition-all duration-200 bg-white ${
        isLoading ? "blur-sm opacity-70" : "blur-0 opacity-100"
      }`}
    >
      <nav>
        <ul className="flex items-center  justify-between py-2 container xl:max-w-screen-xl">
          <li>
            <Link className="block py-2" href="/">
              خانه
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/products">
              محصولات
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/products">
              سبد خرید ({cart ? cart.payDetail.productIds.length : 0})
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/profile">
              پنل کاربر
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/admin">
              پنل ادمین
            </Link>
          </li>
          <li>
            {data ? (
              <Link className="block py-2" href="/auth">
                {user.name}
              </Link>
            ) : (
              <Link className="block py-2" href="/auth">
                ورود
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;

"use client";

import { toLocalDateString } from "@/utils/toLocalDate";
import { useGetUser } from "@/hooks/useAuth";
import PaymentTable from "./payments/PaymentTable";
import Link from "next/link";

function Profile() {
  const { data, isLoading } = useGetUser();
  const { user, payments } = data || {};
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="py-4">
      <h1 className="mb-4 text-xl">
        سلام ! <span className="font-bold">{user.name}</span> خوش آمدی!
      </h1>
      <p>
        <span>تاریخ پیوستن:</span>
        <span> {toLocalDateString(user.createdAt)} </span>
      </p>
      <div className="border rounded-xl p-4 mt-8">
        <p>آخرین سفارشات کاربر</p>
        <Link href="/profile/payments">مشاهده تمام سفارشات</Link>
        <PaymentTable
          payments={payments
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .slice(0, 3)}
        />
      </div>
    </div>
  );
}
export default Profile;

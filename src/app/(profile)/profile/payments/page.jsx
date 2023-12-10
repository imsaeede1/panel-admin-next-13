"use client";
import { useGetUser } from "@/hooks/useAuth";
import PaymentTable from "./PaymentTable";
import Loading from "@/common/Loading";

const Payments = () => {
  const { data, isLoading } = useGetUser();
  const { payments } = data || {};

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1>سفارشات کاربر</h1>
      <PaymentTable payments={payments} />
    </div>
  );
};

export default Payments;

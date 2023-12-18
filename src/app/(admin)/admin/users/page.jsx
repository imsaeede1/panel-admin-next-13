"use client";
import { useGetUsers } from "@/hooks/useAuth";
import UsersTable from "./UsersTable";
import Loading from "@/common/Loading";

const UsersPage = () => {
  const { data, isLoading } = useGetUsers();
  const { users } = data || {};
  if (isLoading) <Loading />;
  return (
    <div>
      <UsersTable users={users} />
    </div>
  );
};

export default UsersPage;

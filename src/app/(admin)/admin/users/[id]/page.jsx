"use client";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  console.log(id);
  return <div>page</div>;
};

export default Page;

"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { sendCompleteProfile } from "@/services/authServices";
import { useRouter } from "next/navigation";
import ProfileForm from "./ProfileForm";

const CompleteProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { data, error, isLoading, mutateAsync } = useMutation({
    mutationFn: sendCompleteProfile,
  });

  const sendProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateAsync({ name, email });
      toast.success(data.message);
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">
        <ProfileForm
          name={name}
          email={email}
          setName={setName}
          setEmail={setEmail}
          onSubmit={sendProfileHandler}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CompleteProfile;

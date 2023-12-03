"use client";
import { useState, useEffect } from "react";
import SendOTPForm from "./SendOTPForm";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { checkOtp, getOtp } from "@/services/authServices";
import CheckOTPForm from "./CheckOTPForm";
import { useRouter } from "next/navigation";
const RESENT_TIME = 90;
const AuthPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [time, setTime] = useState(RESENT_TIME);
  const router = useRouter();
  const {
    data: otpResponse,
    error,
    isLoading,
    mutateAsync,
  } = useMutation({
    mutationFn: getOtp,
  });
  const { isLoading: isLoadingCheck, mutateAsync: checkAsync } = useMutation({
    mutationFn: checkOtp,
  });
  const onChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const sendOPTHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateAsync({ phoneNumber, otp });
      toast.success(data.message);
      setStep(2);
      setTime(RESENT_TIME);
      setOtp("");
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      setStep(2);
      setTime(RESENT_TIME);
      setOtp("");
    }
  };
  const checkOPTHandler = async (e) => {
    e.preventDefault();
    try {
      const { message, user } = await checkAsync({ phoneNumber, otp });
      toast.success(message);
      if (user.isActive) {
        router.push("/");
      } else {
        router.push("/complete-profile");
      }
      setStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const renderInput = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            phoneNumber={phoneNumber}
            onChange={onChange}
            onSubmit={sendOPTHandler}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            otp={otp}
            setOtp={setOtp}
            onSubmit={checkOPTHandler}
            onBack={() => setStep((s) => s - 1)}
            time={time}
            onResendOtp={sendOPTHandler}
            otpResponse={otpResponse}
            isLoadingCheck={isLoadingCheck}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">{renderInput()}</div>
    </div>
  );
};

export default AuthPage;

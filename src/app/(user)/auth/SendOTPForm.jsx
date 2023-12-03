import TextField from "@/common/TextField";

const SendOTPForm = ({ phoneNumber, onChange, onSubmit, isLoading }) => {
  return (
    <div>
      <form className="space-y-10" onSubmit={onSubmit}>
        <TextField
          label="شماره موبایل"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onChange}
        />
        <div>
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              {" "}
              ارسال کد تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SendOTPForm;

import TextField from "@/common/TextField";

const ProfileForm = ({
  name,
  email,
  setName,
  setEmail,
  onSubmit,
  isLoading,
}) => {
  return (
    <div>
      <form className="space-y-10" onSubmit={onSubmit}>
        <TextField
          label=" نام و نام خانوادگی"
          name={name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label=" ایمیل"
          name={email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              {" "}
              تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;

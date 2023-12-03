const TextField = ({ label, name, value, onChange }) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-4">
        {label}
      </label>
      <input
        type="text"
        autoComplete="off"
        className="textField__input"
        name={name}
        onChange={onChange}
        value={value}
        id={name}
      />
    </div>
  );
};

export default TextField;

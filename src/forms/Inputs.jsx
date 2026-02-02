import { Input } from "@material-tailwind/react";
// eslint-disable-next-line react/prop-types
const Inputs = ({ placeholder,  name, onChange, value, type, defaultValue,required }) => {
  return (
    <div>
      <Input
        autoComplete="true"
        placeholder={placeholder}
        // label={label}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        required={required}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
    </div>
  );
};

export default Inputs;

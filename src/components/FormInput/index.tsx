import { FC } from "react";

interface FormInputProps {}

const FormInput: FC<FormInputProps> = () => {
  return (
    <div className="flex flex-col gap-[8px]">
      <label htmlFor="firstName label">First Name</label>
      <input type="text" placeholder="First name" id="" />
    </div>
  );
};

export default FormInput;

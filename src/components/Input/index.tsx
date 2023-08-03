import { FC } from "react";

interface InputProps {
  title?: string;
  placeholder?: string;
  register?: any;
  name?: string;
  notRequired?: boolean;
}

const Input: FC<InputProps> = ({
  title,
  placeholder,
  register,
  notRequired,
}) => {
  return (
    <>
      <label className="label">{title}</label>
      <input
        {...register}
        type="text"
        placeholder={placeholder}
        className="body-1 md:px-[32px] py-[12px] px-[20px] md:py-[16px] text-[#9E9E9E] bg-[#F5F5F5] rounded-[10px] focus:outline-none"
      />
    </>
  );
};

export default Input;
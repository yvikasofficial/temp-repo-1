import { FC, useState } from "react";

interface CheckBoxProps {
  title?: string;
  register?: any;
}

const CheckBox: FC<CheckBoxProps> = ({ title, register }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleChange = (event: any) => {
    setIsSubscribed((current) => !current);
  };

  return (
    <div className="flex items-start gap-[16px] w-full">
      <div className="w-[24px] h-[24px] rounded-[4px] text-[#9E9E9E]">
        <input
          {...register}
          id={title}
          type="checkbox"
          value={isSubscribed.valueOf.name}
          onChange={handleChange}
          onMouseLeave={() => {}}
          className="accent-[#264AE6] rounded-[4px]"
        />
      </div>
      <label
        htmlFor={title}
        className={`text-[16px] w-full leading-[21.6px] font-[600] ${
          isSubscribed ? "text-black" : "text-[#6A6A6A]"
        }`}
      >
        {title}
      </label>
    </div>
  );
};

export default CheckBox;

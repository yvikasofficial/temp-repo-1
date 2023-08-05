import { FC, useState } from "react";
import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";
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
    <div className="flex items-center gap-[16px] w-full">
      {/* // {...register}
      // id={title}
      // value={isSubscribed.valueOf.name}
      // onChange={handleChange}
      // onMouseLeave={() => {}}
      // className="accent-[#264AE6] rounded-[4px] w-[10px] h-[100px`]" */}
      <label
        htmlFor={title}
        className={`text-[16px] w-full leading-[21.6px] font-[600] ${
          isSubscribed ? "text-black " : "text-[#6A6A6A]"
        }`}
      >
        <Checkbox
          name="my-checkbox"
          className="my-checkbox !accent-[#264AE6] scale-150"
        />
        &nbsp; {title}
      </label>
    </div>
  );
};

export default CheckBox;

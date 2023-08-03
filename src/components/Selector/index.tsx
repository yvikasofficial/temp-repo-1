import { FC } from "react";

interface SelectorProps {
  data: any[];
  register?: any;
  placeholder?: any;
}

const Selector: FC<SelectorProps> = ({ data, register, placeholder }) => {
  return (
    <select
      {...register}
      className="md:px-[32px] py-[12px] px-[20px] md:py-[16px] text-[#9E9E9E] bg-[#F5F5F5] rounded-[10px] focus:outline-none body-1"
    >
      {data.map((e, i) => {
        return (
          <option key={i} value={e.name} placeholder={placeholder}>
            {e.name}
          </option>
        );
      })}
    </select>
  );
};

export default Selector;

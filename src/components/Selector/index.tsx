import { FC, Fragment } from "react";
import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import ChevronUpDownIcon from "../../images/chevron-down.svg";
import Image from "next/image";
const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];
interface SelectorProps {
  data: any[];
  register?: any;
  placeholder?: any;
}

const Selector: FC<SelectorProps> = ({ data, register, placeholder }) => {
  const [selected, setSelected] = useState(people[0]);
  return (
    // <select
    //   {...register}
    //   className="md:px-[32px] py-[12px] px-[20px] md:py-[16px] text-[#9E9E9E] bg-[#F5F5F5] rounded-[10px] focus:outline-none body-1"
    // >
    //   {data.map((e, i) => {
    //     return (
    //       <option key={i} value={e.name} placeholder={placeholder}>
    //         {e.name}
    //       </option>
    //     );
    //   })}
    // </select>
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className="relative flex items-center justify-between w-full cursor-default rounded-[10px] bg-[#F5F5F5] body-1 md:px-[32px] py-[12px] px-[20px] md:py-[16px] text-left focus:outline-none ">
          <span className="block truncate">{selected.name}</span>
          <span className="pointer-events-none flex items-center">
            <Image alt="" src={ChevronUpDownIcon} />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 h-max w-full z-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {people.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 body-1  hover:bg-[#006ED0] ${
                    active ? "text-white bg-[#007BE9]" : "text-gray-900"
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {person.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Selector;

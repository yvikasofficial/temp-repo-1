import { FC } from "react";

interface ButtonProps {
  disabled?: boolean;
  onClick?: any;
  children?: any;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  disabled,
  onClick,
  children,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn-primary md:mt-[48px] mt-[40px] mx-auto md:!w-max text-center !w-full body-1 ${
        disabled ? "opacity-70 pointer-events-none" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

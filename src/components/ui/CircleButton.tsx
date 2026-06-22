/** @see {@link https://cva.style/docs class-variance-authority} */
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode, MouseEvent } from "react";

const circleButton = cva(
  "rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-150",
  {
    variants: {
      variant: {
        primary:   "bg-primary",
        secondary: "bg-secondary",
        aux:       "bg-aux",
        danger:    "bg-red-500",
        ghost:     "hover:bg-white/20",
      },
      size: {
        sm: "w-7 h-7",
        md: "w-8 h-8",
        lg: "w-12 h-12",
      },
    },
    defaultVariants: { variant: "primary", size: "lg" },
  }
);

interface CircleButtonProps extends VariantProps<typeof circleButton> {
  children: ReactNode;
  shrink?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  onMouseDown?: (e: MouseEvent<HTMLButtonElement>) => void;
}

function CircleButton({
  children,
  variant,
  size,
  shrink = false,
  className,
  type = "button",
  onClick,
  onMouseDown,
}: CircleButtonProps) {
  return (
    <button
      type={type}
      className={circleButton({ variant, size, className: `${shrink ? "shrink-0" : ""} ${className ?? ""}` })}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {children}
    </button>
  );
}

export default CircleButton;

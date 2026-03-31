import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type PropsWithChildren,
  forwardRef,
  useEffect,
  useState,
} from "react";

import { cn } from "../../utils/functions/misc.functions";
import FireWorks from "./FireWorks";
import BtnSpinner from "./Loaders/BtnSpinner";

type Props = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "ref"
> & {
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  isTableButton?: boolean;
  submit?: boolean;
  withAnimation?: boolean;
  variant?: "primary" | "outlined" | "faded" | "text";
};

const primaryVariantClassName = "bg-blue-normal text-white";
const outlinedVariantClassName = "border border-purple-active text-black";
const fadedVariantClassName = "bg-blue-light text-purple-normal";
const textVariantClassName =
  "text-black items-start justify-start px-2 py-0 hover:bg-blue-light disabled:hover:bg-white disabled:pointer-events-none rounded-md";
const errorVariantClassName = "bg-red-600 text-white";

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  (
    {
      className,
      children,
      isLoading,
      withAnimation,
      submit = false,
      isSuccess,
      isError,
      isTableButton = false,
      disabled,
      variant,
      type = "button",
      ...buttonProps
    },
    ref,
  ) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isAnimatingError, setIsAnimatingError] = useState(false);

    useEffect(() => {
      if (!isLoading && isSuccess) {
        setIsAnimating(true);
        const timer = setTimeout(() => {
          setIsAnimating(false);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }, [isLoading, isSuccess]);

    useEffect(() => {
      if (!isLoading && isError) {
        setIsAnimatingError(true);
        const timer = setTimeout(() => {
          setIsAnimatingError(false);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }, [isLoading, isError]);

    return (
      <button
        ref={ref}
        // eslint-disable-next-line react/button-has-type
        type={type ?? "button"}
        {...buttonProps}
        className={cn(
          `flew-row flex w-full items-center justify-center gap-2 transition-all duration-200 active:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 ${
            isLoading ? "cursor-wait" : "disabled:cursor-not-allowed"
          }`,
          isTableButton && "disabled:-z-10",
          "space-x-2 whitespace-nowrap rounded-full px-3 py-2 text-base",
          variant === "primary" && primaryVariantClassName,
          variant === "outlined" && outlinedVariantClassName,
          variant === "faded" && fadedVariantClassName,
          variant === "text" && textVariantClassName,
          className,
          withAnimation && isAnimatingError && errorVariantClassName,
          withAnimation && isAnimatingError && "glitch-animation",
        )}
        disabled={disabled || isLoading}
      >
        {withAnimation ? (
          <>
            {(isLoading && !isSuccess) || (isLoading && !isError) ? (
              <BtnSpinner />
            ) : isAnimating ? (
              <FireWorks />
            ) : (
              children
            )}
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);
Button.displayName = "Button";

export default Button;

import clsx from "clsx";
import { ComponentProps, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  variant?: 'danger' | 'success' | 'warning' | 'info' | 'default',
  full?: boolean
}> & ComponentProps<'button'>

export function Button({ children, variant = 'default', type = 'button', full = false, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={clsx("button", {
        '--default': variant === "default",
        '--info': variant === "info",
        '--success': variant === "success",
        '--danger': variant === "danger",
        '--warning': variant === "warning",
        '--full': full,
      })}
    >
      {children}
    </button>
  )
}
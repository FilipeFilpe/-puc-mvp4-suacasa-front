import clsx from "clsx";
import { icons, XIcon } from "lucide-react";
import { useAlertMessage } from "../../stores/useAlertMessage";
import Icon from "../Icon";

export type AlertProps = {
  variant: 'danger' | 'success' | 'warning' | 'info',
  message: string,
}

export function Alert() {
  const { variant, message, resetMessage } = useAlertMessage();

  const iconVariant = {
    info: 'CircleAlert' as keyof typeof icons,
    success: 'CircleCheck' as keyof typeof icons,
    danger: 'CircleX' as keyof typeof icons,
    warning: 'CircleSlash' as keyof typeof icons,
  }

  return (
    <div
      id={variant}
      className={clsx("alert", {
        '--info': variant === "info",
        '--success': variant === "success",
        '--danger': variant === "danger",
        '--warning': variant === "warning",
      })}
      role="alert"
    >
      <Icon name={iconVariant[variant]}/>
    
      <div className="ms-3 text-sm font-medium">
        {message}
      </div>
      <button
        aria-label="Close"
        type="button"
        className="__button-dismiss"
        onClick={resetMessage}
      >
        <span className="sr-only">Dismiss</span>
        <XIcon />
      </button>
    </div>
  )
}
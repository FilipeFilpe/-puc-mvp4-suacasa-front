import clsx from "clsx";
import { AlertTriangleIcon, XIcon } from "lucide-react";
import { Button } from "./Button";

type DialogProps = {
  show: boolean,
  message?: string,
  okText?: string,
  cancelText?: string,
  okCallback: () => void,
  close: () => void,
}

export function Dialog({ show, message, okText, okCallback, close, cancelText }: DialogProps) {
  return (
    <div
      className={clsx("dialog-modal", {
        '--show': show
      })}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            onClick={close}
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          >
            <XIcon />
            <span className="sr-only">Close modal</span>
          </button>

          <div className="flex flex-col items-center gap-4 p-4 md:p-5 text-center">
            <div className="flex justify-center items-center">
              <AlertTriangleIcon size={"3rem"} strokeWidth="1px" className="text-red-600 font-light" />
            </div>
            <h3 className="mb-5 text-lg font-normal text-gray-500 text-wrap">
              { message || "Você tem certeza que deseja realizar essa ação?" }
            </h3>
            <div className="flex gap-4">
              <Button variant="danger" onClick={okCallback}>
                { okText || "Sim, tenho certeza" }
              </Button>

              <Button onClick={close}>
                {cancelText || "Não, cancelar"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
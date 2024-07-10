import { AxiosResponse } from "axios"

type ErrorMessageProps = Error & {
  response?: AxiosResponse
}

export function errorMessage(error: ErrorMessageProps) {
  if (error?.response?.data?.message) {
    return error?.response?.data?.message
  }
  return error.message
}
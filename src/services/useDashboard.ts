import { useQuery } from "@tanstack/react-query";
import { axiosBack } from "../config";

export function useDashboard() {
  const dashboard = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => axiosBack.get("/dashboard"),
  });

  return {
    dashboard,
  };
}

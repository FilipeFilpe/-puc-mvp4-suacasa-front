import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosBack } from "../config";
import { useAlertMessage } from "../stores/useAlertMessage";
import { errorMessage } from "../utils/errorMessage";

export type Client = {
  id: number;
  email: string;
  name: string;
  phone: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: Array<any>;
};

export function useClients() {
  const queryClient = useQueryClient();
  const { setMessage } = useAlertMessage()

  const clients = useQuery({
    queryKey: ["clients"],
    queryFn: () => axiosBack.get("/clients"),
  });

  const newClient = useMutation({
    mutationFn: (data: FormData) => axiosBack.post("/clients", data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error) => {  
      setMessage({
        message: errorMessage(error),
        variant: "danger"
      })
    }
  });

  const deleteClient = useMutation({
    mutationFn: (id: string) => axiosBack.delete(`/clients?id=${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error) => {  
      setMessage({
        message: errorMessage(error),
        variant: "danger"
      })
    }
  });

  return {
    clients,
    newClient,
    deleteClient
  };
}

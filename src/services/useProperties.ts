import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosBack, axiosFile } from "../config";
import { useAlertMessage } from "../stores/useAlertMessage";
import { errorMessage } from "../utils/errorMessage";

type UsePropertiesProps = {
  idProperty?: string
}

export function useProperties({
  idProperty
}: UsePropertiesProps) {
  const queryClient = useQueryClient()
  const { setMessage } = useAlertMessage()

  const properties = useQuery({
    queryKey: ["properties"],
    queryFn: () => axiosBack.get('/properties'),
  });

  const property = useQuery({
    queryKey: ["property"],
    queryFn: () => axiosBack.get(`/property?id=${idProperty}`),
    enabled: !!idProperty
  });

  const newProperty = useMutation({
    mutationFn: (data: FormData) => axiosBack.post('/properties', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (error) => {  
      setMessage({
        message: errorMessage(error),
        variant: "danger"
      })
    }
  });

  const newVisit = useMutation({
    mutationFn: (data: FormData) => axiosBack.post('/property/visit', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["property"] });
    },
    onError: (error) => {  
      setMessage({
        message: errorMessage(error),
        variant: "danger"
      })
    }
  });

  const deleteProperty = useMutation({
    mutationFn: (id: string) => axiosBack.delete(`/properties?id=${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (error) => {  
      setMessage({
        message: errorMessage(error),
        variant: "danger"
      })
    }
  });

  const newFile = useMutation({
    mutationFn: (data: FormData) => axiosFile.post('/upload/file', data),
    onError: (error) => {  
      setMessage({
        message: errorMessage(error),
        variant: "danger"
      })
    }
  });

  return {
    property,
    properties,
    newFile,
    newProperty,
    newVisit,
    deleteProperty,
  };
}
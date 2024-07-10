import { useQuery } from "@tanstack/react-query";
import { axiosBack } from "../config";

type ViaCEPProp = {
  cep?: string
}

export function useViaCEP({ cep }: ViaCEPProp) {
  const endereco = useQuery({
    queryKey: ["endereco"],
    queryFn: () => axiosBack.get(`https://viacep.com.br/ws/${cep}/json`),
    enabled: !!cep
  });

  return {
    endereco,
  };
}

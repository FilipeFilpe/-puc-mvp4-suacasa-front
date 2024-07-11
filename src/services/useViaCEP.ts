import { useQuery } from "@tanstack/react-query";
import { axiosBack } from "../config";

type ViaCEPProp = {
  cep?: string
}

export function useViaCEP({ cep }: ViaCEPProp) {
  const endereco = useQuery({
    queryKey: ["endereco", cep],
    queryFn: () => axiosBack.get(`https://viacep.com.br/ws/${String(cep).replace(/\D/g, "")}/json`),
    enabled: !!cep
  });

  return {
    endereco,
  };
}

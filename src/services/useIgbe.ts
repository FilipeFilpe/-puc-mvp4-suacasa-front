import { useQuery } from "@tanstack/react-query";
import { axiosBack } from "../config";

type IBGEProps = {
  uf?: string
}

export function useIBGE({ uf }: IBGEProps) {
  const ufs = useQuery({
    queryKey: ["ufs"],
    queryFn: () => axiosBack.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"),
  });
  const cidades = useQuery({
    queryKey: ["cidades"],
    queryFn: () => axiosBack.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`),
    enabled: !!uf
  });

  return {
    ufs,
    cidades,
  };
}

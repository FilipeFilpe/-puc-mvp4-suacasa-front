import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Dialog } from "../components/Dialog";
import Icon from "../components/Icon";
import Layout from "../components/template/Layout";
import { useProperties } from "../services/useProperties";
import { useAlertMessage } from "../stores/useAlertMessage";

export function Properties() {
  const { setMessage } = useAlertMessage()
  const [propertyId, setPropertyId] = useState<string | null>(null)

  const navigate = useNavigate();

  const { properties: { isPending, isError, error, data }, deleteProperty } = useProperties({})

  const deleteCallback = () => {
    if (propertyId) {
      deleteProperty.mutate(propertyId)
    }
  }

  useEffect(() => {    
    if (deleteProperty.data) {
      setMessage({
        message: deleteProperty.data?.data?.message || "Propriedade deletada com sucesso!",
        variant: deleteProperty.error ? "danger" : "success"
      })
      setPropertyId(null)
    }
  }, [deleteProperty.data, deleteProperty.error, setMessage])

  if (isPending) {
    return <Layout title="Propriedades" subtitle="Gerencie todas as propriedadess da aplicação">
      <Loader2 className="animate-[spin_3s_linear_infinite]" size="5rem" strokeWidth={1} />
    </Layout>
  }

  if (isError) {
    return <Layout title="Propriedades" subtitle="Gerencie todas as propriedadess da aplicação">
      <span>Erro: {error.message}</span>
    </Layout>
  }

  return (
    <Layout title="Propriedades" subtitle="Gerencie todas as propriedadess da aplicação">
      {
        propertyId ? (
          <Dialog
            show={!!propertyId}
            message={`Você tem certeza que deseja excluir essa propriedade?`}
            okCallback={deleteCallback}
            close={() => setPropertyId(null)} />
        ) : null
      }
      <div className="flex flex-wrap gap-8">
        <div className="w-full flex justify-start">
          <Button variant="info">
            <Link
              to="/propriedades/novo"
            >
              Adicionar propriedade
            </Link>
          </Button>
        </div>
        <div className="flex flex-wrap gap-6 items-normal justify-start">

          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {data.data?.properties.length ? data.data?.properties?.map((item: any) => (
            <div key={item.id} className="max-w-sm flex flex-col justify-between text-zinc-200 bg-gray-900 rounded-lg shadow relative">
              <span className="absolute top-3 left-2 bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-gray-500">{item.type}</span>
              <div className="w-full h-[250px] overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.type} - ${item.title}`}
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight">{item.title}</h5>
                <div className="flex flex-col items-start">
                  <small className="font-bold">Endereço:</small>
                  <p className="mb-3 font-normal">{item.address}</p>
                </div>
                <div className="flex flex-col items-start">
                  <small className="font-bold">Informações:</small>
                  <div className="flex gap-1 mb-3 font-normal">
                    <span>{item.size}m²</span>
                    <span>|</span>
                    <span>{item.rooms} quarto(s)</span>
                    <span>|</span>
                    <span>{item.bathrooms} banheiro(s)</span>
                    <span>|</span>
                    <span>{item.garages} vaga(s)</span>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <small className="font-bold">Proprietário:</small>
                  {item.owner}
                </div>
                <div className="flex justify-between font-semibold text-end text-lg mt-4 pt-4 border-t border-gray-700">
                  <div>
                    {item.value.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </div>
                  <div className="flex gap-3">
                    <div title="Agendar visita">
                      <Icon
                        name="CalendarDays"
                        size={30}
                        strokeWidth={1.5}
                        className="text-blue-600 cursor-pointer hover:opacity-80"
                        onClick={() => navigate(`/visitas/${item.id}`)}
                      />
                    </div>
                    <div title="Excluir">
                      <Icon
                        name="Trash2"
                        size={30}
                        strokeWidth={1.5}
                        className="text-red-600 cursor-pointer hover:opacity-80"
                        onClick={() => setPropertyId(item.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : 'Nenhuma propriedade cadastrada ainda'}
        </div>
      </div>
    </Layout>)
}
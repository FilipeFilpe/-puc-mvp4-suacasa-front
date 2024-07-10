import { Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Table } from "../components/Table";
import Layout from "../components/template/Layout";
import { useProperties } from "../services/useProperties";

export function Visits() {
  const params = useParams()

  const { property: { isPending, isError, error, data } } = useProperties({ idProperty: params.propertyId })

  if (isPending) {
    return <Layout title="Clientes" subtitle="Gerencie todos os clientes da aplicação">
      <Loader2 className="animate-[spin_3s_linear_infinite]" size="5rem" strokeWidth={1} />
    </Layout>
  }

  if (isError) {
    return <Layout title="Clientes" subtitle="Gerencie todos os clientes da aplicação">
      <span>Erro: {error.message}</span>
    </Layout>
  }

  const visits = data.data.visits.map((visit: { date: string | number | Date; }) => ({
    ...visit,
    date: new Date(visit.date).toLocaleDateString('pt-BR')
  }))

  const columns = [
    { key: 'name', value: 'Nome' },
    { key: 'email', value: 'E-mail' },
    { key: 'phone', value: 'Telefone' },
    { key: 'date', value: 'Data' },
  ]


  return (
    <Layout title="Visitas" subtitle="Gerencie todas as visitas de uma propriedade" showGoback>
      <div className="flex flex-wrap gap-8">
        <div className="w-full flex justify-start">
          <Button variant="info">
            <Link
              to={`/visitas/${params.propertyId}/novo`}
            >
              Adicionar visita
            </Link>
          </Button>
        </div>

        <Table columns={columns} rows={visits} />
      </div>
    </Layout>
  )
}
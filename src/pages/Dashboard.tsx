import { Loader2 } from "lucide-react";
import Icon from "../components/Icon";
import Layout from "../components/template/Layout";
import { useDashboard } from "../services/useDashboard";

export function Dashboard() {
  const { dashboard: { isPending, isError, error, data } } = useDashboard()

  if (isPending) {
    return <Layout title="Clientes" subtitle="Gerencie todos os clientes da aplicação">
      <Loader2 className="animate-[spin_2s_linear_infinite]" size="10rem" strokeWidth={.5} />
    </Layout>
  }

  if (isError) {
    return <Layout title="Clientes" subtitle="Gerencie todos os clientes da aplicação">
      <span>Erro: {error.message}</span>
    </Layout>
  }

  return (
    <Layout title="Dashboard" subtitle="Página com o resumo dos dados da aplicação">
      <div className="flex flex-wrap gap-8">
        <div className="flex justify-between w-[350px] p-6 bg-whit rounded-lg shadow text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2">
          <Icon name="Users" size={100} strokeWidth={1} />
          <div className="flex flex-col items-end justify-between">
            <p className="mb-3 text-xl font-normal">Clientes</p>
            <h4 className="mb-2 text-5xl font-semibold tracking-tight">{data.data.clients || 0}</h4>
          </div>
        </div>
        <div className="flex justify-between w-[350px] p-6 rounded-lg shadow text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2">
          <Icon name="House" size={100} strokeWidth={1} />
          <div className="flex flex-col items-end justify-between">
            <p className="mb-3 text-xl font-normal">Propriedades</p>
            <h4 className="mb-2 text-5xl font-semibold tracking-tight">{data.data.properties || 0}</h4>
          </div>
        </div>
        <div className="flex justify-between w-[350px] p-6 bg-whit rounded-lg shadow text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2">
          <Icon name="ContactRound" size={100} strokeWidth={1} />
          <div className="flex flex-col items-end justify-between">
            <p className="mb-3 text-xl font-normal">Visitas agendadas</p>
            <h4 className="mb-2 text-5xl font-semibold tracking-tight">{data.data.visits || 0}</h4>
          </div>
        </div>
      </div>
    </Layout>
  )
}
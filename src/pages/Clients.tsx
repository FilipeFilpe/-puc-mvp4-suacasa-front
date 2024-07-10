import { Loader2 } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Dialog } from "../components/Dialog";
import Icon from "../components/Icon";
import { Table } from "../components/Table";
import Layout from "../components/template/Layout";
import { Client, useClients } from "../services/useClients";
import { useAlertMessage } from "../stores/useAlertMessage";

function Action({handleDelete}: {handleDelete: () => void}) {
  return (
    <div className="flex justify-start gap-2">
      <div title="Excluir">
        <Icon
          name="Trash2"
          strokeWidth={1.2}
          className="text-red-600 cursor-pointer"
          onClick={handleDelete}
        />
      </div>
    </div>
    
  )
}

export function Clients() {
  const [clientId, setClientId] = useState<string | null>(null)
  const { setMessage } = useAlertMessage()

  const { clients: { isPending, isError, error, data }, deleteClient } = useClients()

  const deleteCallback = () => {
    if (clientId) {
      deleteClient.mutate(clientId)
    }
  }

  useEffect(() => {
    if (deleteClient.data) {
      setMessage({
        message: deleteClient.data?.data?.message || "Cliente deletado com sucesso!",
        variant: deleteClient.error ? "danger" : "success"
      })
      setClientId(null)
    }
  }, [deleteClient.data, deleteClient.error, setMessage])

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

  const clients: Array<Client & { actions: ReactNode }> = data.data.clients.map((client: Client) => {
    return {
      ...client,
      actions: <Action handleDelete={() => setClientId(String(client.id))} />
    }
  })

  const columns = [
    { key: 'name', value: 'Nome' },
    { key: 'email', value: 'E-mail' },
    { key: 'phone', value: 'Telefone' },
    { key: 'actions', value: 'Ações' },
  ]

  return (
    <Layout title="Clientes" subtitle="Gerencie todos os clientes da aplicação">
      {
        clientId ? (
          <Dialog
            show={!!clientId}
            message={`Você tem certeza que deseja excluir essa propriedade?`}
            okCallback={deleteCallback}
            close={() => setClientId(null)} />
        ) : null
      }
      <div className="flex flex-wrap gap-8">
        <div className="w-full flex justify-start">
          <Button variant="info">
            <Link
              to="/clientes/novo"
            >
              Adicionar cliente
            </Link>
          </Button>
        </div>

        <Table columns={columns} rows={clients} />
      </div>
    </Layout>
  )
}
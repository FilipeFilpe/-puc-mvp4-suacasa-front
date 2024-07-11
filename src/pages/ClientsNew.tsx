import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import Layout from "../components/template/Layout";
import { useClients } from "../services/useClients";
import { useAlertMessage } from "../stores/useAlertMessage";

type ClientForm = {
  name: string,
  email: string,
  phone: string,
}

const defaultValues = {
  name: '',
  email: '',
  phone: '',
}

export function ClientsNew() {
  const [formFields, setFormFields] = useState<ClientForm>(defaultValues);

  const { setMessage } = useAlertMessage()
  const { newClient } = useClients()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (event: any) => {
    event.preventDefault()
    const clientFormData = new FormData();

    clientFormData.append('name', formFields.name);
    clientFormData.append('email', formFields.email);
    clientFormData.append('phone', formFields.phone);
    newClient.mutate(clientFormData)
  }

  useEffect(() => {
    if (newClient.data) {
      setFormFields(defaultValues)
      setMessage({
        message: newClient.data?.data?.message || "Propriedade adicionada com sucesso!",
        variant: newClient.error ? "danger" : "success"
      })
    }
  }, [newClient.data, newClient.error, setMessage])

  return (
    <Layout title="Novo cliente" subtitle="Cadastre um novo cliente" showGoback>
      <div className="flex flex-wrap gap-8">
        <form onSubmit={onSubmit} className="flex flex-col rounded-md gap-5 bg-gray-900 p-6">
          <div className="flex flex-wrap gap-2">
            <Input
              name="name"
              label="Nome"
              placeholder="Nome do cliente"
              type="text"
              className="w-full"
              required
              value={formFields.name}
              onChange={(event) => setFormFields(old => ({ ...old, name: event.target.value }))}
            />
            <div className="w-full flex flex-wrap gap-4">
              <Input
                name="email"
                label="E-mail"
                placeholder="example@email.com"
                type="text"
                className="flex-1"
                required
                value={formFields.email}
                onChange={(event) => setFormFields(old => ({ ...old, email: event.target.value }))}
              />
              <Input
                name="phone"
                label="Telefone"
                placeholder="Digite o telefone"
                type="text"
                className="flex-1"
                required
                mask={'(##) #####-####'}
                value={formFields.phone}
                onChange={(event) => setFormFields(old => {
                  return { ...old, phone: event.target.value}
                }
                )}
              />
            </div>
          </div>

          <div className="w-full flex justify-center gap-4 mt-4">
            <Button
              type="submit"
              disabled={newClient.isPending}
              variant="info"
              full
            >
              {newClient.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
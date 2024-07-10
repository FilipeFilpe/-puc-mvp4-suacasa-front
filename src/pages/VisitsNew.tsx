import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import Layout from "../components/template/Layout";
import { useProperties } from "../services/useProperties";
import { useAlertMessage } from "../stores/useAlertMessage";

type VisitForm = {
  name: string,
  email: string,
  phone: string,
  date: string
}

const defaultValues = {
  name: '',
  email: '',
  phone: '',
  date: '',
}
export function VisitsNew() {
  const [formFields, setFormFields] = useState<VisitForm>(defaultValues);
  const params = useParams()

  const { setMessage } = useAlertMessage()
  const { newVisit } = useProperties({})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (event: any) => {
    event.preventDefault()
    const visitFormData = new FormData();

    visitFormData.append('property_id', params.propertyId!);
    visitFormData.append('name', formFields.name);
    visitFormData.append('email', formFields.email);
    visitFormData.append('phone', formFields.phone);
    visitFormData.append('date', String(formFields.date));
    newVisit.mutate(visitFormData)
  }

  useEffect(() => {
    if (newVisit.data) {
      setFormFields(defaultValues)
      setMessage({
        message: newVisit.data?.data?.message || "Visita agendada com sucesso!",
        variant: newVisit.error ? "danger" : "success"
      })
    }
  }, [newVisit.data, newVisit.error, setMessage])

  return (
    <Layout title="Nova visita" subtitle="Cadastre uma nova visita a propriedade" showGoback>
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
                value={formFields.phone}
                onChange={(event) => setFormFields(old => ({ ...old, phone: event.target.value }))}
              />
              <Input
                name="date"
                label="Data"
                type="datetime-local"
                className="flex-1"
                required
                value={formFields.date}
                onChange={(event) => setFormFields(old => ({ ...old, date: event.target.value }))}
              />
            </div>
          </div>

          <div className="w-full flex justify-center gap-4 mt-4">
            <Button
              type="submit"
              disabled={newVisit.isPending}
              variant="info"
              full
            >
              {newVisit.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
import { Loader2 } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import Icon from "../components/Icon";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import Layout from "../components/template/Layout";
import { Client, useClients } from "../services/useClients";
import { useIBGE } from "../services/useIgbe";
import { useProperties } from "../services/useProperties";
import { useViaCEP } from "../services/useViaCEP";
import { useAlertMessage } from "../stores/useAlertMessage";

type PropertyForm = {
  owner: string,
  title: string,
  cep: string,
  complemento: string,
  logradouro: string,
  bairro: string,
  cidade: string,
  uf: string,
  value: string,
  size: string,
  rooms: string,
  bathrooms: string,
  garages: string,
  type: string,
  image: File | null,
}

// type FormPropertyProps = FormProps & {
//   clients: Array<Client>,
//   ufs: Array<any>,
// }

const defaultValues = {
  owner: '',
  title: '',
  cep: '',
  complemento: '',
  logradouro: '',
  bairro: '',
  cidade: '',
  uf: '',
  value: '',
  size: '',
  rooms: '',
  bathrooms: '',
  garages: '',
  type: '',
  image: null,
}

export function PropertiesNew() {
  const { setMessage } = useAlertMessage();

  const [formFields, setFormFields] = useState<PropertyForm>(defaultValues);

  const { newProperty, newFile } = useProperties({})
  const { clients } = useClients()
  const { ufs, cidades } = useIBGE({
    uf: formFields.uf
  })
  const { endereco } = useViaCEP({
    cep: formFields.cep.length === 8 ? formFields.cep : ''
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (event: any) => {
    event.preventDefault()
    const fileFormData = new FormData();


    if (formFields.image) {
      fileFormData.append('file', formFields.image)
      fileFormData.append('file_name', formFields.image.name)
      newFile.mutate(fileFormData)
    }
  }

  const isPending = clients.isPending || ufs.isPending
  const isError = clients.isError
  const errorMessage = clients.error?.message

  useEffect(() => {
    const valueCEP = formFields.cep

    if (!valueCEP) {
      // setCepIsValid(false)
      setFormFields(old => ({
        ...old,
        cidade: '',
        logradouro: '',
        bairro: '',
        uf: '',
      }))
    }
    if (valueCEP && valueCEP.length === 8) {
      if (endereco.data?.data) {
        // setCepIsValid(true)
        console.log(endereco.data?.data);
        if (endereco.data?.data.erro) {
          setFormFields(old => ({
            ...old,
            cidade: '',
            logradouro: '',
            bairro: '',
            uf: '',
          }))
        } else {
          setFormFields(old => ({
            ...old,
            cidade: endereco.data?.data.localidade,
            logradouro: endereco.data?.data.logradouro,
            bairro: endereco.data?.data.bairro,
            uf: endereco.data?.data.uf,
          }))
        }
      }
    }
  }, [endereco.data?.data, formFields.cep])

  useEffect(() => {
    if (newFile.data?.data.path) {
      const propertyFormData = new FormData();
      const addressFormated = `${formFields.logradouro}, ${formFields.bairro}, ${formFields.complemento} - ${formFields.cidade}/${formFields.uf}`;
      propertyFormData.append('title', formFields.title);
      propertyFormData.append('value', formFields.value);
      propertyFormData.append('size', formFields.size);
      propertyFormData.append('rooms', formFields.rooms);
      propertyFormData.append('bathrooms', formFields.bathrooms);
      propertyFormData.append('garages', formFields.garages);
      propertyFormData.append('type', formFields.type);
      propertyFormData.append('owner_id', formFields.owner);
      propertyFormData.append('image', newFile.data?.data.path);
      propertyFormData.append('address', addressFormated);
      newProperty.mutate(propertyFormData)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newFile.data?.data.path])

  useEffect(() => {
    if (newProperty.data) {
      setFormFields(defaultValues)
      setMessage({
        message: newProperty.data?.data?.message || "Propriedade adicionada com sucesso!",
        variant: newProperty.error ? "danger" : "success"
      })
    }
  }, [newProperty.data, newProperty.error, setMessage])

  if (isPending) {
    return <Layout title="Nova propriedade" subtitle="Cadastre uma nova propriedade" showGoback>
      <Loader2 className="animate-[spin_3s_linear_infinite]" size="5rem" strokeWidth={1} />
    </Layout>
  }

  if (isError) {
    return <Layout title="Nova propriedade" subtitle="Cadastre uma nova propriedade" showGoback>
      <span>Erro: {errorMessage}</span>
    </Layout>
  }

  return (
    <Layout title="Nova propriedade" subtitle="Cadastre uma nova propriedade" showGoback>
      <div className="flex flex-wrap gap-8">
        {
          clients.data?.data.clients.length === 0 ? (
            <div className='flex flex-col justify-center gap-4 items-center p-8'>
              <Icon name='Info' size={250} strokeWidth={.5} className='text-blue-500' />
              <h1 className='text-6xl'>Ops...</h1>
              <h1 className='text-2xl'>Para incluir uma nova propriedade, é necessário ao menos um cliente</h1>

              <div className="flex gap-4">
                <Button variant="default">
                  <Link to={'/propriedades'}>
                    Voltar
                  </Link>
                </Button>
                <Button variant="info">
                  <Link to={'/clientes/novo'}>
                    Cadastrar cliente
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col rounded-md gap-5 bg-gray-900 p-6">
              <div className="flex flex-wrap gap-2">
                <Select
                  name={"owner"}
                  label={"Proprietário"}
                  items={clients.data?.data.clients.map((client: Client) => ({ text: client.name, value: client.id }))}
                  className="flex-1"
                  required
                  value={formFields.owner}
                  onChange={(value: string) => setFormFields(old => ({ ...old, owner: value }))}
                />
                <Input
                  name="title"
                  label="Título"
                  placeholder="Título da publicação"
                  type="text"
                  className="w-full"
                  required
                  value={formFields.title}
                  onChange={(event) => setFormFields(old => ({ ...old, title: event.target.value }))}
                />
                <Input
                  name="cep"
                  label="CEP"
                  placeholder="Digite o CEP"
                  type="text"
                  className="w-full"
                  required
                  maxLength={8}
                  value={formFields.cep}
                  onChange={(event) => setFormFields(old => ({ ...old, cep: event.target.value }))}
                />
                <Input
                  name="complemento"
                  label="Complemento"
                  placeholder="Digite o complemento"
                  type="text"
                  className="w-full"
                  required
                  value={formFields.complemento}
                  onChange={(event) => setFormFields(old => ({ ...old, complemento: event.target.value }))}
                />
                <Input
                  name="logradouro"
                  label="Logradouro"
                  placeholder="Digite o logradouro"
                  type="text"
                  className="w-full"
                  required
                  value={formFields.logradouro}
                  onChange={(event) => setFormFields(old => ({ ...old, logradouro: event.target.value }))}
                />
                <Input
                  name="bairro"
                  label="Bairro"
                  placeholder="Digite o bairro"
                  type="text"
                  className="w-full"
                  required
                  value={formFields.bairro}
                  onChange={(event) => setFormFields(old => ({ ...old, bairro: event.target.value }))}
                />
                {
                  ufs.isError ? (
                    <Fragment>
                      <Input
                        name="cidade"
                        label="Cidade"
                        placeholder="Digite a cidade"
                        type="text"
                        className="w-full"
                        required
                        value={formFields.cidade}
                        onChange={(event) => setFormFields(old => ({ ...old, cidade: event.target.value }))}
                      />
                      <Input
                        name="uf"
                        label="UF"
                        placeholder="Digite a UF"
                        type="text"
                        className="w-full"
                        max={2}
                        required
                        value={formFields.uf}
                        onChange={(event) => setFormFields(old => ({ ...old, uf: event.target.value }))}
                      />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Select
                        name={"cidade"}
                        label={"Cidade"}
                        items={cidades.data?.data.map((uf: { nome: string }) => ({ text: uf.nome, value: uf.nome }))}
                        className="flex-1"
                        required
                        value={formFields.cidade}
                        onChange={(value: string) => setFormFields(old => ({ ...old, cidade: value }))}
                        disabled={!formFields.uf}
                      />
                      <Select
                        name={"uf"}
                        label={"UF"}
                        items={ufs.data?.data.map((uf: { nome: string, sigla: string }) => ({ text: uf.nome, value: uf.sigla }))}
                        className="flex-1"
                        required
                        value={formFields.uf}
                        onChange={(value: string) => setFormFields(old => ({ ...old, uf: value }))}
                      />
                    </Fragment>
                  )
                }
                <Input
                  name="value"
                  label="Valor do imóvel"
                  type="text"
                  className="flex-1"
                  required
                  value={formFields.value}
                  onChange={(event) => setFormFields(old => ({ ...old, value: event.target.value }))}
                />
                <Input
                  name="size"
                  label="Tamanho em M2"
                  type="number"
                  className="flex-1"
                  required
                  value={formFields.size}
                  onChange={(event) => setFormFields(old => ({ ...old, size: event.target.value }))}
                />
                <Input
                  name="rooms"
                  label="Quartos"
                  type="number"
                  className="flex-1"
                  required
                  value={formFields.rooms}
                  onChange={(event) => setFormFields(old => ({ ...old, rooms: event.target.value }))}
                />
                <Input
                  name="bathrooms"
                  label="Banheiros"
                  type="number"
                  className="flex-1"
                  required
                  value={formFields.bathrooms}
                  onChange={(event) => setFormFields(old => ({ ...old, bathrooms: event.target.value }))}
                />
                <Input
                  name="garages"
                  label="Garagem"
                  type="number"
                  className="flex-1"
                  required
                  value={formFields.garages}
                  onChange={(event) => setFormFields(old => ({ ...old, garages: event.target.value }))}
                />

                <Select
                  name={"type"}
                  label={"Tipo"}
                  items={[
                    { text: "Apartamento", value: "apartamento" },
                    { text: "Casa", value: "casa" }
                  ]}
                  className="flex-1"
                  required
                  value={formFields.type}
                  onChange={(value: string) => setFormFields(old => ({ ...old, type: value }))}
                />
                <Input
                  name="image"
                  label="Foto do imóvel"
                  type="file"
                  className="flex-1"
                  required
                  onChange={(event) => setFormFields(old => ({ ...old, image: event.target.files && event.target.files[0] }))}
                />
              </div>

              <div className="w-full flex justify-center gap-4 mt-4">
                <Button
                  type="submit"
                  disabled={newProperty.isPending}
                  variant="info"
                  full
                >
                  {newProperty.isPending ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </form>
          )
        }
      </div>
    </Layout>
  )
}
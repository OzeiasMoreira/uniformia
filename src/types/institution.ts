export interface Institution {
  id: string
  name: string
  cnpj: string
}

export interface CreateInstitutionInput {
  name: string
  cnpj: string
  senha: string
}

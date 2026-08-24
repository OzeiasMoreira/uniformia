export interface ItemUniforme {
  quantidade: number
  descricao: string
}

export interface Uniforme {
  id: number
  nome: string
  itens: ItemUniforme[]
}

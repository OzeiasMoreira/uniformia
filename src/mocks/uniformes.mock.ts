import type { Uniforme } from '../types/uniforme'

export const UNIFORMES_MOCK: Uniforme[] = [
  {
    id: 1,
    nome: 'KIT ESCOLAR MILITAR',
    itens: [
      { quantidade: 1, descricao: 'BOINA' },
      { quantidade: 2, descricao: 'FARDAS' },
    ],
  },
  {
    id: 2,
    nome: 'KIT ESCOLAR',
    itens: [
      { quantidade: 1, descricao: 'JAQUETA' },
      { quantidade: 2, descricao: 'CALÇAS' },
      { quantidade: 3, descricao: 'BLUSAS' },
    ],
  },
]

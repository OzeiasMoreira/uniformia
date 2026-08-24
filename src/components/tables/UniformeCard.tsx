import { Card } from '../../components/ui/Card'
import type { ItemUniforme } from '../../types/uniforme'

interface UniformeCardProps {
  nome: string
  itens: ItemUniforme[]
}

export function UniformeCard({ nome, itens }: UniformeCardProps) {
  return (
    <Card className="min-h-[350px] p-8">
      <h2 className="font-app text-xl font-bold text-black">{nome}</h2>
      <ul className="mt-3 flex flex-col gap-1">
        {itens.map((item) => (
          <li key={item.descricao} className="font-app text-xs font-semibold text-placeholder">
            {item.quantidade} {item.descricao}
          </li>
        ))}
      </ul>
    </Card>
  )
}

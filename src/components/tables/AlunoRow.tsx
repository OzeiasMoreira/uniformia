import iconUserBadge from '../../assets/icons/icon-user-badge.png'

interface AlunoRowProps {
  numero: number
  nome: string
  turma: string
  matricula: string
  onEditar: () => void
  onExcluir: () => void
}

export function AlunoRow({ numero, nome, turma, matricula, onEditar, onExcluir }: AlunoRowProps) {
  return (
    <div className="flex items-center gap-4 border-b border-[#f0f0f0] px-4 py-4 last:border-b-0 sm:gap-6 sm:px-6">
      <div
        className="flex size-[47px] shrink-0 items-center justify-center rounded-[20px] shadow-[0px_4px_21px_0px_rgba(16,42,109,0.29)]"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, #375dbe 0%, #244496 48%, #102a6d 93%, transparent 100%)',
        }}
      >
        <img src={iconUserBadge} alt="" className="h-6 w-[15px]" />
      </div>
      <span className="w-8 shrink-0 font-app text-2xl font-extrabold text-black">{numero}</span>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-app text-lg font-semibold text-black/80">{nome}</span>
        <span className="truncate font-app text-sm text-black/40">
          {turma} · {matricula}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={onEditar}
          className="rounded-lg px-3 py-1 font-app text-sm font-semibold text-primary-dark hover:bg-primary-dark/10"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={onExcluir}
          className="rounded-lg px-3 py-1 font-app text-sm font-semibold text-danger hover:bg-danger/10"
        >
          Excluir
        </button>
      </div>
    </div>
  )
}

import iconUserBadge from '../../assets/icons/icon-user-badge.png'

interface AlunoRowProps {
  numero: number
  nome: string
  uniformeRetirado: boolean
}

export function AlunoRow({ numero, nome, uniformeRetirado }: AlunoRowProps) {
  return (
    <div className="flex items-center gap-6 border-b border-[#f0f0f0] px-6 py-4 last:border-b-0">
      <div
        className="flex size-[47px] shrink-0 items-center justify-center rounded-[20px] shadow-[0px_4px_21px_0px_rgba(16,42,109,0.29)]"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, #375dbe 0%, #244496 48%, #102a6d 93%, transparent 100%)',
        }}
      >
        <img src={iconUserBadge} alt="" className="h-6 w-[15px]" />
      </div>
      <span className="font-app text-2xl font-extrabold text-black">{numero}</span>
      <span className="flex-1 truncate font-app text-2xl font-semibold text-black/40">{nome}</span>
      <div className="flex shrink-0 items-center gap-2">
        <span className="font-app text-[11px] font-semibold text-black">Uniforme</span>
        <span
          className="size-[18px] rounded-full"
          style={{ backgroundColor: uniformeRetirado ? '#2AEB2D' : '#EB2A2A' }}
        />
      </div>
    </div>
  )
}

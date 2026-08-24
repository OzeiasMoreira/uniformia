import avatar from '../../assets/images/avatar-header.png'
import iconBell from '../../assets/icons/icon-bell.svg'
import iconChevronDown from '../../assets/icons/icon-chevron-down.svg'
import iconSearch from '../../assets/icons/icon-search.svg'

interface HeaderProps {
  institutionName: string
}

export function Header({ institutionName }: HeaderProps) {
  return (
    <header className="flex h-[75.6px] shrink-0 items-center justify-between rounded-br-[20.16px] rounded-tr-[26.88px] bg-white px-10 shadow-[0px_3.36px_33.6px_0px_rgba(0,0,0,0.06)]">
      <p className="font-app text-base font-bold text-navy">Olá, {institutionName}</p>

      <div className="flex items-center gap-6">
        <label className="relative flex h-[33.6px] w-[280px] items-center rounded-[8.4px] border-[0.84px] border-[rgba(204,204,204,0.74)] px-4">
          <img src={iconSearch} alt="" className="size-3" />
          <input
            type="search"
            placeholder="Pesquisar"
            className="ml-2 w-full bg-transparent font-app text-xs text-text-muted outline-none placeholder:text-[#ccc]"
          />
        </label>

        <button type="button" aria-label="Notificações" className="relative">
          <img src={iconBell} alt="" className="h-[19px] w-5" />
        </button>

        <button type="button" className="flex items-center gap-2">
          <img
            src={avatar}
            alt="Foto de perfil"
            className="size-[34.44px] rounded-[9.24px] object-cover"
          />
          <img src={iconChevronDown} alt="" className="h-2 w-3" />
        </button>
      </div>
    </header>
  )
}

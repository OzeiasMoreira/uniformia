import { NavLink } from 'react-router-dom'
import logo from '../../assets/logos/uniformia-logo.svg'
import { AlunosIcon, DashboardIcon, PedidosIcon, SettingsIcon, UniformesIcon } from '../ui/icons'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', Icon: DashboardIcon },
  { to: '/alunos', label: 'Alunos Matriculados', Icon: AlunosIcon },
  { to: '/pedidos', label: 'Pedidos', Icon: PedidosIcon },
  { to: '/uniformes', label: 'Uniformes', Icon: UniformesIcon },
]

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-full px-5 py-3 font-app text-sm font-semibold transition-colors ${
    isActive ? 'bg-white text-navy' : 'text-white hover:bg-white/10'
  }`

export function Sidebar() {
  return (
    <aside className="flex w-[232px] shrink-0 flex-col gap-10 rounded-l-[26.88px] bg-sidebar px-6 py-10">
      <img src={logo} alt="Uniformia" className="h-auto w-[160px] self-center rounded-2xl" />
      <nav className="flex flex-1 flex-col gap-2">
        {NAV_ITEMS.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} className={navLinkClassName}>
            <Icon className="size-5 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <NavLink to="/settings" className={navLinkClassName}>
        <SettingsIcon className="size-5 shrink-0" />
        <span>Settings</span>
      </NavLink>
    </aside>
  )
}

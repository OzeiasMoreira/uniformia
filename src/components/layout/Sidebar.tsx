import { NavLink } from 'react-router-dom'
import logo from '../../assets/logos/uniformia-logo.svg'
import {
  AlunosIcon,
  DashboardIcon,
  EntregasIcon,
  PedidosIcon,
  SettingsIcon,
  UniformesIcon,
} from '../ui/icons'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', Icon: DashboardIcon },
  { to: '/alunos', label: 'Alunos Matriculados', Icon: AlunosIcon },
  { to: '/pedidos', label: 'Pedidos', Icon: PedidosIcon },
  { to: '/entregas', label: 'Entregas', Icon: EntregasIcon },
  { to: '/uniformes', label: 'Uniformes', Icon: UniformesIcon },
]

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-full px-5 py-3 font-app text-sm font-semibold transition-colors ${
    isActive ? 'bg-white text-navy' : 'text-white hover:bg-white/10'
  }`

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={onClose}
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-[232px] shrink-0 flex-col gap-10 bg-sidebar px-6 py-10 transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <img src={logo} alt="Uniformia" className="h-auto w-[160px] self-center rounded-2xl" />
        <nav className="flex flex-1 flex-col gap-2">
          {NAV_ITEMS.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} className={navLinkClassName} onClick={onClose}>
              <Icon className="size-5 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <NavLink to="/settings" className={navLinkClassName} onClick={onClose}>
          <SettingsIcon className="size-5 shrink-0" />
          <span>Settings</span>
        </NavLink>
      </aside>
    </>
  )
}

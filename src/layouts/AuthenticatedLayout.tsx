import { useState } from 'react'
import type { ReactNode } from 'react'
import { Header } from '../components/layout/Header'
import { Sidebar } from '../components/layout/Sidebar'

interface AuthenticatedLayoutProps {
  institutionName: string
  children: ReactNode
}

export function AuthenticatedLayout({ institutionName, children }: AuthenticatedLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-gradient-to-r from-bg-gradient-from to-bg-gradient-to p-0">
      <div className="flex h-full w-full overflow-hidden bg-[#f3f5fb]">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="flex flex-1 flex-col overflow-y-auto">
          <Header institutionName={institutionName} onMenuClick={() => setMenuOpen(true)} />
          <main className="flex-1 px-4 py-6 sm:px-10 sm:py-8">{children}</main>
        </div>
      </div>
    </div>
  )
}

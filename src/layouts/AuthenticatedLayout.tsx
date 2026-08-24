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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-bg-gradient-from to-bg-gradient-to p-0 lg:p-10">
      <div className="flex h-screen w-full max-w-[1633px] overflow-hidden rounded-none border-0 border-white bg-[#f3f5fb] shadow-[0px_4px_53px_0px_rgba(0,0,0,0.1)] lg:h-[936px] lg:rounded-[26.88px] lg:border">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="flex flex-1 flex-col overflow-y-auto">
          <Header institutionName={institutionName} onMenuClick={() => setMenuOpen(true)} />
          <main className="flex-1 px-4 py-6 sm:px-10 sm:py-8">{children}</main>
        </div>
      </div>
    </div>
  )
}

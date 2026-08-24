import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthenticatedLayout } from '../layouts/AuthenticatedLayout'
import { Alunos } from '../pages/Alunos/Alunos'
import { Dashboard } from '../pages/Dashboard/Dashboard'
import { LoginAluno } from '../pages/Login/LoginAluno'
import { LoginInstituicao } from '../pages/Login/LoginInstituicao'
import { LoginSelecao } from '../pages/Login/LoginSelecao'
import { Pedidos } from '../pages/Pedidos/Pedidos'
import { Settings } from '../pages/Settings/Settings'
import { Uniformes } from '../pages/Uniformes/Uniformes'

const MOCK_INSTITUTION_NAME = 'Universidade Estadual do Norte do Paraná'

function AppShell({ children }: { children: ReactNode }) {
  return <AuthenticatedLayout institutionName={MOCK_INSTITUTION_NAME}>{children}</AuthenticatedLayout>
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginSelecao />} />
      <Route path="/login/instituicao" element={<LoginInstituicao />} />
      <Route path="/login/aluno" element={<LoginAluno />} />
      <Route
        path="/dashboard"
        element={
          <AppShell>
            <Dashboard />
          </AppShell>
        }
      />
      <Route
        path="/alunos"
        element={
          <AppShell>
            <Alunos />
          </AppShell>
        }
      />
      <Route
        path="/pedidos"
        element={
          <AppShell>
            <Pedidos />
          </AppShell>
        }
      />
      <Route
        path="/uniformes"
        element={
          <AppShell>
            <Uniformes />
          </AppShell>
        }
      />
      <Route
        path="/settings"
        element={
          <AppShell>
            <Settings />
          </AppShell>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

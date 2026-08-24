import { BrowserRouter } from 'react-router-dom'
import { AuthenticatedLayout } from './layouts/AuthenticatedLayout'

function App() {
  return (
    <BrowserRouter>
      <AuthenticatedLayout institutionName="Universidade Estadual do Norte do Paraná">
        <p className="font-app text-navy">Conteúdo da página</p>
      </AuthenticatedLayout>
    </BrowserRouter>
  )
}

export default App

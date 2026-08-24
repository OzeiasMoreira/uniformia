import iconDumbbell from '../../assets/icons/icon-dumbbell.svg'
import iconStatAlunos from '../../assets/icons/icon-stat-alunos.svg'
import iconStatGasto from '../../assets/icons/icon-stat-gasto.svg'
import iconStatUniformes from '../../assets/icons/icon-stat-uniformes.svg'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { BarChart } from '../../components/ui/BarChart'
import { Card } from '../../components/ui/Card'
import { DonutChart } from '../../components/ui/DonutChart'
import { StatCard } from '../../components/ui/StatCard'
import { DASHBOARD_MOCK } from '../../mocks/dashboard.mock'

export function Dashboard() {
  const data = DASHBOARD_MOCK

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          icon={<img src={iconStatUniformes} alt="" className="h-11 w-6" />}
          value={String(data.uniformesEntregues)}
          label="Uniformes entregue"
        />
        <StatCard
          icon={<img src={iconStatAlunos} alt="" className="h-9 w-5" />}
          value={String(data.alunosMatriculados)}
          label="Alunos matriculados"
        />
        <StatCard
          icon={<img src={iconStatGasto} alt="" className="size-8" />}
          value={data.totalGasto}
          label="Total gasto"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="p-8">
          <h2 className="font-app text-lg font-semibold text-text-muted">Resumo de entregas</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {data.resumoEntregas.map((item) => (
              <div key={item.label} className="flex min-w-[100px] flex-col gap-1 rounded-lg bg-[#f9f9f9] px-4 py-3">
                <span className="font-app text-xl font-extrabold text-navy">{item.valor}</span>
                <span className="font-app text-xs font-semibold text-text-muted">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4 rounded-lg border-l-4 border-primary bg-[#f9f9f9] px-6 py-4">
            <span className="font-app text-xl font-extrabold text-navy">
              {data.retiradaCoordenacaoHorario}
            </span>
            <span className="font-app text-sm text-text-muted">horas</span>
            <span className="font-app text-sm font-semibold text-text-muted">
              Retirada coordenação
            </span>
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="font-app text-lg font-semibold text-text-muted">Balanceamento</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {data.balanceamento.map((item) => (
              <li key={item.label} className="flex items-center gap-2 font-app text-xs text-text-muted">
                <span className="size-3 rounded-sm" style={{ backgroundColor: item.cor }} />
                {item.label}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <BarChart items={data.balanceamento} maxValue={1500} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="p-8">
          <h2 className="font-app text-lg font-semibold text-text-muted">Resumo de pedidos</h2>
          <div className="mt-6 flex items-center gap-8">
            <DonutChart
              segments={data.resumoPedidos}
              centerValue={String(data.totalPedidos)}
              centerLabel="pedidos"
            />
            <ul className="flex flex-col gap-4">
              {data.resumoPedidos.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <span className="size-[21px] rounded-[3.36px]" style={{ backgroundColor: item.cor }} />
                  <div className="flex flex-col">
                    <span className="font-app text-sm font-medium text-text-muted">{item.label}</span>
                    <span className="font-app text-xs text-navy">{item.percentual}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-center justify-between">
            <h2 className="font-app text-lg font-semibold text-text-muted">
              Alunos que retiraram uniformes
            </h2>
            <span className="rounded-lg border border-[#c4c4c4]/40 px-4 py-1.5 font-app text-xs text-text-muted">
              Julho - 2026
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            {data.alunosQueRetiraram.map((aluno) => (
              <div
                key={aluno.nome}
                className="relative flex w-[147px] flex-col items-center gap-2 rounded-[19px] px-4 pb-5 pt-6"
                style={{ backgroundColor: aluno.corCard }}
              >
                <img src={iconDumbbell} alt="" className="absolute right-3 top-3 size-6 opacity-70" />
                {aluno.avatar ? (
                  <Avatar src={aluno.avatar} alt={aluno.nome} size={41} />
                ) : (
                  <div className="flex size-[41px] items-center justify-center rounded-full bg-white/40 font-app text-sm font-bold text-white">
                    {aluno.nome.charAt(0)}
                  </div>
                )}
                <p className="font-app text-sm font-bold text-white">{aluno.nome}</p>
                <p className="-mt-1 font-app text-[10px] text-white">{aluno.turma}</p>
                <Badge>{aluno.badge}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

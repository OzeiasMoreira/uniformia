import { Link } from 'react-router-dom'

const linkClassName =
  'flex h-[75.66px] w-full items-center justify-center rounded-[5px] bg-primary-dark font-display text-xl font-bold text-white transition-opacity hover:opacity-90'

export function LoginSelecao() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-bg-gradient-from to-bg-gradient-to px-6 py-12">
      <div className="w-full max-w-[520px] rounded-[40px] border border-white/40 bg-white/30 p-10 text-center backdrop-blur-[15px] sm:p-14">
        <p className="font-display text-2xl font-bold text-primary-dark">Bem-vindo (a)</p>
        <h1 className="mt-1 font-display text-[32px] font-bold text-text-strong">
          Você deseja fazer login como:
        </h1>

        <div className="mt-10 flex flex-col gap-6">
          <Link to="/login/instituicao" className={linkClassName}>
            Instituição
          </Link>
          <Link to="/login/aluno" className={linkClassName}>
            Aluno ou responsável
          </Link>
        </div>
      </div>
    </div>
  )
}

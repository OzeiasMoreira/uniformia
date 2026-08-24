import glowInstituicao from '../../assets/images/glow-instituicao.svg'
import loginEscola from '../../assets/images/login-escola.jpg'
import iconEyeHide from '../../assets/icons/icon-eye-hide.svg'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useLoginForm } from '../../hooks/useLoginForm'

export function LoginInstituicao() {
  const {
    identificador,
    setIdentificador,
    senha,
    setSenha,
    mostrarSenha,
    setMostrarSenha,
    loading,
    error,
    handleSubmit,
  } = useLoginForm('instituicao')

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-r from-primary to-primary-dark px-6 py-12 lg:justify-between lg:px-0">
      <div className="relative z-10 w-full max-w-[641px] rounded-[40px] border border-white/40 bg-white/30 p-10 backdrop-blur-[15px] sm:p-14 lg:ml-[6.8%]">
        <p className="font-display text-2xl font-bold text-primary-dark">Bem-vindo (a)</p>
        <h1 className="mt-1 font-display text-[38px] font-bold text-text-strong">Login</h1>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
          <Input
            label="Email"
            name="identificador"
            placeholder="CNPJ da instituição"
            value={identificador}
            onChange={(event) => setIdentificador(event.target.value)}
            required
          />

          <div className="relative">
            <Input
              label="Senha"
              name="senha"
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="Senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setMostrarSenha((value) => !value)}
              aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              className="absolute right-6 top-[46px]"
            >
              <img src={iconEyeHide} alt="" className="h-6 w-[18px]" />
            </button>
          </div>

          <button
            type="button"
            className="self-start font-body text-lg text-text-strong hover:underline"
          >
            Esqueceu sua senha?
          </button>

          {error && <p className="font-app text-sm text-danger">{error}</p>}

          <Button type="submit" loading={loading} className="mt-2">
            Entrar
          </Button>
        </form>
      </div>

      <div className="relative hidden w-[43%] shrink-0 lg:mr-[7.5%] lg:block">
        <img src={glowInstituicao} alt="" className="absolute inset-0 size-full" />
        <img
          src={loginEscola}
          alt="Ilustração de uma escola"
          className="relative aspect-square w-full rounded-full object-cover"
        />
      </div>
    </div>
  )
}

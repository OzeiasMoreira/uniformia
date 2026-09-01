import { Link } from 'react-router-dom'
import glowInstituicao from '../../assets/images/glow-instituicao.svg'
import loginEscola from '../../assets/images/login-escola.png'
import iconEyeHide from '../../assets/icons/icon-eye-hide.svg'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useCadastroInstituicaoForm } from '../../hooks/useCadastroInstituicaoForm'

export function CadastroInstituicao() {
  const {
    nome,
    setNome,
    cnpj,
    setCnpj,
    senha,
    setSenha,
    confirmarSenha,
    setConfirmarSenha,
    mostrarSenha,
    setMostrarSenha,
    loading,
    error,
    handleSubmit,
  } = useCadastroInstituicaoForm()

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-r from-primary to-primary-dark px-6 py-12 lg:justify-between lg:px-0">
      <div className="relative z-10 w-full max-w-[641px] rounded-[40px] border border-white/40 bg-white/30 p-10 backdrop-blur-[15px] sm:p-14 lg:ml-[6.8%]">
        <p className="font-display text-2xl font-bold text-primary-dark">Bem-vindo (a)</p>
        <h1 className="mt-1 font-display text-[38px] font-bold text-text-strong">Criar conta</h1>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
          <Input
            label="Nome da instituição"
            name="nome"
            placeholder="Escola Estadual Monteiro Lobato"
            autoComplete="organization"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />

          <Input
            label="CNPJ"
            name="cnpj"
            placeholder="12.345.678/0001-90"
            autoComplete="off"
            value={cnpj}
            onChange={(event) => setCnpj(event.target.value)}
            required
          />

          <div className="relative">
            <Input
              label="Senha"
              name="senha"
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
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

          <Input
            label="Confirmar senha"
            name="confirmarSenha"
            type={mostrarSenha ? 'text' : 'password'}
            placeholder="Repita a senha"
            autoComplete="new-password"
            value={confirmarSenha}
            onChange={(event) => setConfirmarSenha(event.target.value)}
            required
          />

          <Link
            to="/login/instituicao"
            className="self-start font-body text-lg text-text-strong hover:underline"
          >
            Já tem uma conta? Entrar
          </Link>

          {error && <p className="font-app text-sm text-danger">{error}</p>}

          <Button type="submit" loading={loading} className="mt-2">
            Criar conta
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

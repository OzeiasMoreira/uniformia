# Uniformia — Frontend

Frontend do sistema de gestão de uniformes escolares, desenvolvido em React + TypeScript + Vite, fiel ao protótipo do Figma.

## Stack

- React 19 + TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS v4

## Scripts

```bash
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção (roda tsc antes)
npm run lint     # oxlint
npm run preview  # preview do build
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste `VITE_API_URL` para a URL da API Node.js (desenvolvida separadamente).

## Estrutura

```text
src/
├── assets/       # imagens, ícones e logos
├── components/   # ui, layout, forms, tables
├── pages/        # telas da aplicação
├── layouts/      # layouts compartilhados (ex: shell autenticado)
├── routes/       # configuração de rotas
├── services/     # comunicação HTTP (Axios)
├── hooks/        # hooks customizados
├── types/        # tipos e interfaces TypeScript
├── utils/        # funções utilitárias
└── mocks/        # dados mockados enquanto a API não está disponível
```

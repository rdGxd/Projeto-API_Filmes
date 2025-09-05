# 🎬 Frontend Filmes - Interface Web

Interface web moderna e responsiva para o sistema de gerenciamento de filmes, desenvolvida com Next.js 15 e TypeScript.

## 📋 Visão Geral

Uma aplicação web completa que oferece:
- 🎯 Interface intuitiva e moderna
- 📱 Design responsivo para todos os dispositivos
- 🔐 Sistema de autenticação seguro
- 🎭 Navegação e busca de filmes
- ⭐ Sistema de avaliações interativo
- ❤️ Lista de favoritos personalizada
- 👤 Gerenciamento de perfil de usuário
- 🎨 Design system consistente

## 🚀 Tecnologias

### Core
- **Next.js 15** - Framework React de última geração
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Linguagem tipada para JavaScript
- **Tailwind CSS** - Framework CSS utilitário

### UI/UX
- **Radix UI** - Componentes acessíveis e não-estilizados
- **Lucide React** - Ícones modernos e consistentes
- **Framer Motion** - Animações fluidas e performáticas
- **React Hook Form** - Gerenciamento eficiente de formulários

### Funcionalidades
- **Zod** - Validação de schemas TypeScript-first
- **JS-Cookie** - Gerenciamento de cookies
- **React Toastify** - Notificações elegantes
- **Date-fns** - Manipulação de datas

### Desenvolvimento
- **Vitest** - Framework de testes rápido
- **Testing Library** - Utilitários para testes de componentes
- **ESLint** - Linting para qualidade de código
- **Prettier** - Formatação automática de código

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js 15
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página inicial
│   ├── dashboard/          # Dashboard do usuário
│   │   └── page.tsx
│   └── movies/             # Páginas relacionadas a filmes
│       ├── page.tsx
│       └── [id]/
│           └── page.tsx
├── components/             # Componentes reutilizáveis
│   ├── ui/                 # Componentes base do design system
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── forms/              # Componentes de formulários
│   │   ├── login-form.tsx
│   │   └── movie-form.tsx
│   ├── movieDetails/       # Componentes de detalhes de filmes
│   ├── moviesTables/       # Tabelas de filmes
│   ├── starRating/         # Sistema de avaliação
│   ├── app-sidebar.tsx     # Barra lateral
│   ├── site-header.tsx     # Cabeçalho
│   └── data-table.tsx      # Tabela de dados genérica
├── hooks/                  # Hooks customizados
│   ├── useFavorites.ts     # Gerenciamento de favoritos
│   ├── useConfirmation.ts  # Confirmações de ações
│   └── use-mobile.ts       # Detecção de dispositivos móveis
├── services/               # Serviços de API
│   ├── api.ts              # Configuração base do Axios
│   ├── movieService.ts     # Serviços relacionados a filmes
│   ├── userService.ts      # Serviços de usuário
│   └── favoriteService.ts  # Serviços de favoritos
├── types/                  # Definições de tipos TypeScript
│   ├── movie.ts            # Tipos relacionados a filmes
│   ├── user.ts             # Tipos de usuário
│   ├── loginForm.ts        # Tipos de formulários
│   └── registerForm.ts
├── utils/                  # Funções utilitárias
│   └── date.ts             # Formatação de datas
└── lib/                    # Configurações e utilitários
    └── utils.ts            # Funções auxiliares
```

## ⚡ Quick Start

### Pré-requisitos
- Node.js 18+
- pnpm (recomendado) ou npm
- Backend da API rodando

### 1. Instalação
```bash
cd front-end
pnpm install
```

### 2. Configuração do Ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Configure as variáveis no arquivo .env.local
```

### 3. Variáveis de Ambiente
```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:3001

# Configurações da aplicação
NEXT_PUBLIC_APP_NAME="Movies App"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# URLs externas (opcional)
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

### 4. Executar a Aplicação
```bash
# Desenvolvimento
pnpm run dev

# Build de produção
pnpm run build
pnpm run start

# Linting
pnpm run lint
```

## 🌐 Páginas e Rotas

### Páginas Públicas
- **`/`** - Página inicial com destaques
- **`/movies`** - Catálogo de filmes
- **`/movies/[id]`** - Detalhes do filme
- **`/login`** - Página de login
- **`/register`** - Página de registro

### Páginas Protegidas
- **`/dashboard`** - Dashboard do usuário
- **`/profile`** - Perfil do usuário
- **`/favorites`** - Lista de favoritos
- **`/admin`** - Painel administrativo (apenas admin)

## 🎨 Design System

### Componentes Base (UI)
```tsx
// Exemplo de uso dos componentes
import { Button, Input, Card } from '@/components/ui'

<Button variant="primary" size="lg">
  Entrar
</Button>

<Input
  type="email"
  placeholder="seu@email.com"
  error="Email é obrigatório"
/>

<Card>
  <Card.Header>
    <Card.Title>Título do Card</Card.Title>
  </Card.Header>
  <Card.Content>
    Conteúdo do card
  </Card.Content>
</Card>
```

### Variantes de Componentes
- **Button**: `primary`, `secondary`, `destructive`, `outline`, `ghost`
- **Input**: `default`, `error`, `success`
- **Card**: `default`, `elevated`, `outlined`

### Paleta de Cores
```css
/* Cores principais */
--primary: #0066cc;
--secondary: #6b7280;
--accent: #f59e0b;

/* Estados */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;

/* Neutros */
--background: #ffffff;
--foreground: #111827;
--muted: #f9fafb;
```

## 🧪 Testes

### Executar Testes
```bash
# Testes em modo watch
pnpm run test

# Executar todos os testes
pnpm run test:run

# Interface gráfica dos testes
pnpm run test:ui

# Cobertura de testes
pnpm run test:coverage
```

### Estrutura de Testes
```
src/
├── components/
│   └── __tests__/
│       ├── login-form.test.tsx
│       └── movie-card.test.tsx
├── hooks/
│   └── __tests__/
│       ├── useFavorites.test.ts
│       └── useConfirmation.test.ts
├── services/
│   └── __tests__/
│       ├── movieService.test.ts
│       └── userService.test.ts
├── utils/
│   └── __tests__/
│       └── date.test.ts
└── types/
    └── __tests__/
        └── user.test.ts
```

### Configuração de Testes
- **Vitest**: Framework de testes rápido e moderno
- **React Testing Library**: Testes centrados no usuário
- **jsdom**: Ambiente DOM para testes
- **MSW**: Mock de APIs para testes

## 🔐 Autenticação

### Fluxo de Autenticação
1. **Login**: Usuário faz login com email/senha
2. **Tokens**: Recebe access token (1h) e refresh token (7d)
3. **Armazenamento**: Tokens salvos em cookies httpOnly
4. **Autorização**: Access token enviado em todas as requisições
5. **Refresh**: Renovação automática quando access token expira

### Proteção de Rotas
```tsx
// Exemplo de proteção de rota
import { useAuth } from '@/hooks/useAuth'
import { redirect } from 'next/navigation'

export default function ProtectedPage() {
  const { user, loading } = useAuth()

  if (loading) return <Loading />
  if (!user) redirect('/login')

  return <DashboardContent />
}
```

## 📱 Responsividade

### Breakpoints
```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Tablets pequenos */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Telas grandes */
```

### Abordagem Mobile-First
- Design otimizado para mobile por padrão
- Progressive enhancement para telas maiores
- Touch-friendly para dispositivos móveis
- Navegação adaptativa

## 🎯 Funcionalidades

### Sistema de Filmes
- **Catálogo**: Listagem paginada com filtros
- **Busca**: Busca por título, gênero, ano
- **Detalhes**: Página completa com informações
- **Avaliações**: Sistema de estrelas e comentários

### Gerenciamento de Usuário
- **Perfil**: Edição de dados pessoais
- **Favoritos**: Lista personalizada de filmes
- **Histórico**: Filmes visualizados recentemente
- **Preferências**: Configurações de notificação

### Interface Administrativa
- **Dashboard**: Estatísticas e métricas
- **CRUD Filmes**: Gerenciamento completo
- **Usuários**: Administração de contas
- **Moderação**: Aprovação de conteúdo

## 🚀 Performance

### Otimizações Implementadas
- **Code Splitting**: Carregamento sob demanda
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Componentes carregados quando necessário
- **Caching**: Cache estratégico de dados
- **Bundle Analysis**: Monitoramento do tamanho do bundle

### Métricas de Performance
```bash
# Análise do bundle
pnpm run analyze

# Lighthouse audit
pnpm run lighthouse

# Performance profiling
pnpm run profile
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev          # Inicia servidor de desenvolvimento
pnpm run build        # Build de produção
pnpm run start        # Inicia servidor de produção
pnpm run lint         # Executa linting
pnpm run lint:fix     # Corrige problemas de linting

# Testes
pnpm run test         # Testes em modo watch
pnpm run test:run     # Executa todos os testes
pnpm run test:ui      # Interface gráfica dos testes
pnpm run test:coverage # Cobertura de testes

# Análise
pnpm run analyze      # Análise do bundle
pnpm run type-check   # Verificação de tipos TypeScript
```

## 🐛 Troubleshooting

### Problemas Comuns

#### Erro de Conexão com API
```bash
# Verificar se backend está rodando
curl http://localhost:3001/health

# Verificar variáveis de ambiente
echo $NEXT_PUBLIC_API_URL
```

#### Erro de Autenticação
- Verificar se tokens não expiraram
- Limpar cookies e fazer login novamente
- Verificar CORS no backend

#### Problemas de Build
```bash
# Limpar cache do Next.js
rm -rf .next

# Reinstalar dependências
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 🔧 Configuração Avançada

### Next.js Config
```javascript
// next.config.js
const nextConfig = {
  experimental: {
    turbo: true // Habilitado o Turbopack
  },
  images: {
    domains: ['example.com'] // Domínios permitidos para imagens
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY
  }
}
```

### Tailwind Config
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0066cc',
          secondary: '#6b7280'
        }
      }
    }
  }
}
```

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Deploy automático via Git
git push origin main

# Deploy manual
npx vercel --prod
```

### Docker
```bash
# Build da imagem
docker build -t movies-frontend .

# Executar container
docker run -p 3000:3000 movies-frontend
```

### Variáveis de Produção
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_NAME="Movies App"
NODE_ENV=production
```

## 🤝 Contribuindo

### Padrões de Desenvolvimento
1. Use TypeScript strict mode
2. Siga os padrões do Prettier/ESLint
3. Escreva testes para novos componentes
4. Use commits semânticos
5. Documente componentes complexos

### Estrutura de Commits
```bash
feat: adiciona componente de avaliação
fix: corrige bug no login
docs: atualiza README
style: ajusta formatação
refactor: refatora serviço de API
test: adiciona testes para hooks
```

## 📚 Recursos Adicionais

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Vitest](https://vitest.dev/)

## 🚀 Roadmap e Melhorias Futuras

### 🎯 Próximas Funcionalidades (v2.0)

#### 🎬 Experiência do Usuário
- [ ] **Sistema de Recomendações**: IA para sugerir filmes baseados no histórico
- [ ] **Modo Offline**: Cache local para navegação sem internet
- [ ] **Comparador de Filmes**: Comparação lado a lado de filmes
- [ ] **Listas Personalizadas**: Criar listas temáticas customizadas
- [ ] **Watchlist**: Lista "Para assistir" com notificações
- [ ] **Sistema de Badges**: Conquistas baseadas em atividade

#### 🎨 Interface e Design
- [ ] **Tema Escuro Avançado**: Múltiplos temas customizáveis
- [ ] **Animações Micro**: Micro-interações mais fluidas
- [ ] **Layout Adaptativo**: Interface que se adapta ao conteúdo
- [ ] **Acessibilidade A11Y**: Conformidade total com WCAG 2.1
- [ ] **PWA Completo**: App nativo para mobile
- [ ] **Gestos Touch**: Navegação por gestos em dispositivos móveis

#### 🔧 Funcionalidades Técnicas
- [ ] **Search Avançado**: Busca com filtros inteligentes e autocomplete
- [ ] **Infinite Scroll**: Carregamento contínuo otimizado
- [ ] **Share System**: Compartilhamento nativo e redes sociais
- [ ] **Export/Import**: Backup de dados do usuário
- [ ] **Multi-idiomas**: Internacionalização (i18n)
- [ ] **Notificações Push**: Avisos sobre novos filmes

### 🔮 Visão de Longo Prazo (v3.0+)

#### 🤖 Inteligência Artificial
- [ ] **Chat Bot**: Assistente virtual para recomendações
- [ ] **Análise de Sentimento**: Análise automática de reviews
- [ ] **Detecção de Spoilers**: IA para identificar spoilers automaticamente
- [ ] **Tradução Automática**: Tradução de reviews e comentários
- [ ] **Reconhecimento de Imagem**: Upload de pôsteres para identificar filmes

#### 📱 Mobile e Multiplataforma
- [ ] **App Mobile Nativo**: React Native ou Flutter
- [ ] **App Desktop**: Electron ou Tauri
- [ ] **Extensão de Browser**: Integração com sites de streaming
- [ ] **Apple TV/Android TV**: App para smart TVs
- [ ] **Alexa/Google Assistant**: Comandos de voz

#### 🌐 Integração e APIs
- [ ] **Streaming Integration**: Links diretos para Netflix, Prime, etc.
- [ ] **Redes Sociais**: Login social e compartilhamento automático
- [ ] **Calendário**: Integração com agenda para filmes no cinema
- [ ] **Cinema Integration**: Horários e ingressos de cinemas locais
- [ ] **Sync Multi-dispositivo**: Sincronização em tempo real

### 🛠️ Melhorias Técnicas

#### ⚡ Performance
- [ ] **Server Components**: Migração completa para React Server Components
- [ ] **Edge Computing**: Deploy em edge locations
- [ ] **CDN Otimizado**: Cache inteligente global
- [ ] **Bundle Splitting**: Carregamento mais granular
- [ ] **Web Workers**: Processamento em background
- [ ] **Service Worker**: Cache avançado e offline-first

#### 🔐 Segurança
- [ ] **2FA**: Autenticação de dois fatores
- [ ] **OAuth Providers**: Google, GitHub, Apple Sign-in
- [ ] **CSP Headers**: Content Security Policy avançado
- [ ] **Rate Limiting Client**: Proteção contra abuso
- [ ] **Data Encryption**: Criptografia end-to-end de dados sensíveis

#### 📊 Analytics e Monitoramento
- [ ] **Analytics Detalhado**: Métricas de uso e comportamento
- [ ] **A/B Testing**: Testes de interface e funcionalidades
- [ ] **Error Tracking**: Monitoramento avançado de erros
- [ ] **Performance Monitoring**: Métricas de performance em tempo real
- [ ] **User Feedback**: Sistema integrado de feedback

### 🎯 Metas de Curto Prazo (3-6 meses)

1. **Implementar PWA completo** com cache offline
2. **Adicionar sistema de recomendações básico**
3. **Melhorar acessibilidade** para nota A+ no Lighthouse
4. **Implementar infinite scroll** nas listagens
5. **Adicionar tema escuro avançado**
6. **Criar sistema de notificações**

### 📈 Métricas de Sucesso

- **Performance**: Lighthouse score 95+ em todas as categorias
- **Acessibilidade**: Conformidade WCAG 2.1 AA
- **SEO**: Core Web Vitals no verde
- **Usuários**: 1000+ usuários ativos mensais
- **Engajamento**: Tempo médio de sessão > 5 minutos
- **Reviews**: Média de 4.5+ estrelas nas lojas de app

### 🤝 Como Contribuir com o Roadmap

1. **Issues**: Crie issues para sugerir novas funcionalidades
2. **Discussions**: Participe das discussões sobre prioridades
3. **Pull Requests**: Implemente funcionalidades do roadmap
4. **Testing**: Teste versões beta e reporte bugs
5. **Feedback**: Compartilhe ideias e sugestões

---

**Desenvolvido com ❤️ usando Next.js 15**

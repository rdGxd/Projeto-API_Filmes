# 🎬 Projeto API Filmes

Um sistema completo de gerenciamento de filmes com API REST e interface web moderna.

## 📋 Visão Geral

Este projeto é uma aplicação full-stack para catalogação e avaliação de filmes, desenvolvida com as mais modernas tecnologias web. O sistema permite aos usuários navegar, pesquisar, avaliar e gerenciar uma coleção de filmes com funcionalidades avançadas de autenticação e autorização.

## 🏗️ Arquitetura

```
Projeto-API_Filmes/
├── back-end/          # API REST com NestJS
├── front-end/         # Interface web com Next.js
├── docker-compose.yml # Orquestração de containers
└── README.md         # Este arquivo
```

## 🚀 Tecnologias Principais

### Backend
- **NestJS** - Framework Node.js robusto e escalável
- **TypeScript** - Linguagem tipada para melhor desenvolvimento
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação baseada em tokens
- **Bcrypt** - Hash seguro de senhas
- **Class Validator** - Validação de dados

### Frontend
- **Next.js 15** - Framework React de última geração
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Vitest** - Framework de testes moderno

### DevOps & Ferramentas
- **Docker** - Containerização
- **PostgreSQL** - Banco de dados
- **ESLint & Prettier** - Qualidade de código
- **Jest/Vitest** - Testes automatizados

## ⚡ Quick Start

### Pré-requisitos
- Node.js 18+
- pnpm (recomendado) ou npm
- Docker e Docker Compose

### 1. Clone o repositório
```bash
git clone https://github.com/rdGxd/Projeto-API_Filmes.git
cd Projeto-API_Filmes
```

### 2. Configure as variáveis de ambiente
```bash
# Copie os arquivos de exemplo
cp back-end/.env.example back-end/.env
cp front-end/.env.example front-end/.env

# Edite os arquivos .env com suas configurações
```

### 3. Inicie com Docker (Recomendado)
```bash
# Inicia todos os serviços
docker-compose up -d

# Para acompanhar os logs
docker-compose logs -f
```

### 4. Ou inicie manualmente

#### Backend
```bash
cd back-end
pnpm install
pnpm run start:dev
```

#### Frontend
```bash
cd front-end
pnpm install
pnpm run dev
```

## 🌐 URLs de Acesso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Documentação da API**: http://localhost:3001/api (Swagger)
- **Banco de dados**: localhost:5432

## 📚 Funcionalidades

### 🎭 Para Usuários
- ✅ Cadastro e autenticação de usuários
- ✅ Navegação e busca de filmes
- ✅ Sistema de avaliações e comentários
- ✅ Lista de favoritos personalizada
- ✅ Perfil de usuário editável
- ✅ Interface responsiva e moderna

### 🔧 Para Administradores
- ✅ CRUD completo de filmes
- ✅ Gerenciamento de usuários
- ✅ Moderação de avaliações
- ✅ Dashboard administrativo
- ✅ Relatórios e estatísticas

### 🛠️ Técnicas
- ✅ API REST bem documentada
- ✅ Autenticação JWT
- ✅ Validação de dados robusta
- ✅ Testes automatizados
- ✅ Documentação Swagger
- ✅ Containerização Docker

## 🧪 Testes

### Backend
```bash
cd back-end
pnpm run test          # Testes unitários
pnpm run test:e2e      # Testes end-to-end
pnpm run test:cov      # Cobertura de testes
```

### Frontend
```bash
cd front-end
pnpm run test          # Testes em modo watch
pnpm run test:run      # Executar todos os testes
pnpm run test:coverage # Cobertura de testes
```

## 📖 Documentação

- [📘 README do Backend](./back-end/README.md) - Documentação completa da API
- [📗 README do Frontend](./front-end/README.md) - Documentação da interface web
- [📊 API Documentation](http://localhost:3001/api) - Swagger UI (quando rodando)

## 🚀 Roadmap e Visão do Projeto

### 🎯 Milestones Principais

#### ✅ Fase 1 - MVP (Concluída)
- [x] Sistema de autenticação JWT
- [x] CRUD completo de filmes
- [x] Sistema de reviews e avaliações
- [x] Sistema de favoritos
- [x] Interface web responsiva
- [x] Testes automatizados (36 testes)
- [x] Documentação completa

#### 🔄 Fase 2 - Aprimoramentos (Em Andamento)
- [ ] **Performance**: Cache Redis e otimizações
- [ ] **Real-time**: WebSocket para notificações
- [ ] **Upload**: Sistema de upload de imagens
- [ ] **Search**: Busca avançada com filtros
- [ ] **Analytics**: Métricas de uso e dashboards
- [ ] **Mobile**: PWA e aplicativo mobile

#### 🔮 Fase 3 - Inovação (Futuro)
- [ ] **AI/ML**: Recomendações inteligentes
- [ ] **Microservices**: Arquitetura distribuída
- [ ] **Integrations**: APIs externas (TMDB, streaming)
- [ ] **Social**: Recursos sociais e gamificação
- [ ] **Monetization**: Sistema de assinaturas
- [ ] **Global**: Suporte multi-idioma

### 🛠️ Melhorias Planejadas

#### 🔧 Arquitetura e Performance
- **Microservices**: Migração para arquitetura de microsserviços
- **Event Sourcing**: Implementação de eventos para auditoria
- **GraphQL**: API GraphQL complementar à REST
- **Database Optimization**: Sharding e read replicas
- **Load Balancing**: Distribuição de carga automática
- **Auto-scaling**: Escalabilidade horizontal automática

#### 🤖 Inteligência Artificial
- **Sistema de Recomendações**: ML para sugestões personalizadas
- **Análise de Sentimento**: IA para analisar reviews
- **Moderação Automática**: Detecção de conteúdo inadequado
- **Tags Automáticas**: Categorização inteligente de filmes
- **Detecção de Fraude**: Identificação de atividades suspeitas
- **Analytics Preditivo**: Previsão de tendências

#### 🌐 Integrações e APIs
- **The Movie Database (TMDB)**: Dados completos de filmes
- **Streaming Services**: Disponibilidade em plataformas
- **Cinema APIs**: Horários e ingressos de cinemas
- **Payment Gateway**: Sistema de pagamentos
- **Social Media**: Compartilhamento e login social
- **CDN Global**: Distribuição de conteúdo mundial

#### 📱 Experiência do Usuário
- **Progressive Web App**: Funcionalidades offline
- **Mobile Apps**: Aplicativos nativos iOS/Android
- **Dark Mode**: Tema escuro completo
- **Personalização**: Interface customizável
- **Acessibilidade**: Conformidade WCAG 2.1
- **Multi-idioma**: Suporte a múltiplos idiomas

### 📊 Métricas e Objetivos

#### 🎯 KPIs Técnicos
- **Performance**: Response time < 200ms (95% das requests)
- **Disponibilidade**: 99.9% uptime
- **Segurança**: Zero vulnerabilidades críticas
- **Escalabilidade**: 50.000+ usuários simultâneos
- **Qualidade**: 95%+ cobertura de testes

#### 📈 KPIs de Negócio
- **Usuários Ativos**: 100.000+ usuários mensais
- **Engagement**: 70%+ taxa de retenção
- **Content**: 1M+ reviews de usuários
- **Mobile**: 60%+ acessos via mobile
- **Performance**: 90%+ satisfação do usuário

### 🔄 Processo de Desenvolvimento

#### 🚀 DevOps e CI/CD
- **Kubernetes**: Orquestração de containers
- **Infrastructure as Code**: Terraform/Pulumi
- **Multi-environment**: Dev/Staging/Production
- **Blue-Green Deploy**: Deploy sem downtime
- **Monitoring**: Observabilidade completa
- **Security Scanning**: Análise automática de vulnerabilidades

#### 🧪 Qualidade e Testing
- **Test-Driven Development**: TDD como padrão
- **Integration Testing**: Testes end-to-end
- **Load Testing**: Testes de carga automatizados
- **Security Testing**: Pentests regulares
- **Contract Testing**: Testes de contrato de API
- **Mutation Testing**: Qualidade dos testes

### 🌍 Expansão Global

#### 🗺️ Planos Regionais
- **América Latina**: Foco inicial no Brasil
- **América do Norte**: Expansão para EUA/Canadá
- **Europa**: Mercado europeu
- **Ásia**: Mercados asiáticos emergentes
- **Localização**: Adaptação cultural regional

#### 💰 Modelo de Negócio
- **Freemium**: Funcionalidades básicas gratuitas
- **Premium**: Recursos avançados pagos
- **API as a Service**: Monetização da API
- **Partnerships**: Parcerias com cinemas/streaming
- **Advertising**: Publicidade contextual

### 📅 Timeline Estimado

#### 🗓️ Próximos 6 Meses
- Q1 2024: Performance e Cache
- Q2 2024: Real-time e Upload
- Q3 2024: Mobile PWA
- Q4 2024: AI/ML Básico

#### 🗓️ Próximos 12 Meses
- 2024: Microservices
- 2025: Integrações Externas
- 2025: Mobile Apps
- 2025: Expansão Global

## 🤝 Contribuindo

### 🔧 Para Desenvolvedores
1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### 💡 Para Comunidade
- **Feature Requests**: Sugira novas funcionalidades
- **Bug Reports**: Reporte problemas encontrados
- **Documentation**: Melhore a documentação
- **Testing**: Ajude com testes e QA
- **Feedback**: Compartilhe sua experiência

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Rodrigo** - [GitHub](https://github.com/rdGxd)

## 🙏 Agradecimentos

- Comunidade NestJS
- Equipe do Next.js
- Contribuidores do projeto
- Todos que forneceram feedback

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!**

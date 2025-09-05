# 🎬 API Filmes - Backend

API REST robusta e escalável para gerenciamento de filmes, desenvolvida com NestJS e TypeScript.

## 📋 Visão Geral

Esta API fornece endpoints completos para:
- 🔐 Autenticação e autorização de usuários
- 🎭 Gerenciamento de filmes (CRUD)
- ⭐ Sistema de avaliações e reviews
- ❤️ Lista de favoritos
- 👥 Gerenciamento de usuários
- 🛡️ Segurança e validação de dados

## 🚀 Tecnologias

- **NestJS** - Framework Node.js para aplicações escaláveis
- **TypeScript** - Linguagem tipada
- **PostgreSQL** - Banco de dados relacional
- **TypeORM** - ORM para TypeScript/JavaScript
- **JWT** - Autenticação baseada em tokens
- **Bcrypt** - Hash seguro de senhas
- **Class Validator** - Validação de DTOs
- **Swagger** - Documentação automática da API
- **Jest** - Framework de testes

## 🏗️ Estrutura do Projeto

```
src/
├── app.module.ts           # Módulo principal da aplicação
├── main.ts                 # Ponto de entrada da aplicação
├── auth/                   # Módulo de autenticação
│   ├── auth.module.ts
│   ├── controllers/        # Controllers de autenticação
│   ├── services/           # Serviços de autenticação
│   ├── guards/             # Guards de autorização
│   ├── decorators/         # Decorators customizados
│   └── dto/                # DTOs de autenticação
├── user/                   # Módulo de usuários
│   ├── user.module.ts
│   ├── controllers/        # CRUD de usuários
│   ├── services/           # Lógica de negócio
│   ├── entities/           # Entidades do banco
│   └── dto/                # DTOs de usuário
├── movie/                  # Módulo de filmes
│   ├── movie.module.ts
│   ├── controllers/        # CRUD de filmes
│   ├── services/           # Lógica de negócio
│   ├── entities/           # Entidades do banco
│   └── dto/                # DTOs de filme
├── review/                 # Módulo de avaliações
│   ├── review.module.ts
│   ├── controllers/        # CRUD de reviews
│   ├── services/           # Lógica de negócio
│   ├── entities/           # Entidades do banco
│   └── dto/                # DTOs de review
├── favorite/               # Módulo de favoritos
│   ├── favorite.module.ts
│   ├── controllers/        # CRUD de favoritos
│   ├── services/           # Lógica de negócio
│   ├── entities/           # Entidades do banco
│   └── dto/                # DTOs de favorito
└── common/                 # Módulos compartilhados
    ├── config/             # Configurações
    ├── decorators/         # Decorators globais
    ├── enums/              # Enumeradores
    ├── hashing/            # Serviços de hash
    └── validators/         # Validadores customizados
```

## ⚡ Quick Start

### Pré-requisitos
- Node.js 18+
- pnpm (recomendado)
- PostgreSQL 15+

### 1. Instalação
```bash
cd back-end
pnpm install
```

### 2. Configuração do Ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Configure as variáveis no arquivo .env
```

### 3. Variáveis de Ambiente
```env
# Banco de dados
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_DATABASE=movies_db

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRATION=1h
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRATION=7d

# Aplicação
PORT=3001
NODE_ENV=development
```

### 4. Banco de Dados
```bash
# Com Docker
docker-compose up -d db

# Ou configure um PostgreSQL local
createdb movies_db
```

### 5. Executar a Aplicação
```bash
# Desenvolvimento
pnpm run start:dev

# Produção
pnpm run build
pnpm run start:prod
```

## 🌐 Endpoints da API

### 🔐 Autenticação
```http
POST   /auth/login          # Login de usuário
POST   /auth/register       # Registro de usuário
POST   /auth/refresh        # Renovar token
POST   /auth/logout         # Logout
```

### 👥 Usuários
```http
GET    /users               # Listar usuários (Admin)
GET    /users/me            # Perfil do usuário atual
GET    /users/:id           # Buscar usuário por ID
PATCH  /users/:id           # Atualizar usuário
DELETE /users/:id           # Deletar usuário (Admin)
```

### 🎬 Filmes
```http
GET    /movies              # Listar filmes
GET    /movies/:id          # Buscar filme por ID
POST   /movies              # Criar filme (Admin)
PATCH  /movies/:id          # Atualizar filme (Admin)
DELETE /movies/:id          # Deletar filme (Admin)
GET    /movies/search       # Buscar filmes com filtros
```

### ⭐ Avaliações
```http
GET    /reviews             # Listar avaliações
GET    /reviews/:id         # Buscar avaliação por ID
POST   /reviews             # Criar avaliação
PATCH  /reviews/:id         # Atualizar avaliação (própria)
DELETE /reviews/:id         # Deletar avaliação (própria/admin)
GET    /movies/:id/reviews  # Avaliações de um filme
```

### ❤️ Favoritos
```http
GET    /favorites           # Listar favoritos do usuário
POST   /favorites           # Adicionar aos favoritos
DELETE /favorites/:id       # Remover dos favoritos
```

## 🔒 Autenticação e Autorização

### JWT Tokens
- **Access Token**: Válido por 1 hora, usado para autorizar requisições
- **Refresh Token**: Válido por 7 dias, usado para renovar access tokens

### Roles de Usuário
- **USER**: Usuário comum (pode avaliar, favoritar, gerenciar próprio perfil)
- **ADMIN**: Administrador (todas as permissões + gerenciar filmes e usuários)

### Guards Implementados
- **AuthGuard**: Verifica se o usuário está autenticado
- **RolesGuard**: Verifica permissões baseadas em roles
- **PolicyGuard**: Combina autenticação e autorização

## 🧪 Testes

```bash
# Testes unitários
pnpm run test

# Testes em modo watch
pnpm run test:watch

# Testes end-to-end
pnpm run test:e2e

# Cobertura de testes
pnpm run test:cov

# Debug de testes
pnpm run test:debug
```

### Estrutura de Testes
```
test/
├── auth/
│   ├── auth.controller.spec.ts
│   └── auth.service.spec.ts
├── user/
│   ├── user.controller.spec.ts
│   └── user.service.spec.ts
├── movie/
│   ├── movie.controller.spec.ts
│   └── movie.service.spec.ts
└── app.e2e-spec.ts         # Testes end-to-end
```

## 📊 Documentação da API

A documentação completa da API está disponível via Swagger UI:

```
http://localhost:3001/api
```

### Recursos do Swagger
- 📖 Documentação interativa completa
- 🧪 Teste direto dos endpoints
- 📋 Exemplos de request/response
- 🔐 Autenticação integrada

## 🛡️ Segurança

### Medidas Implementadas
- **Rate Limiting**: Proteção contra ataques de força bruta
- **CORS**: Configurado para origens permitidas
- **Helmet**: Headers de segurança
- **Validation Pipes**: Validação robusta de dados
- **Password Hashing**: Bcrypt com salt rounds
- **JWT**: Tokens seguros com expiração

### Validações
- **DTOs**: Validação de entrada usando class-validator
- **Guards**: Proteção de rotas sensíveis
- **Sanitização**: Limpeza de dados de entrada

## 🚀 Deploy

### Docker
```bash
# Build da imagem
docker build -t movies-api .

# Executar container
docker run -p 3001:3001 movies-api
```

### Variáveis de Produção
```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=very_secure_secret_for_production
```

## 📈 Performance

### Otimizações Implementadas
- **Connection Pooling**: Pool de conexões com PostgreSQL
- **Caching**: Cache em memória para dados frequentes
- **Lazy Loading**: Carregamento sob demanda de relações
- **Pagination**: Paginação em endpoints de listagem
- **Indexação**: Índices otimizados no banco de dados

## 🐛 Troubleshooting

### Problemas Comuns

#### Erro de Conexão com Banco
```bash
# Verificar se PostgreSQL está rodando
sudo systemctl status postgresql

# Verificar variáveis de ambiente
echo $DATABASE_HOST
```

#### Erro de JWT
```bash
# Verificar se JWT_SECRET está configurado
echo $JWT_SECRET

# Renovar tokens se necessário
```

#### Erro de Permissões
- Verificar se o usuário tem a role correta
- Confirmar se os guards estão configurados

## 🤝 Contribuindo

1. Siga os padrões do NestJS
2. Escreva testes para novas funcionalidades
3. Use TypeScript strict mode
4. Documente endpoints no Swagger
5. Valide dados com DTOs

### Padrões de Código
```bash
# Linting
pnpm run lint

# Formatação
pnpm run format

# Pré-commit hooks
pnpm run pre-commit
```

## 📚 Recursos Adicionais

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)

## 🚀 Roadmap e Melhorias Futuras

### 🎯 Próximas Funcionalidades (v2.0)

#### 🔧 APIs e Endpoints
- [ ] **GraphQL Support**: API GraphQL além da REST
- [ ] **WebSocket Real-time**: Notificações em tempo real
- [ ] **Bulk Operations**: Operações em lote otimizadas
- [ ] **Advanced Search**: Busca com Elasticsearch
- [ ] **File Upload**: Upload de imagens e documentos
- [ ] **Email Service**: Sistema de emails transacionais

#### 🏗️ Arquitetura e Performance
- [ ] **Microservices**: Separação em microsserviços
- [ ] **Event Sourcing**: Arquitetura orientada a eventos
- [ ] **CQRS Pattern**: Separação de comandos e consultas
- [ ] **Database Sharding**: Particionamento horizontal
- [ ] **Read Replicas**: Réplicas de leitura para performance
- [ ] **Connection Pooling**: Pool de conexões otimizado

#### 🔐 Segurança Avançada
- [ ] **OAuth 2.0/OIDC**: Provedores externos de autenticação
- [ ] **2FA/MFA**: Autenticação multi-fator
- [ ] **API Rate Limiting**: Limites por usuário/IP
- [ ] **Data Encryption**: Criptografia de dados sensíveis
- [ ] **Audit Logging**: Log detalhado de todas as ações
- [ ] **RBAC Avançado**: Controle de acesso baseado em papéis

### 🔮 Visão de Longo Prazo (v3.0+)

#### 🤖 Inteligência Artificial
- [ ] **Recommendation Engine**: Sistema de recomendações com ML
- [ ] **Content Moderation**: Moderação automática de conteúdo
- [ ] **Sentiment Analysis**: Análise de sentimento em reviews
- [ ] **Auto-tagging**: Tags automáticas para filmes
- [ ] **Fraud Detection**: Detecção de atividades suspeitas
- [ ] **Predictive Analytics**: Análises preditivas de tendências

#### 🌐 Integração e APIs Externas
- [ ] **TMDB Integration**: Integração completa com The Movie DB
- [ ] **Streaming APIs**: Dados de disponibilidade em streaming
- [ ] **Social Media**: Integração com redes sociais
- [ ] **Payment Gateway**: Sistema de pagamentos
- [ ] **Cinema APIs**: Integração com cinemas e ingressos
- [ ] **CDN Integration**: Content Delivery Network

#### 📊 Analytics e Monitoramento
- [ ] **Advanced Metrics**: Métricas detalhadas de uso
- [ ] **Business Intelligence**: Dashboard para insights
- [ ] **A/B Testing**: Testes de funcionalidades
- [ ] **Performance APM**: Monitoramento de performance
- [ ] **Custom Dashboards**: Dashboards personalizáveis
- [ ] **Real-time Analytics**: Analytics em tempo real

### 🛠️ Melhorias Técnicas

#### ⚡ Performance e Escalabilidade
- [ ] **Redis Clustering**: Cache distribuído
- [ ] **Database Optimization**: Otimização de queries e índices
- [ ] **Load Balancing**: Balanceamento de carga
- [ ] **Auto-scaling**: Escalabilidade automática
- [ ] **CDN for API**: Cache de API em edge locations
- [ ] **Async Processing**: Processamento assíncrono de tarefas

#### 🔧 DevOps e Infraestrutura
- [ ] **Kubernetes**: Orquestração de containers
- [ ] **CI/CD Pipeline**: Pipeline completo de deploy
- [ ] **Infrastructure as Code**: Terraform/CloudFormation
- [ ] **Multi-environment**: Ambientes dev/staging/prod
- [ ] **Blue-Green Deployment**: Deploy sem downtime
- [ ] **Monitoring Stack**: Prometheus + Grafana + AlertManager

#### 🧪 Qualidade e Testing
- [ ] **100% Test Coverage**: Cobertura completa de testes
- [ ] **Integration Tests**: Testes de integração abrangentes
- [ ] **Load Testing**: Testes de carga automatizados
- [ ] **Security Testing**: Testes automatizados de segurança
- [ ] **Contract Testing**: Testes de contrato de API
- [ ] **Mutation Testing**: Testes de mutação

### 🎯 Metas de Curto Prazo (3-6 meses)

1. **Implementar cache Redis** para melhorar performance
2. **Adicionar WebSocket** para notificações em tempo real
3. **Criar sistema de upload** de arquivos
4. **Implementar logs estruturados** com Winston
5. **Adicionar métricas** com Prometheus
6. **Configurar CI/CD** completo

### 📈 Métricas de Sucesso

- **Performance**: Response time < 200ms para 95% das requests
- **Disponibilidade**: 99.9% uptime
- **Segurança**: Zero vulnerabilidades críticas
- **Escalabilidade**: Suportar 10.000+ usuários concorrentes
- **Qualidade**: 95%+ cobertura de testes
- **API**: 99% SLA de disponibilidade

### 🔄 Versionamento e Backward Compatibility

#### API Versioning Strategy
- [ ] **Semantic Versioning**: Versionamento semântico
- [ ] **API Deprecation**: Processo de descontinuação
- [ ] **Backward Compatibility**: Manter compatibilidade
- [ ] **Migration Guides**: Guias de migração
- [ ] **Version Headers**: Versionamento via headers

#### Database Migration Strategy
- [ ] **Zero-downtime Migrations**: Migrações sem downtime
- [ ] **Rollback Strategy**: Estratégia de rollback
- [ ] **Data Validation**: Validação de integridade
- [ ] **Backup Automation**: Backup automatizado
- [ ] **Migration Testing**: Testes de migração

### 🌍 Internacionalização e Localização

- [ ] **Multi-language Support**: Suporte a múltiplos idiomas
- [ ] **Timezone Handling**: Gerenciamento de fusos horários
- [ ] **Currency Support**: Suporte a múltiplas moedas
- [ ] **Regional Settings**: Configurações regionais
- [ ] **Localized Content**: Conteúdo localizado

### 🤝 Como Contribuir com o Roadmap

1. **Feature Requests**: Crie issues para novas funcionalidades
2. **Architecture Discussions**: Participe de discussões técnicas
3. **Code Reviews**: Revise PRs de implementações
4. **Performance Testing**: Execute testes de carga
5. **Documentation**: Contribua com documentação técnica

---

**Desenvolvido com ❤️ usando NestJS**
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

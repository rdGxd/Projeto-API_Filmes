# Imagem base
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN pnpm install

# Copiar o restante do código
COPY . .

# Expor porta
EXPOSE 3001

# Comando inicial (NestJS em modo dev)
CMD ["pnpm", "run", "start:dev"]

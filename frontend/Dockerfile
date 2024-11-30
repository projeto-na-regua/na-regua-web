# Etapa 1: Construir o app React
FROM node:18 AS build

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar o código do aplicativo
COPY . .

# Construir o app React para produção
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Copiar o arquivo de configuração personalizado do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar os arquivos de build do React para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]

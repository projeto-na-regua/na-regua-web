# Etapa 1: Construir o app React
FROM node:16 as build

WORKDIR /app

# Copia os arquivos do projeto React
COPY . .

# Instala as dependências e cria o build
RUN npm install
RUN npm run build

# Etapa 2: Servir o build com nginx (mas não rodar nginx dentro do container)
FROM nginx:alpine

# Copia os arquivos do build para o diretório do nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expondo a porta 80 para o nginx (apenas se quiser testar localmente, não é necessário no GitHub Actions)
EXPOSE 80

# O nginx será o responsável por servir a aplicação estática
CMD ["nginx", "-g", "daemon off;"]

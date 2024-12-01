#!/bin/bash

SERVER_IP="44.215.108.101"

# Caminhos do projeto
REACT_PROJECT_DIR="C:/GitHub/na-regua-web/frontend"  # Substitua pelo caminho do seu projeto React
SSH_KEY_PATH="C:/GitHub/provisionamento/id_rsa.pem"  # Substitua pelo caminho da sua chave SSH
REMOTE_DIR="/usr/share/nginx/html"  # Diretório do Nginx no servidor remoto

# Navegue até o diretório do projeto React
cd "$REACT_PROJECT_DIR" || { echo "Erro: Diretório do projeto React não encontrado."; exit 1; }

# Execute os comandos npm para instalar dependências e criar o build
npm install
if [ $? -eq 0 ]; then
  echo "Dependências instaladas com sucesso."
else
  echo "Erro ao instalar dependências. Verifique seu projeto e tente novamente."
  exit 1
fi

npm run build
if [ $? -eq 0 ]; then
  echo "Build do React concluído com sucesso, iniciando a transferência dos arquivos..."
else
  echo "Erro ao criar o build. Verifique o projeto React."
  exit 1
fi

# Comando SCP para transferir a pasta build para o diretório do Nginx no servidor remoto
scp -i "$SSH_KEY_PATH" -r "$REACT_PROJECT_DIR/build/" ubuntu@$SERVER_IP:"$REMOTE_DIR"

# Verifique se a transferência foi bem-sucedida
if [ $? -eq 0 ]; then
  echo "Arquivos transferidos com sucesso para o servidor remoto no diretório Nginx!"
else
  echo "Erro ao transferir os arquivos via SCP."
  exit 1
fi

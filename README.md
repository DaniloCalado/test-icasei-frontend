
# Projeto Teste iCasei Frontend - consumo de uma API do youtube

## Visão Geral

Este projeto permite buscar e visualizar vídeos do YouTube utilizando a API do YouTube. Ele possui duas funcionalidades principais:

1. **Buscar Vídeos**: Permite buscar vídeos no YouTube com base em uma consulta fornecida pelo usuário.
2. **Favoritar Vídeos**: Permite adicionar vídeos aos favoritos e visualizá-los em uma lista separada, podendo também desfavoritar.

## Organização do Projeto

- **Backend**: Implementado com Node.js e Express. Responsável por servir os arquivos estáticos e fazer as requisições à API do YouTube.
- **Frontend**: Interface do usuário que permite buscar e visualizar vídeos, além de favoritar vídeos.
- **Docker-Compose**: Orquestra as aplicações e as dependências.

Tecnologias Utilizadas
- Backend: Node.js, Express, Axios
- Frontend: HTML, CSS, JavaScript
- Docker: Docker, Docker Compose

## Pré-requisitos

- Docker e Docker Compose instalados.
- Conta no Google Cloud para gerar uma chave de API do YouTube.

Especificações tecnicas do teste

- Node.js
- Utilizar a API de busca do YouTube
- Desing responsivo
- Navegação por rotas é requisito obrigatório
- Não utilizar framework JS (React, Vue, Angular ou frameworks relacionados)
- Cores livres, layout livre, imagens livres
- CSS nativo ou LESS, SASS e afins são permitidos
- Código deve ser tipado
- Utilizar microfront para cada aplicação com BFF
- Utilizar docker para microfronts e BFF
- Obrigatório testes unitários


## Passo a Passo para Instalação

### 1. Clone o Repositório

```bash (No seu terminal):
git clone git@github.com:DaniloCalado/test-icasei-frontend.git
cd caminho-onde-foi-clonado-o-repositorio

### 2. Configure o Ambiente
Navegue até o diretório backend do projeto.

Crie um arquivo .env na raiz do diretório backend.

Adicione sua chave de API do YouTube ao arquivo .env no seguinte formato:

API_KEY=YOUR_API_KEY_HERE

Obs: Para consumir os dados da API do YouTube, você deve gerar sua chave de API de aplicação seguindo as instruções neste link:
https://developers.google.com/youtube/v3/getting-started?hl=pt-br

3. Inicie os Contêineres Docker
Na raiz do projeto:
docker-compose up --build

4. Acesse a Aplicação
Abra seu navegador e acesse 'http://localhost:3000'.

teste as Funcionalidades da Aplicação:
Buscar Vídeos: Utilize a barra de busca para encontrar vídeos no YouTube , você tem que apertar na lupa para iniciar a pesquisa.
Favoritar Vídeos: Clique no ícone de estrela para adicionar um vídeo aos favoritos.
Visualizar Favoritos: Navegue até a página de favoritos para ver todos os vídeos que você marcou como favoritos.
Você pode desfavoritar ao clicar na estrela preenchida.



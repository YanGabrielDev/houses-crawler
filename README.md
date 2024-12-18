# Projeto de Crawler para Busca de Casas

Este projeto utiliza o Node.js (versão 23) para realizar scraping de dados da API do QuintoAndar, buscando por casas ou apartamentos com base nos filtros de região e estado fornecidos. Os resultados são armazenados em um banco de dados [Turso](https://turso.tech/) e, caso sejam encontrados novos imóveis, uma notificação é enviada por e-mail utilizando o Nodemailer.

## Tecnologias Utilizadas

- **Node.js 23**: Utilizado por suas features nativas para TypeScript e leitura de variáveis de ambiente sem dependências adicionais.
- **Turso Database**: Um banco de dados leve e rápido para armazenamento dos dados de imóveis.
- **Nodemailer**: Ferramenta para envio de e-mails de notificação.

## Funcionalidades

- Scraping de dados da API do QuintoAndar.
- Filtros de busca por região e estado.
- Comparativo de resultados para identificar novos imóveis.
- Armazenamento no banco de dados.
- Notificações por e-mail sobre novos imóveis encontrados.

## Requisitos do Sistema

1. **Node.js 23**:

   - Certifique-se de que esta versão está instalada.
   - [Baixe ou atualize o Node.js](https://nodejs.org/).
   - Alternativamente, use o nvm para instalar a versão 23.

2. **Conta no Turso Database**:

   - Crie uma conta gratuita no [Turso Database](https://turso.tech/).
   - Obtenha os valores `TURSO_DATABASE_URL` e `TURSO_AUTH_TOKEN` para a configuração do projeto.

3. **Configuração do Nodemailer**:
   - Configure o Nodemailer com um provedor de e-mail (por exemplo, Gmail, Outlook ou outro SMTP).
   - As credenciais serão adicionadas ao arquivo `.env`.

## Configuração do Projeto

1. **Clone o repositório**:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_DIRETORIO>
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure o ambiente**:
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

   ```env
   TURSO_DATABASE_URL=<sua_url_do_turso>
   TURSO_AUTH_TOKEN=<seu_token_de_autenticacao>
   AUTH_EMAIL=<email_de_envio>
   AUTH_PASS=<senha_ou_senha_de_aplicativo>
   RECEIVER_EMAIL=<email_para_receber_notificacoes>
   ```

4. **Prepare o banco de dados**:
   Execute a migração para criar a tabela necessária no banco de dados:
   ```bash
   npm run create-houses-table
   ```

## Executando o Projeto

1. **Rodando o Crawler**:
   Inicie o crawler para buscar novos imóveis:

   ```bash
   npm run crawler
   ```

2. **Fluxo do Projeto**:
   - O projeto se conecta ao banco de dados e realiza a busca de imóveis na API do QuintoAndar.
   - Os resultados são comparados com os dados já salvos para identificar novos imóveis.
   - Se encontrados novos imóveis, eles são salvos no banco e uma notificação por e-mail é enviada.

## Benefícios do Node.js 23

- Suporte nativo para TypeScript sem dependências adicionais.
- Leitura de variáveis de ambiente integrada, eliminando a necessidade da biblioteca dotenv.

## Sugestões de Melhoria

- Adicionar testes automatizados para validar o funcionamento do crawler.
- Implementar logs estruturados para monitorar o processo de scraping e envio de e-mails.
- Criar opção de configuração para filtros dinâmicos através de um arquivo ou interface.

---

Sinta-se à vontade para contribuir com melhorias ou abrir issues no repositório!

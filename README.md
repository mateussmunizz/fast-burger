## 🍔 Fast Burger 011
Um Web App de delivery 100% funcional e responsivo (mobile-first), construído para simular o fluxo completo de um e-commerce de fast-food. O projeto engloba desde a listagem dinâmica do cardápio até o gerenciamento complexo do carrinho e envio do pedido para um banco de dados relacional.

🌍 Acesse a aplicação rodando ao vivo aqui - https://fast-burger-one.vercel.app/

## 🎯 O Desafio e a Solução
O objetivo deste projeto foi criar uma experiência de usuário sem atritos, típica de grandes aplicativos de delivery. Para isso, a arquitetura foi desenhada separando claramente as responsabilidades:

O estado da interface (carrinho, usuário) é gerenciado globalmente no front-end.

A persistência de dados (cardápio, histórico de pedidos) é delegada a um backend como serviço (BaaS), garantindo respostas rápidas e escalabilidade.

## 🛠️ Stack Tecnológico e Decisões de Arquitetura
Front-end
React.js (com Vite): Escolhido pela performance na compilação e componentização eficiente da interface.

Redux Toolkit: Utilizado para o estado global do carrinho de compras. Diferente do Context API, o Redux lida melhor com atualizações frequentes (como alterar a quantidade de itens repetidamente) sem causar re-renderizações desnecessárias na aplicação inteira.

Tailwind CSS: Adotado para uma estilização ágil e consistente, permitindo criar um layout estritamente mobile-first que escala perfeitamente para telas maiores.

React Router DOM (v6+): Utilização avançada dos Loaders e Actions. Os dados do cardápio são buscados antes da página renderizar, eliminando cachoeiras de loading (loading waterfalls) e entregando a UI já preenchida para o usuário.

Back-end & Banco de Dados
Supabase (PostgreSQL): Escolhido como BaaS (Backend as a Service) para gerenciar o banco de dados relacional.

Tabela menu: Fornece o cardápio de forma dinâmica. O React consome e ordena esses dados (Lanches, Acompanhamentos, Sobremesas, Bebidas) no momento do carregamento.

Tabela orders: Recebe o payload (JSON) completo do carrinho via requisições POST, armazenando os dados do cliente, endereço, prioridade e itens comprados para o painel administrativo.

APIs Nativas
Geolocalização: Integração com a API nativa do navegador para buscar a latitude e longitude do usuário, convertendo em endereço legível e acelerando o processo de checkout.

## 📋 Funcionalidades Principais
Consumo de cardápio via API Restful.

Filtros e scroll automático (âncoras) por categorias no cardápio.

Carrinho de compras dinâmico (Adicionar, Remover, Alterar Quantidade, Limpar).

Opção de pedido prioritário (Adiciona 20% ao valor total de forma dinâmica).

Formulário de checkout com validação de telefone (Regex) e geolocalização.

Rota administrativa (/admin) para visualização dos pedidos recebidos no Supabase.

## ⚙️ Rodando o projeto localmente
Pré-requisitos: Node.js v18+ e uma conta no Supabase.

Clone o repositório:

Bash
git clone https://github.com/SEU_USUARIO/fast-burger-011.git
Acesse a pasta e instale as dependências:

Bash
cd fast-burger-011
npm install
Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto e adicione suas credenciais do Supabase:

Snippet de código
VITE_SUPABASE_URL=sua_url_do_projeto
VITE_SUPABASE_KEY=sua_chave_anon_public
Inicie o servidor de desenvolvimento:

Bash
npm run dev

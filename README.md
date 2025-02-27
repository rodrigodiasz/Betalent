# Betalent

Este projeto é um diretório de funcionários desenvolvido com React e TypeScript. Ele exibe informações dos colaboradores em uma tabela responsiva, permitindo a busca por nome, cargo, data de admissão e telefone. Além disso, a interface se adapta tanto para visualizações em desktop quanto mobile, utilizando um sistema de accordion para exibir detalhes de cada funcionário na versão mobile.

## Funcionalidades

- **Busca e Filtro:** Permite pesquisar funcionários por nome, cargo, data de admissão ou telefone.
- **Responsividade:** Layout otimizado para desktop (tabela completa) e mobile (visualização em accordion).
- **Integração com API:** Os dados dos funcionários são carregados de um endpoint (`http://localhost:3000/employees`).
- **Formatação de Telefone:** Função para formatar números de telefone conforme padrão específico.

## Tecnologias Utilizadas

- **React:** Biblioteca para construção da interface.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Fetch API:** Para comunicação com o backend e carregamento dos dados.
- **Tailwind CSS:** Classes utilitárias para estilização (usadas no código para layout e responsividade).

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado.
- npm ou Yarn instalado.

### Passos de Instalação

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/rodrigodiasz/Betalent.git

2. **Acesse a Pasta do Projeto:**

    ```bash
     cd Betalent
    ```
3. **Instale as Dependências:**

    ```bash
    yarn install
    ```
4. **Inicie o Servidor de Desenvolvimento:**

     ```bash
    yarn start

Execute o json-server:

  ```bash
npx json-server --watch db.json --port 3000
```

Após executar o json-server, mantenha o terminal aberto para que o backend continue rodando. Dessa forma, sempre que o aplicativo acessar o endpoint `http://localhost:3000/employees`, os dados dos funcionários estarão disponíveis para consulta.

Aproveite para testar as funcionalidades de busca, filtro e responsividade do projeto!

## Task Management

Sistema de controle de tarefas (CRUD) com filtros de busca.

- [x]  Configuração inicial containers docker
- [x]  Criação de Listas de Tarefas
- [x]  Criação de Tarefas
- [x]  Listagem de Tarefas
- [x]  Atualização de Tarefas
- [x]  Remoção de Tarefas
- [x]  Listagem de Listas de Tarefas
- [x]  Utilizar MongoDB como banco de dados
- [x]  Utilizar Prisma como ORM
- [x]  Filtros de Listagem
- [x]  Escrever testes unitários para os principais serviços e controladores
- [x]  Utilizar Swagger para documentar a API

## Iniciar aplicação

Acessar front/back e rodar o comando para instalar os pacotes
```
npm i
```

Na pasta raiz do projeto executar os seguintes comandos
```
sudo docker compose up --build -d

sudo docker exec -it mongo mongosh --host localhost
```

Colar esse comando no terminal do mongo
```
rs.initiate(
  {
    _id: "rs0",
    members: [
      { _id: 0, host: "mongo:27017" }
    ]
  }
);
```

BACKEND (SWAGGER): http://localhost:3001/api

FRONTEND: http://localhost:3000/

    

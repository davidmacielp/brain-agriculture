# brain-agriculture

### DESCRIÇÃO GERAL
###### Este projeto consiste em construir uma API Rest para o processo seletivo, da NTTData, seguindo os principais critérios que são:

  O usuário deverá ter a possibilidade de cadastrar, editar, e excluir produtores rurais.
  O sistema deverá validar CPF e CNPJ digitados incorretamente.
  A soma de área agrícultável e vegetação, não deverá ser maior que a área total da fazenda
  Cada produtor pode plantar mais de uma cultura em sua Fazenda.
  A plataforma deverá ter um Dashboard que exiba:
      Total de fazendas em quantidade
      Total de fazendas em hectares (área total)
      
### PRINCIPAIS TECNOLOGIAS:
  * Node
  * Typescript
  * PostgreSQL
  * Redis
  * Jest(para tests unitários)
    
### CONSIDERAÇÕES:
   A aplicação foi criada utilizando alguns princípios SOLID, e a partir da garantia que o setup da aplicação
estava funcionando corretamente, foi utilizado TDD para implementação dos serviços.
   Foi aplicada algumas regras de negócio, não todas possíveis pois acredito que o objetivo era mostrar o Design Pattern,
que utilizo e pensamento lógico na criação da aplicação.
 
### PRINCIPAIS MÓDULOS:

#### ADMINS -> Podem criar, se authenticar e visualizar informações da dashboard.
#### CULTURES -> Podem ser criados listados por admins.
#### RURAL PRODUCERS -> Podem ser criados, editados listados e deletados.

### PASSO A PASSO PARA INICIAR A APLICAÇÃO
##### Foi utilizado yarn como gerenciador de pacotes, logo para instalação:
	npm install --global yarn
  
##### Para o uso do PostgreSQL e Redis foi uitlizado o Docker, se possui docker compose instalado:
  	yarn docker
  
###### OBS: Caso não possua Docker, qualquer instancia de PostgreSQL e Redis. Utilize o arquivo ".env.example" para criar um arquivo ".env" com as configurações necessárias.
  
##### Antes de iniciar a aplicação:
  	yarn
 
##### Para iniciar a aplicação:
	yarn dev

##### Para executar os testes:
	yarn test
	
### Para o tests das rotas foi utilizado o Postman:
https://www.postman.com/galactic-robot-923148/workspace/brain-agriculture
    
	

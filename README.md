<h1 align="center">
    <img alt="Launchbase" src="https://storage.googleapis.com/golden-wind/bootcamp-launchbase/logo.png" width="400px" />
</h1>

<h3 align="center">
  Desafio 4-1: Header 🚀
</h3>

Esse é o primeiro desafio da sequência de criação de um site de aulas particulares. A ideia aqui é aplicar, em pequenas doses, os conhecimentos aprendidos nas aulas anteriores.

- Criar um header com dois links: `Teachers` e `Students`.

Além de implementar as seguintes tecnologias:

- NodeJS
- Express
- Nunjucks
- Nodemon

#### Regras de estilização

- Deve ser aplicado um background;
- Deve ser utilizada a fonte Roboto;
- Utilize o conceito de `box-sizing` e o seletor `+` para centralizar os seus links;
- Utilize o `after` e o `transition` para aplicar um efeito visual nos links quando o mouse passar por cima.

<h3 align="center">
  Desafio 4-2: Card do Professor
</h3>

Neste segundo desafio, precisaremos criar o card que irá receber as informações dos professores. Além de que também será instalado o Browser-sync como uma depedência de desenvolvimento, para assim evitarmos de ficar recarregando a página manualmente todas vez que fizermos uma alteração em nosso projeto.

#### Browser-sync

Então, antes de mais nada, vamos instalar o Browser-sync e o npm-run-all.
Vamos rodar o npm-run-all para assim conseguirmos rodar todos nossos scripts em paralelo.

Para instalar o browser-sync basta digitar o seguinte comando no console:

```
npm install browser-sync npm-run-all -D
```

Feito isso, vamos modificar alguns scripts no arquivo `package.json`.

Atualmente, o único script que utilizamos é o `start`, configurado para rodar somente o nodemon.

```json
"scripts": {
  "start": "nodemon server.js"
}
```

Vamos alterar para a seguinte forma:

```json
"scripts": {
  "start": "npm-run-all -p nodemon browsersync",
  "nodemon": "nodemon server.js",
  "browsersync": "browser-sync start --proxy http://localhost:5001 --files 'public,views'" 
}
```

#### Card

Após a instalação e configuração do Browser-sync e npm-run-all, iremos criar o card de detalhes dos professores.

Ele será dividido por duas seções: Imagem e detalhes e iremos incluir as seguintes informações:

  - Imagem randômica de uma coleção de professores (utilizando a api do unsplash)
  - Nome completo
  - Idade
  - Grau de escolaridade (ex.: Doutorado)
  - Tipo de aula (presencial ou à distância)
  - Acompanhamento (ex.: Matemática e Física)
  - Desde (data de cadastro na plataforma)

#### Estilização

Durante a estilização do desafio nós temos a liberdade de escolher como iremos estilizar, porém alguns pontos são obrigatórios:

  - A imagem deve ocupar 40% do card e os detalhes 60%.
  - Utilize o seletor `first-child` e `border-top` para estilizar as divisórias entre os items.
  - Utilize o seletor `nth-child()` para estilizar o label (ex.: Desde) e valor (ex.: 02/02/2020) do item.
  - Utilize o `keyframes` e o `animation` para fazer uma animação do card.
  - Utilize o `box-shadow` para aplicar uma sombra no card.
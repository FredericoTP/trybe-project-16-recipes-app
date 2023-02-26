# :computer: Projeto Recipes App :computer:

Nesse projeto foi desenvolvido um app de receitas de comidas e bebidas utilizando o que há de mais moderno dentro do ecossistema React: Hooks e Context API!
A pessoa usuária pode:
- Ver uma lista de receitas;
- Buscar uma receita por nome, ingrediente ou primeira letra;
- Filtrar uma receita por categoria;
- Favoritar receitas;
- Acompanhar o progresso de preparação de receitas de comidas e bebidas;
- Ver receitas ja finalizadas.

O projeto foi feito em equipe e trabalhamos utilizando a metodologia Kanban. Membros da equipe:
- Frederico Tavares
- Antônio Gabriel
- Juvenal Netto
- Lucas Almeida
- Mateus Galvão
- Sérgio Lima

<br />

### Stacks utilizadas no desenvolvimento:
<div style="display: inline_block"><br>
  <img alt="Fred-HTML" height="50" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
  <img alt="Fred-CSS" height="50" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
  <img alt="Fred-JS" height="50" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
  <img alt="Fred-JEST" height="50" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" />
  <img alt="Fred-REACT" height="50" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
  <img alt="Fred-RTL" height="50" width="40" src="https://testing-library.com/img/logo-large.png" alt="rtl icon" />
</div>

# Acesse o projeto clicando [aqui](https://fredericotp.github.io/trybe-project-16-recipes-app/)! :green_heart:

<br />

<details>
<summary>
  
## 1- Requisitos
  
</summary>

### 1 - Desenvolva os testes unitários de maneira que a cobertura seja de, no mínimo, 90%

### 2 - Crie todos os elementos que devem respeitar os atributos descritos no protótipo para a tela de login

### 3 - Desenvolva a tela de maneira que a pessoa consiga escrever seu email no input de email e sua senha no input de senha

### 4 - Desenvolva a tela de maneira que o formulário só seja válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos

### 5 - Após a submissão do formulário, salve no localStorage o e-mail da pessoa usuária na chave user

### 6 - Redirecione a pessoa usuária para a tela principal de receitas de comidas após a submissão e validação com sucesso do login

### 7 - Implemente o header de acordo com a necessidade de cada tela

### 8 - Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil

### 9 - Desenvolva o botão de busca que, ao ser clicado, a barra de busca deve aparecer. O mesmo serve para escondê-la

### 10 - Implemente os elementos da barra de busca respeitando os atributos descritos no protótipo

### 11 - Implemente 3 radio buttons na barra de busca: Ingredient, Name e First letter

### 12 - Busque na API de comidas caso a pessoa esteja na página de comidas, e na API de bebidas caso esteja na de bebidas

### 13 - Redirecione para a tela de detalhes da receita caso apenas uma receita seja encontrada, com o ID da mesma na URL

### 14 - Caso a busca retorne mais de uma receita, renderize as 12 primeiras encontradas, exibindo a imagem e o nome de cada uma

### 15 - Exiba um alert caso nenhuma receita seja encontrada

### 16 - Implemente o menu inferior posicionando-o de forma fixa e contendo 2 ícones: um para comidas e outro para bebidas

### 17 - Exiba o menu inferior apenas nas telas indicadas pelo protótipo

### 18 - Redirecione a pessoa usuária para a tela correta ao clicar em cada ícone no menu inferior

### 19 - Carregue as 12 primeiras receitas de comidas ou bebidas, uma em cada card

### 20 - Implemente os botões de categoria para serem utilizados como filtro

### 21 - Implemente o filtro das receitas por meio da API ao clicar no filtro de categoria

### 22 - Implemente o filtro como um toggle, o qual se for selecionado novamente, o app deve retornar as receitas sem nenhum filtro

### 23 - Redirecione a pessoa usuária ao clicar no card para a tela de detalhes, que deve mudar a rota e conter o id da receita na URL

### 24 - Realize uma request para a API passando o id da receita que deve estar disponível nos parâmetros da URL

### 25 - Desenvolva a tela de detalhes de uma receita de modo que contenha uma imagem da receita, o título, a categoria em caso de comidas e se é ou não alcoólico em caso de bebidas, uma lista de ingredientes seguidos pelas quantidades, instruções e recomendações

### 26 - Implemente as recomendações. Para receitas de comida, a recomendação deverá ser bebida, já para as receitas de bebida a recomendação deverá ser comida

### 27 - Implemente os 6 cards de recomendação, mostrando apenas 2. O scroll é horizontal, similar a um carousel

### 28 - Desenvolva um botão de nome "Start Recipe" que deve ficar fixo na parte de baixo da tela o tempo todo

### 29 - Implemente a solução de forma que, caso a receita já tenha sido feita, o botão "Start Recipe" desapareça

### 30 - Implemente a solução de modo que, caso a receita tenha sido iniciada mas não finalizada, o texto do botão deve ser "Continue Recipe"

### 31 - Redirecione a pessoa usuária caso o botão "Start Recipe" seja clicado, a rota deve mudar para a tela de receita em progresso

### 32 - Implemente um botão de compartilhar e um de favoritar a receita

### 33 - Implemente a solução de forma que, ao clicar no botão de compartilhar, o link de detalhes da receita deve ser copiado para o clipboard e uma mensagem avisando que o link foi copiado deve aparecer na tela em uma tag HTML

### 34 - Salve as receitas favoritas no localStorage na chave favoriteRecipes

### 35 - Implemente o ícone do coração (favorito) de modo que: deve vir preenchido caso a receita esteja favoritada e vazio caso contrário

### 36 - Implemente a lógica no botão de favoritar. Caso seja clicado, o ícone do coração deve mudar seu estado atual, caso esteja preenchido deve mudar para vazio e vice-versa

### 37 - Desenvolva a tela de receita em progresso de modo que contenha uma imagem da receita, o título, a categoria em caso de comidas e se é ou não alcoólico em caso de bebidas, uma lista de ingredientes com suas respectivas quantidades e instruções

### 38 - Desenvolva um checkbox para cada item da lista de ingredientes

### 39 - Implemente uma lógica que ao clicar no checkbox de um ingrediente, o nome dele deve ser "riscado" da lista

### 40 - Salve o estado do progresso, que deve ser mantido caso a pessoa atualize a página ou volte para a mesma receita

### 41 - Desenvolva a lógica de favoritar e compartilhar. A lógica da tela de detalhes de uma receita se aplica aqui

### 42 - Implemente a solução de modo que o botão de finalizar receita ("Finish Recipe") só pode estar habilitado quando todos os ingredientes estiverem "checkados" (marcados)

### 43 - Redirecione a pessoa usuária após clicar no botão de finalizar receita ("Finish Recipe"), para a página de receitas feitas, cuja rota deve ser /done-recipes

### 44 - Implemente os elementos da tela de receitas feitas respeitando os atributos descritos no protótipo

### 45 - Desenvolva a tela de receitas feitas de modo que, caso a receita do card seja uma comida, ela deve possuir: a foto da receita, nome, categoria, nacionalidade, a data em que a pessoa fez a receita, as 2 primeiras tags retornadas pela API e um botão de compartilhar

### 46 - Desenvolva a tela de maneira que, caso a receita do card seja uma bebida, ela deve possuir: a foto da receita, o nome, se é alcoólica, a data em que a pessoa fez a receita e um botão de compartilhar

### 47 - Desenvolva a solução de modo que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard

### 48 - Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros

### 49 - Redirecione para a tela de detalhes da receita caso seja clicado na foto ou no nome da receita

### 50 - Implemente os elementos da tela de receitas favoritas (cumulativo com os atributos em comum com a tela de receitas feitas), respeitando os atributos descritos no protótipo

### 51 - Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela deve possuir: a foto da receita, nome, categoria, nacionalidade, um botão de compartilhar e um de "desfavoritar"

### 52 - Desenvolva a tela de modo que, caso a receita do card seja uma bebida, ela deve possuir: a foto da receita, nome, se é alcoólica ou não, um botão de compartilhar e um de "desfavoritar"

### 53 - Desenvolva a solução de modo que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard

### 54 - Desenvolva a solução de modo que o botão de "desfavoritar" deve remover a receita da lista de receitas favoritas do localStorage e da tela

### 55 - Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros

### 56 - Redirecione a pessoa usuária ao clicar na foto ou no nome da receita, a rota deve mudar para a tela de detalhes daquela receita

### 57 - Implemente os elementos da tela de perfil respeitando os atributos descritos no protótipo

### 58 - Implemente a solução de maneira que o e-mail da pessoa usuária deve estar visível

### 59 - Implemente 3 botões: um de nome "Done Recipes", um de nome "Favorite Recipes" e um de nome "Logout"

### 60 - Redirecione a pessoa usuária que, ao clicar no botão de "Done Recipes", a rota deve mudar para a tela de receitas feitas

### 61 - Redirecione a pessoa usuária que, ao clicar no botão de "Favorite Recipes", a rota deve mudar para a tela de receitas favoritas

### 62 - Redirecione a pessoa usuária que ao clicar no botão de "Logout", o localStorage deve ser limpo e a rota deve mudar para a tela de login

</details>
<br />

<details>
<summary>

## 2- Nota do Projeto

</summary>

## 100% :heavy_check_mark:

![Project-TrybeWallet-Grade]()

</details>
<br />

<details>
<summary>

## 3- Preview

</summary>

![Project-TrybeWallet-Preview1]()
 
![Project-TrybeWallet-Preview2]()
 
</details>

# ya-time-marker-ionic

Marcador de tempo feito com [Ionic](https://ionicframework.com/) + [ReactJS](https://reactjs.org/).

## Projetos internos

- [`frontend`](./frontend): App Ionic React (HTML5+Javascript).

- [`ya-time-marker-lib`](./ya-time-marker-lib): operações da API; tipagens; interfaces.

## Política de Privacidade

<details>
  <summary>Clique para ver mais</summary>

As [Versões Oficiais](#versões-oficiais) deste app **não** coletam e **nunca** irão coletar ou reportar dados dos usuários. Os dados armazenado e histórico de uso são salvos **localmente** por meio da biblioteca **PouchDB**. Se o usuário optar, poderá **exportar** e **importar** **livremente** esses dados.

**Porém**, por ser um app [open source e livre](#licensa), **forks poderão aparecer**, e desses [eu](https://github.com/guesant) **não** possuirei controle.

</details>

## Desenvolvimento

<details>
  <summary>Clique para ver mais</summary>

### Preparando o Ambiente

<details>
  <summary>Clique para ver mais</summary>

Instale o gerenciador de pacotes [`pnpm`](https://pnpm.js.org/) caso ainda não o tenha.

```sh
npm install -g pnpm
```

Também é necessário ter o [`@ionic/cli`](https://www.npmjs.com/package/@ionic/cli) instalado. Veja a [documentação oficial](https://ionicframework.com/docs/intro/cli#install-the-ionic-cli) para obter mais informações.

```sh
npm install -g @ionic/cli
```

</details>

### Obtendo o código fonte do projeto

<details>
  <summary>Clique para ver mais</summary>

```sh
git clone https://github.com/guesant/ya-time-marker-ionic.git
cd ya-time-marker-ionic
pnpm install
```

</details>

### Executando o projeto

<details>
  <summary>Clique para ver mais</summary>

```sh
cd frontend
ionic serve
```

```sh
cd ya-time-marker-lib
pnpm run dev:watch
pnpm run prod:build
```

</details>

</details>

## Versões Oficiais

<details>
  <summary>Clique para ver mais</summary>

São consideradas [Versões Oficiais](#versões-oficiais) as distribuições deste app por meio dos canais:

- <https://yatime.surge.sh> - Versão PWA (servido via HTTPS).

Fique livre e a vontade para os utilizar :)

</details>

## Agradecimentos

<details>
  <summary>Clique para ver mais</summary>

Obrigado a todos os contribuidores diretos e indiretos das bibliotecas usadas no projeto.

Dentre elas se destacam:

- Ruty

- Ionic

- ReactJS

- PostCSS

- PouchDB

- MaterialUI

- Typescript

- TailwindCSS

- pnpm

- ... e muitas outras

</details>

## Autor

Gabriel Rodrigues - [@guesant](https://github.com/guesant)

## Licensa

[MIT](./LICENSE.mit.txt)

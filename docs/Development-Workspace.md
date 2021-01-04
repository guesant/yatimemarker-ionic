## Desenvolvimento

### Preparando o Ambiente

Instale o gerenciador de pacotes [`pnpm`](https://pnpm.js.org/) caso ainda não o tenha.

```sh
npm install -g pnpm
```

Também é necessário ter o [`@ionic/cli`](https://www.npmjs.com/package/@ionic/cli) instalado. Veja a [documentação oficial](https://ionicframework.com/docs/intro/cli#install-the-ionic-cli) para obter mais informações.

```sh
npm install -g @ionic/cli
```

### Obtendo o código fonte do projeto

```sh
git clone https://github.com/guesant/ya-time-marker-ionic.git
cd ya-time-marker-ionic
pnpm install
```

### Executando o projeto

```sh
cd frontend
ionic serve
```

```sh
cd ya-time-marker-lib
pnpm run dev:watch
pnpm run prod:build
```

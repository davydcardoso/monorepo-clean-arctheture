<div align="center">
  <h1>Monorepo - React(NextJS) && React Native (Expo)</h1>
  <p>Monorepo pnpm rápido para aplicativos multiplataforma criados com Expo e React</p>
</div>

<p align="center">
  <a href="https://github.com/davydcardoso/monorepo-example#-why-is-it-fast"><b>Por que é rápido?</b></a>
  &ensp;&mdash;&ensp;
  <a href="https://github.com/davydcardoso/monorepo-example#-how-to-use-it"><b>Como usar</b></a>
  &ensp;&mdash;&ensp;
  <a href="https://github.com/davydcardoso/monorepo-example#-structure"><b>Estrutura</b></a>
  &ensp;&mdash;&ensp;
  <a href="https://github.com/davydcardoso/monorepo-example#-workflows"><b>Fluxos de trabalho</b></a>
  &ensp;&mdash;&ensp;
  <a href="https://github.com/davydcardoso/monorepo-example#%EF%B8%8F-caveats"><b>Advertências e problemas</b></a>
</p>

<br />

## ⚡ Por que é rápido?

Este repositório usa [pnpm](https://pnpm.io/) e [Turborepo](https://turbo.build/repo) para acelerar as coisas. Com o pnpm, aproveitamos o desempenho da instalação usando o cache do armazenamento global. O Turborepo nos ajuda a executar certas tarefas e armazenar em cache o resultado se executarmos novamente as tarefas com a mesma entrada ou código. Nos fluxos de trabalho, armazenamos em cache o [pnpm store](./.github/actions/setup-monorepo/action.yml#L37) e o [Turborepo cache](./.github/actions/setup-monorepo/action.yml#L50-L56) usando o cache integrado do GitHub Actions, resultando no melhor desempenho possível.

### E o Metro?

Em **apps/mobile**, aproveitamos o cache do Metro para acelerar a construção e a publicação. Usamos o Turborepo para restaurar ou invalidar esse cache. Para preencher esse cache do Metro, o **apps/mobile** tem um script [`$ pnpm build`](./apps/mobile/package.json#L9) que exporta pacotes React Native. O cache do Metro resultante é então reutilizado ao [prévias de publicação](./.github/workflows/preview.yml#L26-L28).

## ℹ️ Devo usá-lo?

Este repositório demonstra uma pilha funcional usando [Expo](https://docs.expo.dev/) em um monorepo rápido, enquanto compartilha a maior parte da base de código com a web. O objetivo principal deste repositório é mostrar o que é possível com o Expo, mantendo o código o mais "limpo" possível. Sinta-se à vontade para usar este repositório como preferir, mas ao iniciar um projeto do zero, considere um modelo com mais suposições. Essas suposições devem ajudá-lo a desenvolver seu projeto mais rápido do que este repositório pode.

- [`create-t3-turbo`](https://github.com/t3-oss/create-t3-turbo) → [Expo](https://docs.expo.dev/), [Next.js](https://nextjs.org/), [pnpm](https://pnpm.io/), [Turborepo](https://turbo.build/repo), [NextAuth.js](https://next-auth.js.org/), [Prisma](https://www.prisma.io/), and [tRPC](https://trpc.io/).

## 🚀 Como usar

Você pode usar e modificar este repositório como quiser. Se quiser usar o EAS para criar seu aplicativo, você precisará criar um [token de acesso Expo](https://expo.dev/accounts/[account]/settings/access-tokens) e defini-lo como segredo de ações do GitHub `EXPO_TOKEN`.

Para executar o repositório localmente, execute estes dois comandos:

- `$ pnpm install` - Isso instala todas as bibliotecas Node necessárias usando [pnpm](https://pnpm.io/).
- `$ pnpm dev` - Startsos servidores de desenvolvimento para todos "**apps**".

### Comandos

Como este monorepo usa [Turborepo](https://turbo.build/repo), você não precisa executar comandos adicionais para configurar as coisas. Sempre que você executar `$ pnpm build`, ele compilará todos os **pacotes** se eles ainda não tiverem sido compilados. Neste monorepo, usamos alguns comandos ou pipelines:

- `$ pnpm dev` - Crie e monitore todos os **apps** e **pacotes** para desenvolvimento.
- `$ pnpm lint` - Analise o código-fonte de todos os **apps** e **pacotes** usando ESLint.
- `$ pnpm test` - Execute todos os testes para pacotes com testes Jest.
- `$ pnpm build` - Crie todos os **apps** e **pacotes** para produção ou para publicá-los no npm.

Ao desenvolver ou implantar um único aplicativo, você pode não precisar do servidor de desenvolvimento para todos os aplicativos. Por exemplo, se você precisar fazer uma correção no aplicativo móvel, não precisará do servidor de desenvolvimento web. Ou ao implantar um único aplicativo para produção, você só precisa compilar esse único aplicativo com todas as dependências.

Este monorepo usa uma convenção de script npm simples de `dev:<app-name>` e `build:<app-name>` para manter esse processo simples. Por baixo dos panos, ele usa [a filtragem de espaço de trabalho do Turborepo](https://turbo.build/repo/docs/core-concepts/monorepos/filtering), definida como um script npm na raiz [**package.json**](./package.json).

- `$ pnpm dev:mobile` - Crie e observe **app/mobile** e todos os **pacotes** usados em dispositivos móveis, para desenvolvimento.
- `$ pnpm dev:web` - Crie e monitore **app/web** e todos os **pacotes** usados na web, para desenvolvimento.
- `$ pnpm build:mobile` - Crie **aplicativos/celulares** e todos os **pacotes** usados em dispositivos móveis, para implantações de produção
- `$ pnpm build:web` - Crie **apps/web** e todos os **pacotes** usados na web, para implantações de produção

### Mudando para bun, yarn ou npmm

Você pode usar qualquer gerenciador de pacotes com o Expo. Se quiser usar bun, yarn ou pnpm, em vez de pnpm, tudo o que você precisa fazer é:

- Remova **.npmrc**, **pnpm-lock.yaml** e **pnpm-workspace.yaml**.
- Remova a propriedade `pnpm` do arquivo raiz **package.json**.
- Adicione a propriedade [`workspaces`](https://docs.npmjs.com/cli/v8/using-npm/workspaces) ao arquivo raiz **package.json**.
- Atualize os fluxos de trabalho para usar bun, yarn ou npm.

> [!AVISO]
> Infelizmente, o npm não suporta o [protocolo workspace](https://yarnpkg.com/protocol/workspace). Você também precisa alterar as referências `"<pacote>": "workspace:*"` para apenas `"<pacote>": "*"` para npm.

## 📁 Estrutura

- [`apps`](./apps) - Aplicativos que usam apenas pacotes e não têm conhecimento de outros aplicativos.
- [`packages`](./packages) - Pacotes que podem usar pacotes monorepo externos e/ou outros.

### Apps

- [`apps/mobile`](./apps/mobile) - Aplicativo Expo usando os pacotes `eslint-config` e `feature-home`.
- [`apps/web`](./apps/web) - Aplicativo Next.js usando os pacotes `eslint-config` e `feature-home`.

## 👷 Fluxos de trabalho

- [`build`](./.github/workflows/build.yml) - Inicia as compilações EAS para **apps/mobile** usando o perfil fornecido.
- [`preview`](./.github/workflows/preview.yml) - Publica apps em um canal de lançamento específico de PR e adiciona um código QR a esse PR.
- [`test`](./.github/workflows/test.yml) - Garante que os apps e pacotes estejam saudáveis em vários sistemas operacionais.

### Fluxos de trabalho compostos

- [`setup-monorepo`](./.github/actions/setup-monorepo/action.yml) - Fluxo de trabalho composto reutilizável para configurar o monorepo no GitHub Actions.

## ⚠️ Advertências

### Instalando várias versões do React Native

React Native é uma biblioteca complexa, dividida em vários pacotes diferentes. Infelizmente, o React Native suporta apenas uma única versão por monorepo. Ao usar várias versões diferentes, as coisas podem quebrar de maneiras inesperadas sem o relatório de erros adequado.

Você pode verificar se seu monorepo está instalando várias versões do React Native com o comando `npm list`, suportado por todos os principais gerenciadores de pacotes:

```bash
$ npm why react-native
$ yarn why react-native

# Bun não tem `bun why` (ainda), mas você pode usar `yarn why` em vez disso
$ bun install --yarn && yarn why react-native

# pnpm precisa de `--recursive` para pesquisar em todos os espaços de trabalho dentro do monorepo
$ pnpm why --recursive react-native
```

Se você estiver usando várias versões, tente atualizar todos os arquivos **package.json** ou use um [`overrides`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#overrides)/[`resolutions`](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/) no **package.json** raiz para forçar apenas uma versão do React Native.

### Usando variáveis de ambiente no React Native

Reutilizar caches do Metro pode ser perigoso se você usar plugins Babel como [transform-inline-environment-variables](https://babeljs.io/docs/en/babel-plugin-transform-inline-environment-variables/). Ao usar plugins Babel para trocar variáveis de ambiente por seus valores reais, você está criando uma dependência em variáveis de ambiente. Como o Metro não tem conhecimento de dependências em variáveis de ambiente, o Metro pode reutilizar uma variável de ambiente em cache incorreta.

Como o Turborepo manipula o cache neste repositório, podemos aproveitar [o cache baseado em variáveis de ambiente](https://turbo.build/repo/docs/core-concepts/caching#altering-caching-based-on-environment-variables). Isso invalida o cache do Metro sempre que certas variáveis de ambiente são alteradas e evita a reutilização de código em cache incorreto.

> [!DICA]
> O Expo agora suporta arquivos `.env` prontos para uso. Isso também significa que o Metro agora é inteligente o suficiente para invalidar o cache sempre que essas variáveis mudam. Não há mais necessidade de fazer isso manualmente.

### Soluções alternativas para pnpm

No ecossistema React Native atual, há muitas dependências implícitas. Elas podem ser do código nativo que é enviado dentro dos pacotes, ou mesmo dependências implícitas por meio da instalação de uma versão específica do Expo ou React Native. Nos gerenciadores de pacotes mais novos, como o pnpm, você terá problemas devido a essas dependências implícitas. Além disso, há outros problemas como [Metro não segue symlinks](https://github.com/facebook/metro/issues/1).

Para contornar esses problemas, precisamos alterar algumas configurações:

1. Deixe o pnpm gerar uma pasta **node_modules** simples, sem links simbólicos. Você pode fazer isso criando um arquivo raiz [**.npmrc**](./.npmrc) contendo ([`node-linker=hoisted`](https://pnpm.io/npmrc#node-linker)). Isso funciona em torno de duas coisas: nenhum suporte a links simbólicos Metro e ter uma maneira simples de determinar onde os módulos estão instalados (veja o ponto 3).

2. Desabilite [`strict-peer-dependencies`](https://pnpm.io/npmrc#strict-peer-dependencies) ou adicione regras [`peerDependencyRules.ignoreMissing`](./package.json#L14-L22) no **package.json**. Isso desabilita alguns dos problemas esperados de dependências implícitas de pares. Sem essas alterações, o pnpm falhará na instalação, solicitando que você instale várias dependências de pares.

3. Atualize a configuração **metro.config.js** para uso em monorepos. Uma explicação completa por opção de configuração pode ser encontrada nos [documentos do Expo](https://docs.expo.dev/guides/monorepos/#modify-the-metro-config). A única adição neste repositório é o [`config.cacheStores`](./apps/mobile/metro.config.js#L22-L24). Esta alteração move o cache do Metro para um local que é acessível pelo Turborepo, nosso principal manipulador de cache (veja [Por que ele é rápido?](#-why-is-it-fast)).

### Pacotes de pré-compilação

O EAS envia apenas os arquivos que são confirmados no repositório. Isso significa que [as pastas `packages/*/build`](.gitignore#L3) precisam ser geradas antes de compilar nossos aplicativos. Para dizer ao EAS como compilar nossos pacotes, podemos [usar o hook `postinstall`](https://docs.expo.dev/build-reference/how-tos/#how-to-set-up-eas-build-with).

### Executando EAS a partir de diretórios de aplicativos

No momento em que este artigo foi escrito, o comando `eas build` precisa ser executado a partir da própria pasta do pacote. O EAS ainda criará um tarball com todos os arquivos do seu monorepo, mas executará os comandos de build a partir desta pasta local. Você pode ver isso acontecendo no [fluxo de trabalho de build](./.github/workflows/build.yml#L32).

### Usando credenciais locais em CI

Se você quiser manter o keystore ou os certificados você mesmo, você tem que [configurar o EAS com credenciais locais](https://docs.expo.dev/app-signing/local-credentials/#credentialsjson). Quando seu provedor de CI não permite que você adicione "arquivos secretos", você pode [codificar esses arquivos para strings base64](https://docs.expo.dev/app-signing/local-credentials/#using-local-credentials-on-builds-triggered-from) e decodificar sempre que precisar.

> É altamente recomendável manter keystores e certificados fora do seu repositório para evitar problemas de segurança.

## ❌ Problemas comuns

\_O projeto ainda está em desenvolvimento

<div align="center">
  <br />
  Owner  <strong>Davyd Cardoso</strong>
  <br />
</div>

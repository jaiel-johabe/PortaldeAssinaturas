# Portal de Assinaturas

![CI](https://github.com/jaiel-johabe/PortaldeAssinaturas/actions/workflows/ci.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Um portal web para geração de assinaturas de e-mail corporativas, com suporte a múltiplos idiomas, personalização de campos e exportação facilitada.

## Visão Geral

O Portal de Assinaturas é uma aplicação web desenvolvida com React, TypeScript e Firebase, que permite aos usuários criar assinaturas de e-mail padronizadas para uso corporativo. A aplicação oferece uma interface intuitiva para preenchimento de dados pessoais e profissionais, com suporte a múltiplos idiomas e opções de personalização.

### Principais Funcionalidades

- Autenticação de usuários via Firebase
- Interface responsiva e amigável
- Suporte a múltiplos idiomas
- Personalização de campos como nome, cargo, departamento, telefone
- Opção para assinaturas bilíngues
- Visualização prévia da assinatura
- Exportação da assinatura para uso em clientes de e-mail

## Requisitos

- Node.js 16.x ou superior
- npm 7.x ou superior (ou yarn/pnpm)
- Conta no Firebase para autenticação

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/portal-assinaturas.git
cd portal-assinaturas
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Ative a autenticação por e-mail/senha
   - Copie as credenciais do Firebase para o arquivo `src/firebase.ts`

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

5. Acesse a aplicação em `http://localhost:5173`

## Estrutura do Projeto

```
/
├── public/              # Arquivos públicos
├── src/                 # Código-fonte
│   ├── components/      # Componentes React
│   ├── contexts/        # Contextos React (AuthContext)
│   ├── lib/             # Bibliotecas e utilitários
│   ├── pages/           # Páginas da aplicação
│   ├── App.tsx          # Componente principal
│   ├── firebase.ts      # Configuração do Firebase
│   ├── index.css        # Estilos globais
│   ├── main.tsx         # Ponto de entrada
│   └── types.ts         # Definições de tipos
├── index.html           # Template HTML
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração do TypeScript
├── vite.config.ts       # Configuração do Vite
└── LICENSE              # Licença MIT
```

## Personalização

### Alterando Domínios de E-mail

Para alterar os domínios disponíveis no seletor, edite o arquivo `src/components/SignatureForm.tsx`:

```typescript
// Localize este trecho
{[
  '@examplegroup.com.br',
  '@examplegroup.com',
  '@examplegroupglobal.com',
  '@examplegroupglobal.com.br'
].sort().map(domain => (
  <option key={domain} value={domain}>
    {domain}
  </option>
))}

// Substitua pelos domínios desejados
```

### Alterando Cargos e Departamentos

Os cargos e departamentos são definidos no arquivo `src/types.ts`. Para modificá-los:

1. Localize as constantes `DEPARTMENTS` e `ROLES_BY_LANGUAGE`
2. Edite as listas para cada idioma conforme necessário

Exemplo:
```typescript
export const DEPARTMENTS = {
  pt: [
    'Administrativo',
    'Comercial',
    // Adicione ou remova departamentos aqui
  ],
  // Outros idiomas...
};
```

### Alterando o Logo

Para alterar o logo da empresa:

1. Substitua o arquivo de logo em `public/logo.png` (mantenha o mesmo nome para evitar alterações no código)
2. Ou edite o componente `SignaturePreview.tsx` para apontar para o novo logo:

```typescript
// Localize a referência ao logo
<img 
  src="/path/to/your/logo.png" 
  alt="Logo da Empresa" 
  className="w-32 h-auto"
/>
```

### Alterando Cores e Layout

As cores principais são definidas no arquivo `tailwind.config.js` e podem ser personalizadas:

```javascript
theme: {
  extend: {
    colors: {
      green: {
        // Altere os valores hexadecimais para personalizar as cores
        500: '#10B981',
        600: '#059669',
        700: '#047857',
      },
      // Adicione outras cores conforme necessário
    },
  },
},
```

Para alterar o layout da assinatura, edite o componente `SignaturePreview.tsx`.

## Métodos de Autenticação

### Firebase Authentication (Padrão)

O projeto utiliza Firebase Authentication por padrão. A configuração está no arquivo `src/firebase.ts` e a lógica de autenticação no `src/contexts/AuthContext.tsx`.

### Active Directory (AD)

Para integrar com Active Directory:

1. Instale as dependências necessárias:
```bash
npm install @azure/msal-browser @azure/msal-react
```

2. Crie um arquivo `src/auth/adConfig.ts`:
```typescript
export const msalConfig = {
  auth: {
    clientId: "seu-client-id",
    authority: "https://login.microsoftonline.com/seu-tenant-id",
    redirectUri: "http://localhost:5173",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read"]
};
```

3. Crie um contexto de autenticação AD em `src/contexts/ADAuthContext.tsx`
4. Substitua o provedor de autenticação no `App.tsx`

### Banco de Dados

Para autenticação com banco de dados próprio:

1. Configure um servidor backend (Node.js/Express, PHP, etc.)
2. Implemente endpoints de autenticação (login, logout, verificação)
3. Crie um serviço de autenticação em `src/services/authService.ts`
4. Adapte o contexto de autenticação para usar este serviço

## Segurança

### Boas Práticas

1. **Variáveis de Ambiente**: Nunca exponha chaves de API diretamente no código. Use variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione suas chaves: `VITE_FIREBASE_API_KEY=sua-chave`
   - Acesse no código: `import.meta.env.VITE_FIREBASE_API_KEY`

2. **Regras de Segurança do Firebase**: Configure regras de segurança adequadas no Firebase Console para proteger seus dados.

3. **Validação de Entrada**: Sempre valide dados de entrada do usuário, tanto no frontend quanto no backend.

4. **HTTPS**: Sempre use HTTPS em produção para proteger dados em trânsito.

5. **Autenticação Robusta**: Implemente políticas de senha forte e considere autenticação de dois fatores.

## Implantação

### Vercel (Recomendado)

1. Crie uma conta na [Vercel](https://vercel.com)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente
4. Implante com um clique

### Netlify

1. Crie uma conta na [Netlify](https://netlify.com)
2. Conecte seu repositório GitHub
3. Configure o comando de build: `npm run build`
4. Configure o diretório de publicação: `dist`
5. Configure as variáveis de ambiente

### Hospedagem Tradicional

1. Construa o projeto:
```bash
npm run build
```

2. Faça upload do conteúdo da pasta `dist` para seu servidor web

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Autor

JAIEL JOHABE MACEDO BARBOZA - © 2025

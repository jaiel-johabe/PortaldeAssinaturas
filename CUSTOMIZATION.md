# Guia de Personalização Avançada

Este documento fornece instruções detalhadas para personalizar todos os aspectos do Portal de Assinaturas, permitindo adaptá-lo completamente às necessidades da sua organização.

## Índice

- [Personalização Visual](#personalização-visual)
  - [Logo](#logo)
  - [Cores](#cores)
  - [Layout da Assinatura](#layout-da-assinatura)
  - [Fontes](#fontes)
- [Personalização de Dados](#personalização-de-dados)
  - [Domínios de E-mail](#domínios-de-e-mail)
  - [Departamentos](#departamentos)
  - [Cargos](#cargos)
  - [Empresas](#empresas)
  - [Países e Códigos Telefônicos](#países-e-códigos-telefônicos)
- [Personalização de Idiomas](#personalização-de-idiomas)
- [Personalização de Autenticação](#personalização-de-autenticação)

## Personalização Visual

### Logo

#### Substituição Básica

1. Substitua o arquivo de logo em `public/logo.png` com sua própria imagem (mantenha o mesmo nome e formato)
2. Recomendação: use uma imagem PNG com fundo transparente, dimensões aproximadas de 200x80px

#### Personalização Avançada

Para alterar o tamanho, posição ou outras propriedades do logo:

1. Abra o arquivo `src/components/SignaturePreview.tsx`
2. Localize o elemento de imagem do logo:

```tsx
<img 
  src="/logo.png" 
  alt="Logo da Empresa" 
  className="w-32 h-auto"
/>
```

3. Modifique as classes Tailwind conforme necessário:
   - `w-32`: largura (32 = 8rem ≈ 128px)
   - `h-auto`: altura automática proporcional
   - Adicione outras classes como `mx-auto` (centralizar), `mb-2` (margem inferior), etc.

4. Para usar um logo diferente para cada empresa:

```tsx
<img 
  src={company === "OFICIAL" ? "/logo-oficial.png" : "/logo-group.png"} 
  alt={`Logo ${company}`} 
  className="w-32 h-auto"
/>
```

### Cores

#### Alteração das Cores Principais

1. Abra o arquivo `tailwind.config.js`
2. Modifique as definições de cores:

```js
theme: {
  extend: {
    colors: {
      green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        // Verde claro (usado em backgrounds sutis)
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        // Verde principal (botões, links, etc)
        500: '#10B981', // <-- Altere para sua cor primária
        // Verde escuro (hover, active)
        600: '#059669', // <-- Altere para uma versão mais escura
        700: '#047857', // <-- Altere para uma versão ainda mais escura
        800: '#065f46',
        900: '#064e3b',
      },
      // Adicione outras cores conforme necessário
      secondary: {
        500: '#6366f1', // Exemplo de cor secundária
      },
    },
  },
},
```

#### Alteração Completa do Esquema de Cores

Para mudar completamente o esquema de cores (ex: de verde para azul corporativo):

1. Modifique o `tailwind.config.js` como acima
2. Busque e substitua todas as classes de cor nos componentes:
   - `text-green-600` → `text-blue-600`
   - `bg-green-500` → `bg-blue-500`
   - `border-green-300` → `border-blue-300`
   - `focus:ring-green-500` → `focus:ring-blue-500`
   - etc.

3. Você pode usar um script para fazer isso automaticamente:

```bash
find ./src -type f -name "*.tsx" -exec sed -i 's/green-/blue-/g' {} \;
```

### Layout da Assinatura

O layout da assinatura é definido no componente `SignaturePreview.tsx`. Para modificá-lo:

1. Abra `src/components/SignaturePreview.tsx`
2. Identifique as seções principais:
   - Container principal
   - Seção do logo
   - Informações de contato
   - Redes sociais (se houver)

3. Exemplo de alteração para um layout horizontal:

```tsx
// De layout vertical (padrão)
<div className="flex flex-col">
  <div className="logo">...</div>
  <div className="info">...</div>
</div>

// Para layout horizontal
<div className="flex flex-row items-center gap-4">
  <div className="logo">...</div>
  <div className="info">...</div>
</div>
```

4. Para adicionar uma linha divisória:

```tsx
<div className="flex flex-row items-center gap-4">
  <div className="logo">...</div>
  <div className="h-16 w-px bg-gray-300 mx-4"></div> {/* Linha divisória vertical */}
  <div className="info">...</div>
</div>
```

5. Para adicionar redes sociais ou outros elementos:

```tsx
<div className="social-icons flex gap-2 mt-2">
  {/* Ícones de redes sociais */}
  <a href="https://linkedin.com/company/sua-empresa">
    <img src="/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
  </a>
  {/* Outros ícones */}
</div>
```

### Fontes

Para alterar as fontes utilizadas:

1. Adicione a fonte ao arquivo `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
```

2. Configure no `tailwind.config.js`:

```js
theme: {
  extend: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      // Adicione outras fontes conforme necessário
      display: ['Playfair Display', 'serif'],
    },
  },
},
```

3. As classes Tailwind usarão automaticamente a fonte configurada, ou você pode especificar:

```tsx
<h1 className="font-sans">Título com Montserrat</h1>
<h2 className="font-display">Título com Playfair</h2>
```

## Personalização de Dados

### Domínios de E-mail

Para alterar os domínios disponíveis:

1. Abra `src/components/SignatureForm.tsx`
2. Localize o seletor de domínios:

```tsx
<select
  id="emailDomain"
  {...register('emailDomain', { required: true })}
  className={/* ... */}
>
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
</select>
```

3. Substitua a lista de domínios pelos seus próprios:

```tsx
{[
  '@suaempresa.com.br',
  '@suaempresa.com',
  '@grupo.suaempresa.com',
  '@internacional.suaempresa.com'
].sort().map(domain => (
  <option key={domain} value={domain}>
    {domain}
  </option>
))}
```

### Departamentos

Os departamentos são definidos no arquivo `src/types.ts`:

1. Localize a constante `DEPARTMENTS`:

```tsx
export const DEPARTMENTS = {
  pt: [
    'Administrativo',
    'Comercial',
    'Comex',
    // ...outros departamentos
  ],
  en_uk: [
    'Administrative',
    'Commercial',
    'Foreign Trade',
    // ...traduções em inglês
  ],
  // ...outros idiomas
};
```

2. Modifique a lista para cada idioma conforme necessário:

```tsx
export const DEPARTMENTS = {
  pt: [
    'Marketing',
    'Vendas',
    'Desenvolvimento',
    'Recursos Humanos',
    'Financeiro',
    'Suporte',
    'Diretoria',
  ],
  en_uk: [
    'Marketing',
    'Sales',
    'Development',
    'Human Resources',
    'Finance',
    'Support',
    'Board',
  ],
  // Atualize os outros idiomas também
};
```

### Cargos

Os cargos são definidos de forma semelhante aos departamentos:

1. Localize a constante `ROLES_BY_LANGUAGE`:

```tsx
export const ROLES_BY_LANGUAGE = {
  pt: [
    'ESPECIALISTA',
    'LÍDER',
    'COORDENAÇÃO',
    // ...outros cargos
  ],
  // ...outros idiomas
};
```

2. Modifique a lista para cada idioma:

```tsx
export const ROLES_BY_LANGUAGE = {
  pt: [
    'Estagiário',
    'Analista Júnior',
    'Analista Pleno',
    'Analista Sênior',
    'Coordenador',
    'Gerente',
    'Diretor',
    'CEO',
  ],
  en_uk: [
    'Intern',
    'Junior Analyst',
    'Analyst',
    'Senior Analyst',
    'Coordinator',
    'Manager',
    'Director',
    'CEO',
  ],
  // Atualize os outros idiomas
};
```

### Empresas

Para modificar a lista de empresas:

1. Abra `src/components/SignatureForm.tsx`
2. Localize a constante `COMPANIES`:

```tsx
const COMPANIES = [
  'Example GROUP',
  'OFICIAL'
].sort();
```

3. Substitua pela sua lista de empresas:

```tsx
const COMPANIES = [
  'Empresa Principal S.A.',
  'Subsidiária Ltda.',
  'Divisão Internacional',
  'Startup Inovadora'
].sort();
```

### Países e Códigos Telefônicos

Para modificar os códigos de país disponíveis:

1. Abra `src/components/SignatureForm.tsx`
2. Localize o seletor de países:

```tsx
<select
  id="phoneCountry"
  {...register('phoneCountry')}
  className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
>
  <option value="">-</option>
  {['+55', '+1', '+44', '+49', '+33', '+39', '+41', '+45', '+81', '+91'].map(code => (
    <option key={code} value={code}>
      {code}
    </option>
  ))}
</select>
```

3. Modifique a lista de códigos conforme necessário:

```tsx
{[
  '+55', // Brasil
  '+351', // Portugal
  '+1', // EUA/Canadá
  '+34', // Espanha
  '+54', // Argentina
  '+56', // Chile
  '+52', // México
].map(code => (
  <option key={code} value={code}>
    {code}
  </option>
))}
```

## Personalização de Idiomas

Para adicionar ou modificar idiomas:

1. Abra `src/types.ts`
2. Localize a constante `LANGUAGES`:

```tsx
export const LANGUAGES = {
  pt: 'Português',
  en_uk: 'English (UK)',
  en_us: 'English (US)',
  // ...outros idiomas
};
```

3. Adicione ou remova idiomas conforme necessário:

```tsx
export const LANGUAGES = {
  pt: 'Português',
  en_us: 'English (US)',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
};
```

4. Certifique-se de adicionar as traduções correspondentes em:
   - `FIELD_LABELS` em `SignatureForm.tsx`
   - `DEPARTMENTS` em `types.ts`
   - `ROLES_BY_LANGUAGE` em `types.ts`

5. Exemplo de adição de espanhol:

```tsx
// Em FIELD_LABELS
es: {
  firstName: 'Nombre',
  lastName: 'Apellido',
  email: 'Usuario',
  domain: 'Dominio',
  country: 'País',
  areaCode: 'Código de área',
  phoneNumber: 'Número',
  extension: 'Extensión',
  department: 'Departamento',
  role: 'Cargo',
  company: 'Empresa',
  generate: 'Generar firma',
  selectDomain: 'Seleccione dominio',
  selectDepartment: 'Seleccione departamento',
  selectRole: 'Seleccione cargo (opcional)',
  selectCompany: 'Seleccione empresa',
},

// Em DEPARTMENTS
es: [
  'Administrativo',
  'Comercial',
  'Comercio Exterior',
  // ...traduções em espanhol
],

// Em ROLES_BY_LANGUAGE
es: [
  'ESPECIALISTA',
  'LÍDER',
  'COORDINACIÓN',
  // ...traduções em espanhol
],
```

## Personalização de Autenticação

### Firebase Authentication (Padrão)

Para configurar o Firebase Authentication:

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative a autenticação por e-mail/senha
3. Obtenha as credenciais do projeto
4. Atualize o arquivo `src/firebase.ts`:

```tsx
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-ABCDEFGHIJ"
};
```

### Active Directory / Microsoft Entra ID

Para integrar com Microsoft Entra ID (antigo Azure AD):

1. Registre um aplicativo no [Portal do Azure](https://portal.azure.com/)
2. Instale as dependências:

```bash
npm install @azure/msal-browser @azure/msal-react
```

3. Crie um arquivo `src/auth/msalConfig.ts`:

```tsx
import { Configuration, LogLevel } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "seu-client-id",
    authority: "https://login.microsoftonline.com/seu-tenant-id",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read", "profile", "email"]
};
```

4. Crie um contexto de autenticação AD em `src/contexts/MsalAuthContext.tsx`
5. Modifique o `App.tsx` para usar o novo provedor de autenticação

### Autenticação com Banco de Dados Próprio

Para implementar autenticação com seu próprio banco de dados:

1. Configure um servidor backend (Node.js/Express, PHP, etc.)
2. Crie um serviço de autenticação em `src/services/authService.ts`:

```tsx
const API_URL = 'https://seu-backend.com/api';

export const authService = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Falha na autenticação');
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.user;
  },
  
  async logout() {
    localStorage.removeItem('token');
  },
  
  async getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    const response = await fetch(`${API_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      localStorage.removeItem('token');
      return null;
    }
    
    return response.json();
  },
};
```

3. Adapte o contexto de autenticação em `src/contexts/AuthContext.tsx` para usar este serviço

### LDAP

Para integração com LDAP:

1. É necessário um servidor backend que se comunique com o servidor LDAP
2. Implemente endpoints REST no backend para autenticação
3. Use o mesmo padrão do exemplo de "Autenticação com Banco de Dados Próprio" acima, mas apontando para seus endpoints LDAP

### Autenticação Híbrida

Para suportar múltiplos métodos de autenticação:

1. Crie uma interface comum para todos os provedores de autenticação
2. Implemente cada provedor separadamente
3. Crie um provedor de autenticação que delegue para o método apropriado
4. Adicione uma tela de seleção de método de login

Exemplo de interface comum:

```tsx
// src/services/authInterface.ts
export interface AuthProvider {
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<any>;
}
```

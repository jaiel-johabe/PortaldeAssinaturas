# Guia de Segurança

Este documento fornece diretrizes e melhores práticas para garantir a segurança do Portal de Assinaturas em ambientes de produção.

## Índice

- [Configuração Segura](#configuração-segura)
- [Autenticação](#autenticação)
- [Proteção de Dados](#proteção-de-dados)
- [Implantação Segura](#implantação-segura)
- [Monitoramento e Logs](#monitoramento-e-logs)
- [Atualizações e Manutenção](#atualizações-e-manutenção)

## Configuração Segura

### Variáveis de Ambiente

Nunca armazene informações sensíveis diretamente no código-fonte. Use variáveis de ambiente para todas as credenciais e configurações sensíveis.

1. Crie um arquivo `.env.local` (que não será versionado):

```
VITE_FIREBASE_API_KEY=sua-api-key
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
VITE_FIREBASE_MEASUREMENT_ID=G-ABCDEFGHIJ
```

2. Acesse as variáveis no código:

```typescript
// src/firebase.ts
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
```

3. Configure as variáveis de ambiente na plataforma de hospedagem (Vercel, Netlify, etc.)

### HTTPS

Sempre use HTTPS em ambientes de produção:

1. Configure redirecionamento automático de HTTP para HTTPS
2. Use cabeçalhos de segurança adequados:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.google.com; connect-src 'self' https://*.firebaseio.com; img-src 'self' data:;
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
```

3. Para configurar estes cabeçalhos:
   - Na Vercel: crie um arquivo `vercel.json` na raiz do projeto
   - No Netlify: crie um arquivo `netlify.toml` ou `_headers`
   - Em servidores tradicionais: configure no servidor web (Apache, Nginx, etc.)

## Autenticação

### Firebase Authentication

1. Configure regras de autenticação robustas no Firebase Console:
   - Exija verificação de e-mail
   - Defina requisitos de senha forte
   - Limite tentativas de login malsucedidas

2. Implemente logout automático após inatividade:

```typescript
// src/contexts/AuthContext.tsx
useEffect(() => {
  let inactivityTimer: number;
  
  const resetTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = window.setTimeout(() => {
      logout();
    }, 30 * 60 * 1000); // 30 minutos
  };
  
  // Eventos para resetar o timer
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
  events.forEach(event => {
    document.addEventListener(event, resetTimer);
  });
  
  resetTimer();
  
  return () => {
    clearTimeout(inactivityTimer);
    events.forEach(event => {
      document.removeEventListener(event, resetTimer);
    });
  };
}, [logout]);
```

### Autenticação Multifator (MFA)

Para implementar MFA com Firebase:

1. Ative a autenticação multifator no Firebase Console
2. Atualize o fluxo de login para suportar MFA:

```typescript
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  multiFactor, 
  PhoneAuthProvider, 
  PhoneMultiFactorGenerator 
} from "firebase/auth";

// Primeiro login
async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // Verificar se é necessário MFA
    if (error.code === 'auth/multi-factor-auth-required') {
      const resolver = getMultiFactorResolver(auth, error);
      // Solicitar código de verificação
      const phoneInfoOptions = {
        phoneNumber: user.phoneNumber,
        session: resolver.session
      };
      const phoneAuthProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions);
      
      // Após o usuário inserir o código
      const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
      const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
      await resolver.resolveSignIn(multiFactorAssertion);
    } else {
      throw error;
    }
  }
}
```

## Proteção de Dados

### Regras de Segurança do Firebase

Configure regras de segurança adequadas no Firebase para proteger seus dados:

```
// Firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /signatures/{signatureId} {
      allow read, write: if request.auth != null && 
                          resource.data.userId == request.auth.uid;
    }
  }
}
```

### Sanitização de Entrada

Sempre valide e sanitize dados de entrada do usuário:

1. Use validação de formulários com React Hook Form (já implementado)
2. Adicione validação adicional para campos críticos:

```typescript
// Exemplo de validação adicional
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
if (!emailRegex.test(emailUser + emailDomain)) {
  throw new Error('E-mail inválido');
}

// Sanitização de HTML (se necessário)
import DOMPurify from 'dompurify';
const sanitizedInput = DOMPurify.sanitize(userInput);
```

### Proteção contra XSS

1. O React já fornece proteção contra XSS por padrão, escapando automaticamente conteúdo renderizado
2. Para conteúdo dinâmico, use bibliotecas como DOMPurify:

```bash
npm install dompurify @types/dompurify
```

```typescript
import DOMPurify from 'dompurify';

// Ao renderizar HTML dinâmico
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }} />
```

## Implantação Segura

### CI/CD Seguro

Configure um pipeline de CI/CD seguro:

1. Execute verificações de segurança automatizadas:

```yaml
# Exemplo para GitHub Actions
name: Security Checks

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run security audit
        run: npm audit --production
      - name: Run ESLint
        run: npm run lint
```

2. Implemente revisão de código obrigatória para todas as alterações

### Verificação de Dependências

Mantenha suas dependências atualizadas e seguras:

1. Execute verificações regulares:

```bash
npm audit
```

2. Configure ferramentas automatizadas como Dependabot ou Snyk
3. Atualize dependências regularmente:

```bash
npm update
```

## Monitoramento e Logs

### Logging

Implemente logging adequado para monitorar atividades e detectar problemas:

1. Configure o Firebase Analytics e Monitoring
2. Adicione logs para eventos importantes:

```typescript
// src/contexts/AuthContext.tsx
async function login(email, password) {
  try {
    console.info(`Tentativa de login: ${email}`);
    await signInWithEmailAndPassword(auth, email, password);
    console.info(`Login bem-sucedido: ${email}`);
    // Registrar no Firebase Analytics
    analytics.logEvent('login', { method: 'email' });
  } catch (error) {
    console.error(`Falha no login: ${email}`, error);
    // Registrar no Firebase Analytics
    analytics.logEvent('login_error', { 
      method: 'email', 
      error_code: error.code 
    });
    throw error;
  }
}
```

### Monitoramento de Erros

Configure monitoramento de erros para detectar e corrigir problemas rapidamente:

1. Integre com serviços como Sentry:

```bash
npm install @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

// Envolver o App com Sentry
<Sentry.ErrorBoundary fallback={<ErrorPage />}>
  <App />
</Sentry.ErrorBoundary>
```

## Atualizações e Manutenção

### Plano de Manutenção

Estabeleça um plano regular de manutenção:

1. Atualize dependências mensalmente
2. Revise e atualize regras de segurança trimestralmente
3. Realize auditorias de segurança semestrais
4. Mantenha-se informado sobre vulnerabilidades em bibliotecas utilizadas

### Backup e Recuperação

Implemente estratégias de backup e recuperação:

1. Configure backups automáticos do Firestore
2. Documente procedimentos de recuperação
3. Teste regularmente os procedimentos de recuperação

### Documentação de Segurança

Mantenha documentação atualizada sobre práticas de segurança:

1. Procedimentos para reportar vulnerabilidades
2. Políticas de resposta a incidentes
3. Contatos para questões de segurança

## Conclusão

A segurança é um processo contínuo, não um estado final. Mantenha-se atualizado sobre as melhores práticas de segurança e adapte suas medidas conforme necessário. Realize auditorias regulares e esteja preparado para responder rapidamente a novos riscos e vulnerabilidades.

Para mais informações sobre segurança em aplicações React e Firebase, consulte:

- [Documentação de Segurança do Firebase](https://firebase.google.com/docs/security)
- [Guia de Segurança do React](https://reactjs.org/docs/security.html)
- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)

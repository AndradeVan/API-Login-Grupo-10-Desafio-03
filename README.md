# API de Autenticação

API REST de autenticação desenvolvida em JavaScript com Express para estudos de testes de software.

## 🚀 Funcionalidades

- **Login de usuário** com email e senha
- **Registro de novos usuários**
- **Troca de senha** (esqueci minha senha)
- **Bloqueio automático** após 3 tentativas de login inválidas
- **Documentação Swagger** completa
- **Autenticação JWT**

## 📋 Regras de Negócio Implementadas

- **RN01**: API permite criar usuário e senha
- **RN02**: Login com email e senha válidos retorna token JWT
- **RN03**: Login com credenciais inválidas retorna mensagem de erro específica
- **RN04**: Usuário é bloqueado após 3 tentativas de login inválidas
- **RN05**: Serviço de troca de senha disponível

## 🛠️ Tecnologias

- **Node.js** e **Express**
- **bcryptjs** para hash de senhas
- **jsonwebtoken** para autenticação JWT
- **Swagger** para documentação da API
- **CORS** para requisições cross-origin

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd api-autenticacao
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor:
```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

O servidor estará disponível em `http://localhost:3000`

## 📚 Documentação

A documentação Swagger está disponível em:
```
http://localhost:3000/api-docs
```

## 🔑 Usuários de Teste

A API vem com 3 usuários pré-cadastrados para testes:

| Email | Senha |
|-------|-------|
| admin@teste.com | password |
| usuario@teste.com | password |
| teste@teste.com | password |

## 🚀 Endpoints

### POST /api/auth/login
Realizar login do usuário.

**Body:**
```json
{
  "email": "admin@teste.com",
  "password": "password"
}
```

**Resposta de sucesso:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@teste.com"
  }
}
```

### POST /api/auth/register
Criar novo usuário.

**Body:**
```json
{
  "email": "novo@teste.com",
  "password": "minhasenha123"
}
```

### POST /api/auth/forgot-password
Trocar senha do usuário.

**Body:**
```json
{
  "email": "admin@teste.com",
  "newPassword": "novasenha123"
}
```

### GET /api/auth/users
Listar todos os usuários (apenas para debug).

## 🔒 Segurança

- Senhas são hasheadas com bcrypt
- Tokens JWT com expiração de 24 horas
- Bloqueio automático após 3 tentativas de login inválidas
- Validação de formato de email
- Senha mínima de 6 caracteres

## 🧪 Testes

Esta API foi desenvolvida especificamente para estudos de testes de software. Você pode usar os endpoints para:

- Testes de integração
- Testes de API
- Testes de segurança
- Testes de performance
- Testes de cenários de erro

## 📝 Exemplos de Uso

### Teste de Login Bem-sucedido
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@teste.com", "password": "password"}'
```

### Teste de Login com Credenciais Inválidas
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@teste.com", "password": "senhaerrada"}'
```

### Teste de Registro de Usuário
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "teste@exemplo.com", "password": "minhasenha123"}'
```

## 🚨 Códigos de Status HTTP

- **200**: Sucesso
- **201**: Criado com sucesso
- **400**: Dados inválidos
- **401**: Não autorizado (credenciais inválidas)
- **404**: Não encontrado
- **409**: Conflito (email já existe)
- **423**: Usuário bloqueado
- **500**: Erro interno do servidor

## 📄 Licença

MIT
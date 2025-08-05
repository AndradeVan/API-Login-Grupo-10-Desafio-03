# Desafio 04 - Aplicação Web

## Descrição

Esta é uma aplicação web que consome a API construída no Desafio 03. O projeto foi desenvolvido usando as tecnologias HTML, CSS, JavaScript, Express.js e MaterializeCSS.

## Funcionalidades

### Sistema de Autenticação
- **Login**: Sistema de autenticação com validação de campos
- **Troca de Senha**: Página dedicada para recuperação de senha
- **Validação**: Validação de email e senha em tempo real
- **Feedback Visual**: Toasts informativos para todas as ações

### Home Page
- **Menu de Logout**: Botão de logout na navbar
- **Título Personalizado**: "Bem vindo ao Desafio 04"
- **Descrição do Projeto**: Informações detalhadas sobre o desafio
- **Seção da Equipe**: Cards com informações dos integrantes
- **Design Responsivo**: Interface adaptável para diferentes dispositivos

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização com gradientes e animações
- **JavaScript**: Funcionalidades interativas
- **Express.js**: Servidor backend
- **MaterializeCSS**: Framework de UI/UX

## Estrutura do Projeto

```
web/
├── index.html              # Página de login
├── forgot-password.html    # Página de troca de senha
├── home.html               # Home page principal
├── styles.css              # Estilos CSS
├── script.js               # JavaScript da página de login
├── forgot-password.js      # JavaScript da página de troca de senha
├── home.js                 # JavaScript da home page
├── server.js               # Servidor Express
└── README.md               # Documentação
```

## Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o servidor**:
   ```bash
   npm start
   ```

3. **Acessar a aplicação**:
   - Abra o navegador e acesse `http://localhost:3000`
   - Para acessar diretamente a home page: `http://localhost:3000/home.html`
   - Para acessar a página de troca de senha: `http://localhost:3000/forgot-password.html`

## Páginas da Aplicação

### Página de Login (`index.html`)
- Formulário de autenticação
- Link para recuperação de senha
- Validação de campos em tempo real
- Redirecionamento para home page após login

### Página de Troca de Senha (`forgot-password.html`)
- Formulário dedicado para recuperação de senha
- Validação de confirmação de senha
- **Validação de email existente na base de dados**
- Link para voltar ao login
- Redirecionamento automático após sucesso

### Home Page (`home.html`)
- Navbar com menu de logout
- Seção de boas-vindas
- Descrição do projeto
- Seção da equipe com cards dos integrantes

## Funcionalidades da Home Page

### Navbar
- Logo do projeto com ícone
- Botão de logout funcional
- Design responsivo

### Seção de Boas-vindas
- Título principal com ícone
- Subtítulo descritivo
- Design com gradiente e sombras

### Descrição do Desafio
- Informações detalhadas sobre o projeto
- Lista das tecnologias utilizadas
- Layout organizado em cards

### Seção da Equipe
- Cards individuais para cada integrante
- Fotos dos membros (placeholders)
- Informações de contato (email, LinkedIn, GitHub)
- Efeitos hover e animações

## Autenticação

O sistema de autenticação inclui:

- **Validação de Campos**: Verificação de campos obrigatórios
- **Feedback Visual**: Toasts informativos para todas as ações
- **Persistência**: Token salvo no localStorage
- **Redirecionamento**: Navegação automática após login
- **Recuperação de Senha**: Página dedicada com validações
- **Validação de Email**: Verificação se o email existe na base de dados

## Validações Implementadas

### Página de Login
- Campos obrigatórios
- Formato de email válido
- Credenciais válidas

### Página de Recuperação de Senha
- **Campos obrigatórios**
- **Formato de email válido**
- **Email deve existir na base de dados**
- **Senha mínima de 6 caracteres**
- **Confirmação de senha deve coincidir**
- **Feedback visual em tempo real**

### Mensagens de Erro Específicas
- "Por favor, preencha todos os campos"
- "Por favor, insira um email válido"
- "**Usuário ou senha incorreta, por favor tente novamente**"
- "A nova senha deve ter pelo menos 6 caracteres"
- "As senhas não coincidem"

## Estilos e Design

### Características Visuais
- Gradientes modernos
- Cards com bordas arredondadas
- Sombras e efeitos de profundidade
- Animações suaves
- Cores consistentes com MaterializeCSS

### Responsividade
- Design adaptável para mobile
- Grid system do MaterializeCSS
- Breakpoints otimizados

## Melhorias Implementadas

1. **Home Page Completa**: Nova página com todas as informações solicitadas
2. **Menu de Logout**: Funcionalidade de logout na navbar
3. **Seção da Equipe**: Cards com informações dos integrantes
4. **Página de Troca de Senha**: Página dedicada para recuperação de senha
5. **Design Aprimorado**: Melhorias visuais e de UX
6. **Navegação**: Sistema de navegação entre páginas
7. **Autenticação**: Sistema de autenticação com persistência
8. **Validações**: Validações em tempo real para confirmação de senha
9. **Validação de Email**: Verificação se o email existe na base de dados
10. **Mensagens de Erro**: Mensagens específicas para cada tipo de erro

## Próximos Passos

- [ ] Integração com API real do Desafio 03
- [ ] Implementação de testes com Cypress
- [ ] Adicionar informações reais dos integrantes
- [ ] Implementar funcionalidades adicionais
- [ ] Otimizações de performance

## Equipe 10

Este projeto foi desenvolvido pela Equipe 10 como parte do Desafio 04.

---

**Desenvolvido com ❤️ usando MaterializeCSS** 
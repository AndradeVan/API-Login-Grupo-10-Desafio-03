// Configuração da API
const API_BASE_URL = 'http://localhost:3000/api/auth';

// Classe para gerenciar toasts
class ToastManager {
    static show(message, type = 'info', duration = 4000) {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div style="padding: 15px; display: flex; align-items: center;">
                <i class="material-icons" style="margin-right: 10px;">
                    ${this.getIcon(type)}
                </i>
                <span>${message}</span>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Animar entrada
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após duração
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    }
    
    static getIcon(type) {
        const icons = {
            success: 'check_circle',
            error: 'error',
            warning: 'warning',
            info: 'info'
        };
        return icons[type] || 'info';
    }
}

// Classe para gerenciar requisições à API
class ApiService {
    static async makeRequest(url, options = {}) {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro na requisição');
            }
            
            return data;
        } catch (error) {
            throw error;
        }
    }
    
    static async login(email, password) {
        return this.makeRequest(`${API_BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }
}

// Classe para gerenciar formulários
class FormManager {
    constructor() {
        this.initializeForms();
        this.initializeMaterialize();
    }
    
    initializeMaterialize() {
        // Inicializar componentes do MaterializeCSS
        M.AutoInit();
    }
    
    initializeForms() {
        // Formulário de login
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', this.handleLogin.bind(this));
    }
    
    async handleLogin(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const submitButton = event.target.querySelector('button[type="submit"]');
        
        // Validação dos campos
        if (!email || !password) {
            ToastManager.show('Por favor, preencha todos os campos', 'error');
            return;
        }
        
        // Adicionar loading ao botão
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        try {
            const response = await ApiService.login(email, password);
            
            // Login bem-sucedido
            ToastManager.show('Login realizado com sucesso!', 'success');
            
            // Salvar token no localStorage (simulado)
            localStorage.setItem('authToken', 'token-simulado-' + Date.now());
            localStorage.setItem('userEmail', email);
            
            // Limpar formulário
            loginForm.reset();
            
            // Redirecionar para a home page
            setTimeout(() => {
                ToastManager.show('Redirecionando para o sistema...', 'info');
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
            }, 1000);
            
        } catch (error) {
            // Tratar diferentes tipos de erro
            if (error.message.includes('bloqueado')) {
                ToastManager.show('Usuário bloqueado devido a múltiplas tentativas de login inválidas', 'error');
            } else if (error.message.includes('inválidos')) {
                ToastManager.show('Usuário ou senha inválidos, tente novamente', 'error');
            } else {
                ToastManager.show('Erro ao realizar login: ' + error.message, 'error');
            }
        } finally {
            // Remover loading do botão
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    }
}

// Classe para gerenciar validações
class ValidationManager {
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    static validatePassword(password) {
        return password.length >= 6;
    }
}

// Inicializar aplicação quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar gerenciador de formulários
    new FormManager();
    
    // Adicionar estilos CSS para toasts
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            background: white;
            color: #333;
            padding: 0;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            margin-bottom: 10px;
            min-width: 300px;
            max-width: 400px;
        }
        
        .toast.error {
            background-color: #f44336;
            color: white;
        }
        
        .toast.success {
            background-color: #4caf50;
            color: white;
        }
        
        .toast.info {
            background-color: #2196f3;
            color: white;
        }
        
        .toast.warning {
            background-color: #ff9800;
            color: white;
        }
    `;
    document.head.appendChild(style);
    
    // Mostrar mensagem de boas-vindas
    setTimeout(() => {
        ToastManager.show('Bem-vindo ao Sistema de Autenticação!', 'info');
    }, 500);
});

// Função para testar a API (apenas para desenvolvimento)
async function testApiConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (response.ok) {
            console.log('✅ API conectada com sucesso');
        } else {
            console.log('❌ Erro ao conectar com a API');
        }
    } catch (error) {
        console.log('❌ Erro ao conectar com a API:', error.message);
    }
}

// Testar conexão com a API quando a página carregar
window.addEventListener('load', testApiConnection); 
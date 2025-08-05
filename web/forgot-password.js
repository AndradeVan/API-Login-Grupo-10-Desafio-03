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
    
    static async forgotPassword(email, newPassword) {
        return this.makeRequest(`${API_BASE_URL}/forgot-password`, {
            method: 'POST',
            body: JSON.stringify({ email, newPassword })
        });
    }
    
    // Método para verificar se o email existe na base de dados
    static async checkEmailExists(email) {
        try {
            const response = await fetch(`${API_BASE_URL}/users`);
            if (response.ok) {
                const users = await response.json();
                return users.some(user => user.email === email);
            }
            return false;
        } catch (error) {
            console.error('Erro ao verificar email:', error);
            return false;
        }
    }
}

// Classe para gerenciar formulários
class ForgotPasswordFormManager {
    constructor() {
        this.initializeForm();
        this.initializeMaterialize();
    }
    
    initializeMaterialize() {
        // Inicializar componentes do MaterializeCSS
        M.AutoInit();
    }
    
    initializeForm() {
        // Formulário de troca de senha
        const forgotPasswordForm = document.getElementById('forgotPasswordForm');
        forgotPasswordForm.addEventListener('submit', this.handleForgotPassword.bind(this));
        
        // Adicionar validação em tempo real para confirmação de senha
        const newPasswordInput = document.getElementById('newPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        
        confirmPasswordInput.addEventListener('input', () => {
            this.validatePasswordConfirmation();
        });
        
        newPasswordInput.addEventListener('input', () => {
            this.validatePasswordConfirmation();
        });
        
        // Adicionar validação em tempo real para email
        const emailInput = document.getElementById('forgotEmail');
        emailInput.addEventListener('blur', () => {
            this.validateEmailFormat(emailInput.value);
        });
    }
    
    validatePasswordConfirmation() {
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const confirmPasswordInput = document.getElementById('confirmPassword');
        
        if (confirmPassword && newPassword !== confirmPassword) {
            confirmPasswordInput.classList.add('invalid');
            confirmPasswordInput.classList.remove('valid');
        } else if (confirmPassword && newPassword === confirmPassword) {
            confirmPasswordInput.classList.add('valid');
            confirmPasswordInput.classList.remove('invalid');
        } else {
            confirmPasswordInput.classList.remove('valid', 'invalid');
        }
    }
    
    validateEmailFormat(email) {
        const emailInput = document.getElementById('forgotEmail');
        if (email && !this.isValidEmailFormat(email)) {
            emailInput.classList.add('invalid');
            emailInput.classList.remove('valid');
        } else if (email && this.isValidEmailFormat(email)) {
            emailInput.classList.add('valid');
            emailInput.classList.remove('invalid');
        } else {
            emailInput.classList.remove('valid', 'invalid');
        }
    }
    
    isValidEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    async handleForgotPassword(event) {
        event.preventDefault();
        
        const email = document.getElementById('forgotEmail').value.trim();
        const newPassword = document.getElementById('newPassword').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
        const submitButton = event.target.querySelector('button[type="submit"]');
        
        // Validação dos campos
        if (!email || !newPassword || !confirmPassword) {
            ToastManager.show('Por favor, preencha todos os campos', 'error');
            return;
        }
        
        // Validação do formato de email
        if (!this.isValidEmailFormat(email)) {
            ToastManager.show('Por favor, insira um email válido', 'error');
            return;
        }
        
        // Validação da nova senha
        if (newPassword.length < 6) {
            ToastManager.show('A nova senha deve ter pelo menos 6 caracteres', 'error');
            return;
        }
        
        // Validação da confirmação de senha
        if (newPassword !== confirmPassword) {
            ToastManager.show('As senhas não coincidem', 'error');
            return;
        }
        
        // Adicionar loading ao botão
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        try {
            // Primeiro, verificar se o email existe na base de dados
            const emailExists = await ApiService.checkEmailExists(email);
            
            if (!emailExists) {
                ToastManager.show('Usuário ou senha incorreta, por favor tente novamente', 'error');
                return;
            }
            
            // Se o email existe, prosseguir com a troca de senha
            const response = await ApiService.forgotPassword(email, newPassword);
            
            // Troca de senha bem-sucedida
            ToastManager.show('Senha alterada com sucesso!', 'success');
            
            // Limpar formulário
            event.target.reset();
            
            // Redirecionar para login após 2 segundos
            setTimeout(() => {
                ToastManager.show('Redirecionando para o login...', 'info');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }, 2000);
            
        } catch (error) {
            // Tratar diferentes tipos de erro
            if (error.message.includes('não encontrado')) {
                ToastManager.show('Usuário ou senha incorreta, por favor tente novamente', 'error');
            } else if (error.message.includes('obrigatórios')) {
                ToastManager.show('Email e nova senha são obrigatórios', 'error');
            } else {
                ToastManager.show('Erro ao trocar senha: ' + error.message, 'error');
            }
        } finally {
            // Remover loading do botão
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Inicializar aplicação quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar gerenciador de formulários
    new ForgotPasswordFormManager();
    
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
        ToastManager.show('Página de recuperação de senha', 'info');
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
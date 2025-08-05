// Inicialização do MaterializeCSS
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes do MaterializeCSS
    M.AutoInit();
    
    // Configurar o botão de logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});

// Função para fazer logout
function logout() {
    // Mostrar toast de confirmação
    M.toast({
        html: 'Fazendo logout...',
        classes: 'info',
        displayLength: 2000
    });
    
    // Simular logout (você pode adicionar lógica real aqui)
    setTimeout(() => {
        // Redirecionar para a página de login
        window.location.href = 'index.html';
    }, 2000);
}

// Função para mostrar toast
function showToast(message, type = 'info') {
    M.toast({
        html: message,
        classes: type,
        displayLength: 4000
    });
}

// Função para verificar se o usuário está logado
function checkAuth() {
    // Aqui você pode adicionar lógica para verificar se o usuário está autenticado
    // Por exemplo, verificar se existe um token no localStorage
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        // Se não há token, redirecionar para login
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

// Verificar autenticação quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
});

// Adicionar animações aos cards
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar efeito de hover nos cards dos integrantes
    const integranteCards = document.querySelectorAll('.card-panel');
    
    integranteCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        });
    });
});

// Função para atualizar informações dos integrantes
function updateIntegrantes() {
    // Aqui você pode adicionar lógica para carregar informações reais dos integrantes
    // Por exemplo, fazer uma requisição para uma API ou carregar de um arquivo JSON
    
    const integrantes = [
        {
            nome: 'Nome do Integrante 1',
            email: 'email1@exemplo.com',
            linkedin: '#',
            github: '#',
            foto: 'https://via.placeholder.com/150x150/2196F3/ffffff?text=Integrante+1'
        },
        {
            nome: 'Nome do Integrante 2',
            email: 'email2@exemplo.com',
            linkedin: '#',
            github: '#',
            foto: 'https://via.placeholder.com/150x150/4CAF50/ffffff?text=Integrante+2'
        },
        {
            nome: 'Nome do Integrante 3',
            email: 'email3@exemplo.com',
            linkedin: '#',
            github: '#',
            foto: 'https://via.placeholder.com/150x150/FF9800/ffffff?text=Integrante+3'
        },
        {
            nome: 'Nome do Integrante 4',
            email: 'email4@exemplo.com',
            linkedin: '#',
            github: '#',
            foto: 'https://via.placeholder.com/150x150/9C27B0/ffffff?text=Integrante+4'
        },
        {
            nome: 'Nome do Integrante 5',
            email: 'email5@exemplo.com',
            linkedin: '#',
            github: '#',
            foto: 'https://via.placeholder.com/150x150/F44336/ffffff?text=Integrante+5'
        }
    ];
    
    // Atualizar os elementos na página
    integrantes.forEach((integrante, index) => {
        const integranteElement = document.querySelector(`[data-integrante="${index + 1}"]`);
        if (integranteElement) {
            const nomeElement = integranteElement.querySelector('h6');
            const emailElement = integranteElement.querySelector('p');
            const fotoElement = integranteElement.querySelector('img');
            const linkedinBtn = integranteElement.querySelector('a[href="#"]:first-of-type');
            const githubBtn = integranteElement.querySelector('a[href="#"]:last-of-type');
            
            if (nomeElement) nomeElement.textContent = integrante.nome;
            if (emailElement) emailElement.textContent = integrante.email;
            if (fotoElement) fotoElement.src = integrante.foto;
            if (linkedinBtn) linkedinBtn.href = integrante.linkedin;
            if (githubBtn) githubBtn.href = integrante.github;
        }
    });
}

// Chamar a função para atualizar integrantes quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    updateIntegrantes();
}); 
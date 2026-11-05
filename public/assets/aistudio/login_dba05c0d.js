document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Evita que a página recarregue ao clicar no botão
    event.preventDefault();

    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMessage');

    // 👉 DEFINA O USUÁRIO E A SENHA AQUI:
    if (user === 'obras' && pass === 'leste') {
        
        // 1. Cria a "Sessão" no navegador (o crachá de acesso)
        sessionStorage.setItem('painelEnelLogado', 'true');
        
        // 2. Esconde o erro (se estiver visível)
        errorMsg.style.display = 'none';
        
        // 3. Redireciona o usuário para a página principal do painel!
        // IMPORTANTE: Confirme se o seu painel principal se chama 'painel.html'
        window.location.href = 'painel.html'; 
        
    } else {
        // Mostra a mensagem de erro
        errorMsg.textContent = 'Usuário ou senha incorretos.';
        errorMsg.style.display = 'block';
    }
});
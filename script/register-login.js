function cadastrarUsuario(nome, email, senha) {
    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuariosCadastrados.find(usuario => usuario.email === email);
    if (usuarioExistente) {
        return false; // O email já está em uso
    }

    const novoUsuario = { nome, email, senha };

    usuariosCadastrados.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados));
    
    return true; // Cadastro bem-sucedido
}

function fazerLogin(email, senha) {
    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuariosCadastrados.find(u => u.email == email && u.senha == senha);
    return usuario || null; // Retorna o usuário ou null se não encontrado
}

document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.getElementById('cadastro-form');
    const loginForm = document.getElementById('login-form');

    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const confirmaSenha = document.getElementById('confirma_senha').value;

        if (senha !== confirmaSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        const cadastroBemSucedido = cadastrarUsuario(nome, email, senha);
        if (cadastroBemSucedido) {
            alert('Cadastro bem-sucedido. Você pode fazer login agora.');
            cadastroForm.reset();
        } else {
            alert('O email já está em uso');
        }
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email-login').value;
        const senha = document.getElementById('senha-login').value;

        const usuarioLogado = fazerLogin(email, senha);
        if (usuarioLogado) {
            alert('Login bem-sucedido! Seja bem-vindo(a) ' + usuarioLogado.nome);
            loginForm.reset();
        } else {
            alert('Credenciais inválidas');
        }
    });
});
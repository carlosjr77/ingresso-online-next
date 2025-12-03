import { useState } from 'react';
// As importações sensíveis (Firebase e next/router) foram movidas para dentro do componente.


// Componente de Login
export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // --- BLINDAGEM CONTRA ERROS DE BUILD ---
    let router = null;
    let signInAdmin = null;

    try {
        // Tenta importar o useRouter apenas no runtime do cliente
        const nextRouter = require('next/router');
        router = nextRouter.useRouter();
    } catch(e) {
        // console.warn("useRouter não disponível durante a compilação.");
    }

    try {
        // Tenta importar a função do FirebaseUtils.js
        const firebaseUtils = require('../utils/firebaseUtils');
        signInAdmin = firebaseUtils.signInAdmin;
    } catch(e) {
        console.error("FirebaseUtils falhou na importação. Certifique-se de que o arquivo utils/firebaseUtils.js existe.");
    }
    // --- FIM DA BLINDAGEM ---


    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!signInAdmin) {
            setError('Erro de configuração: o serviço de autenticação não foi carregado.');
            setLoading(false);
            return;
        }

        // Verifica credenciais mínimas antes de chamar o Firebase
        if (!email || !password) {
            setError('Por favor, preencha E-mail e Senha.');
            setLoading(false);
            return;
        }

        try {
            await signInAdmin(email, password);
            // Login bem-sucedido: Redireciona para o Painel Admin
            if (router) {
                router.push('/admin');
            } else {
                // Fallback de redirecionamento (para ambientes onde o useRouter falha)
                window.location.href = '/admin'; 
            }
        } catch (err) {
            console.error("Erro no Login:", err);
            // Mensagem de erro amigável
            setError('Falha no login. Verifique as credenciais ou contacte o suporte.');
        } finally {
            setLoading(false);
        }
    };

    // --- CSS INLINE ---
    const loginStyles = `
        .loginContainer {
            min-height: 90vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #121212;
            color: #e0e0e0;
        }
        .loginCard {
            background-color: #1f1f1f;
            border: 1px solid #333;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
            max-width: 400px;
            width: 90%;
            text-align: center;
        }
        .loginTitle {
            font-size: 2rem;
            font-weight: 700;
            color: #00bcd4;
            margin-bottom: 20px;
        }
        .formGroup {
            margin-bottom: 20px;
            text-align: left;
        }
        .formLabel {
            display: block;
            margin-bottom: 5px;
            color: #aaa;
            font-size: 0.9rem;
        }
        .formInput {
            width: 100%;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #444;
            background: #1a1a1a;
            color: #fff;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.3);
        }
        .loginButton {
            width: 100%;
            padding: 12px;
            font-size: 1.1rem;
            font-weight: 700;
            color: #fff;
            background: linear-gradient(45deg, #00bcd4, #5c6bc0);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s, opacity 0.2s;
            margin-top: 10px;
        }
        .loginButton:hover {
            opacity: 0.9;
            transform: translateY(-2px);
        }
        .loginButton:disabled {
            background: #444;
            cursor: not-allowed;
            opacity: 0.6;
            transform: none;
        }
        .errorMessage {
            color: #ff5252;
            margin-top: 15px;
            font-size: 0.9rem;
        }
    `;

    return (
        <div className="loginContainer">
            <style dangerouslySetInnerHTML={{ __html: loginStyles }} />
            <div className="loginCard">
                <h1 className="loginTitle">Acesso Admin</h1>
                <p style={{color: '#aaa', marginBottom: '30px', fontSize: '0.9rem'}}>Faça login para gerenciar seus leads e vendas.</p>
                <form onSubmit={handleLogin}>
                    <div className="formGroup">
                        <label className="formLabel">E-mail</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="formInput"
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label className="formLabel">Senha</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="formInput"
                            required
                        />
                    </div>
                    {error && <p className="errorMessage">{error}</p>}
                    <button 
                        type="submit" 
                        className="loginButton" 
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar no Painel'}
                    </button>
                </form>
            </div>
        </div>
    );
}
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export default function Navbar() {
    const [userEmail, setUserEmail] = useState(null);
    let auth = null;
    let authenticateUser = () => {};
    let signOutUser = () => {};
    
    // --- BLINDAGEM CONTRA ERROS DE BUILD (Runtime Import) ---
    try {
        // Tenta importar as funções do utilitário APENAS no runtime
        const firebaseUtils = require('../utils/firebaseUtils');
        auth = firebaseUtils.getAuthService();
        authenticateUser = firebaseUtils.authenticateUser;
        signOutUser = firebaseUtils.signOutUser;
    } catch(e) {
        // Falha no build, mas não quebra o código
    }
    // --- FIM DA BLINDAGEM ---


    useEffect(() => {
        if (!auth) {
            return;
        }

        // Listener para mudanças de estado de autenticação
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.email) {
                // Usuário autenticado (usamos email para Admin)
                setUserEmail(user.email);
            } else {
                // Usuário deslogado (ou anônimo)
                setUserEmail(null);
            }
        });

        // Tenta autenticar anonimamente ao carregar (se não estiver logado)
        authenticateUser();

        return () => unsubscribe();
    }, [auth]);
    
    // Função de Logout
    const handleLogout = async () => {
        try {
            await signOutUser();
            window.location.href = '/'; // Redireciona para a Home após logout
        } catch(error) {
            console.error("Logout falhou:", error);
        }
    };


    // --- CSS INLINE ---
    const navStyles = `
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background-color: #0d0d0d; /* Fundo escuro */
            color: #fff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
            border-bottom: 1px solid #1a1a1a;
        }
        .logo {
            font-size: 1.5rem;
            font-weight: 800;
            color: #00bcd4; /* Cor de destaque */
            text-decoration: none;
        }
        .navLinks {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        .navItem {
            color: #fff;
            text-decoration: none;
            padding: 0.5rem;
            border-radius: 4px;
            transition: background-color 0.2s;
        }
        .navItem:hover {
            background-color: #1a1a1a;
        }
        .authSection {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .userEmail {
            font-size: 0.9rem;
            color: #aaa;
        }
        .authButton {
            padding: 8px 15px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: opacity 0.2s;
        }
        .loginButton {
            background-color: #5c6bc0; /* Azul suave */
            color: #fff;
        }
        .loginButton:hover {
            opacity: 0.8;
        }
        .logoutButton {
            background-color: #ff5252; /* Vermelho para deslogar */
            color: #fff;
        }
        .logoutButton:hover {
            opacity: 0.8;
        }
        /* Mobile */
        @media (max-width: 600px) {
            .navbar {
                padding: 1rem;
            }
            .navLinks {
                display: none; /* Simplifica a navegação em mobile */
            }
        }
    `;

    return (
        <nav className="navbar">
            <style dangerouslySetInnerHTML={{ __html: navStyles }} />
            
            <a href="/" className="logo">Premier Pass</a>
            
            <div className="navLinks">
                <a href="/" className="navItem">Eventos</a>
                
                {/* Se for Admin, mostra link para o painel */}
                {userEmail && (
                    <a href="/admin" className="navItem">Painel Admin</a>
                )}
            </div>

            <div className="authSection">
                {userEmail ? (
                    <>
                        <span className="userEmail">{userEmail}</span>
                        <button onClick={handleLogout} className="authButton logoutButton">
                            Sair
                        </button>
                    </>
                ) : (
                    <a href="/login" className="authButton loginButton">
                        Login Admin
                    </a>
                )}
            </div>
        </nav>
    );
}
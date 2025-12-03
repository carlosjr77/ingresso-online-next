// components/SidebarLogin.jsx
import React from 'react';

const SidebarLogin = () => {
  return (
    <>
      <style jsx>{`
        .sidebar-login {
          width: 280px;
          padding: 20px;
          background: #f4f6f8;
          border-radius: 5px;
          height: fit-content;
          position: sticky;
          top: 20px;
        }
        .sidebar-login p {
          font-size: 0.9rem;
          margin-bottom: 15px;
        }
        .btn-google-login {
          background-color: #fff;
          border: 1px solid #ddd;
          width: 100%;
          padding: 10px;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 20px;
          font-size: 1rem;
        }
        .user-profile-simulated {
          border-top: 1px solid #ddd;
          padding-top: 15px;
        }
        .link-sair {
          color: #3b5998;
          font-size: 0.9rem;
          margin-top: 10px;
          display: block;
        }
      `}</style>
      <aside className="sidebar-login">
        <p>Faça login ou crie sua conta para uma experiência completa.</p>
        <button className="btn-google-login">G Faça login com o Google</button>
        <div className="user-profile-simulated">
          <p><strong>Carlos Junior</strong></p>
          <small>carlosjunior12@gmail.com</small>
        </div>
        <a href="#" className="link-sair">Sair da conta</a>
      </aside>
    </>
  );
};

export default SidebarLogin;
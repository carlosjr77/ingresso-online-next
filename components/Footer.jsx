// components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <>
      <style jsx>{`
        footer {
          background-color: #fff;
          color: #777;
          text-align: center;
          padding: 1.5rem 0;
          margin-top: 4rem;
          font-size: 0.8rem;
          border-top: 1px solid #ddd;
        }
      `}</style>
      <footer>
        <p>Premier Pass Acesso. Termos & Políticas | Ajuda</p>
      </footer>
    </>
  );
};

export default Footer;
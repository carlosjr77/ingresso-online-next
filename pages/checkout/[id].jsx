import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase'; // Conecta com o arquivo que você acabou de criar
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import styles from '../../styles/Detalhes.module.css'; // Reaproveita o estilo dos detalhes

// --- DADOS MOCKADOS (Para garantir que funcione sem API por enquanto) ---
const mockEventsData = [
    {
        "id": "show-banda-a",
        "name": "Show de Lançamento - Banda A",
        "date": "15/12/2025",
        "location": "Arena Principal",
        "price": 120.00
    },
    {
        "id": "congresso-tech-2026",
        "name": "Congresso de Tecnologia 2026",
        "date": "20/01/2026",
        "location": "Centro de Convenções",
        "price": 450.00
    },
    {
        "id": "festival-cinema",
        "name": "Festival de Cinema Independente",
        "date": "05/03/2026",
        "location": "Cine Arte",
        "price": 50.00
    },
    {
        "id": "expo-automovel",
        "name": "Expo Automóvel Luxo",
        "date": "10/04/2026",
        "location": "Pavilhão Metropolitano",
        "price": 280.00
    },
    {
        "id": "show-pericles-natanzinho",
        "name": "Péricles e Natanzinho Lima - Folk Valley",
        "date": "20/12/2025",
        "location": "Arena Folk Valley",
        "price": 180.00
    },
    {
        "id": "reveillon-sunset-gigoia",
        "name": "Réveillon Sunset Gigóia - RIO",
        "date": "31/12/2025",
        "location": "Ilha da Gigóia, Barra da Tijuca",
        "price": 600.00
    },
    {
        "id": "reveillon-celebrare-2026",
        "name": "Réveillon Celebrare 2026",
        "date": "31/12/2025",
        "location": "Clube Monte Líbano, Lagoa - RIO",
        "price": 750.00
    }
];

export default function CheckoutPage() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  // Estado do Formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    ticketQuantity: 1
  });

  // Busca o evento ao carregar a página
  useEffect(() => {
    if (!id) return;
    // Simulação de busca
    const found = mockEventsData.find(e => e.id === id);
    if (found) {
        setEvent(found);
    }
    setLoading(false);
  }, [id]);

  // --- LÓGICA DE PREÇO (Sua Margem de Lucro) ---
  const PREMIER_TAX = 0.05; // 5%
  const basePrice = event ? event.price : 0;
  const premierPrice = basePrice * (1 + PREMIER_TAX); // Preço + 5%
  const totalPrice = premierPrice * formData.ticketQuantity;

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // 1. SALVAR O PEDIDO NO FIREBASE
      // Isso cria um documento na coleção 'orders' com todos os dados
      await addDoc(collection(db, "orders"), {
        eventId: event.id,
        eventName: event.name,
        customer: {
            name: formData.name,
            email: formData.email,
            cpf: formData.cpf,
            phone: formData.phone
        },
        quantity: parseInt(formData.ticketQuantity),
        totalPaid: parseFloat(totalPrice.toFixed(2)),
        originalPrice: event.price,
        profitMargin: parseFloat((totalPrice - (event.price * formData.ticketQuantity)).toFixed(2)), // Quanto você lucrou
        status: "PENDING_FULFILLMENT", // Status inicial
        createdAt: serverTimestamp()
      });

      // 2. Feedback visual
      alert(`Sucesso! Pedido confirmado. Valor total: R$ ${totalPrice.toFixed(2)}. Verifique seu e-mail.`);
      
      // 3. Redirecionar para home
      router.push('/');

    } catch (error) {
      console.error("Erro no checkout:", error);
      alert("Houve um erro ao salvar o pedido. Tente novamente.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className={styles.loadingContainer}><div className={styles.spinner}></div></div>;
  if (!event) return <div className={styles.errorContainer}><h1>Evento não encontrado</h1></div>;

  return (
    <div className={styles.container}>
      <div className={styles.detailCard} style={{maxWidth: '600px', margin: '40px auto'}}>
        <h1 className={styles.title} style={{fontSize: '2rem'}}>Checkout Seguro</h1>
        <p className={styles.tagline}>Finalizando compra para: <strong>{event.name}</strong></p>

        {/* Resumo do Pedido */}
        <div style={{background: '#2a2a2a', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #444'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#ccc'}}>
            <span>Valor Unitário (Premier):</span>
            <span>R$ {premierPrice.toFixed(2)}</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#ccc'}}>
            <span>Quantidade:</span>
            <span>x {formData.ticketQuantity}</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #555', fontSize: '1.2rem', fontWeight: 'bold', color: '#4CAF50'}}>
            <span>Total a Pagar:</span>
            <span>R$ {totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleCheckout} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
          <div className="form-group">
            <label style={{display: 'block', marginBottom: '5px', color: '#aaa'}}>Nome Completo</label>
            <input 
              type="text" name="name" required 
              value={formData.name} onChange={handleInputChange}
              style={{width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #444', background: '#1a1a1a', color: '#fff'}}
            />
          </div>
          
          <div className="form-group">
            <label style={{display: 'block', marginBottom: '5px', color: '#aaa'}}>E-mail (Para envio do ingresso)</label>
            <input 
              type="email" name="email" required 
              value={formData.email} onChange={handleInputChange}
              style={{width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #444', background: '#1a1a1a', color: '#fff'}}
            />
          </div>

          <div className="form-group" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
             <div>
                <label style={{display: 'block', marginBottom: '5px', color: '#aaa'}}>CPF</label>
                <input 
                  type="text" name="cpf" required placeholder="000.000.000-00"
                  value={formData.cpf} onChange={handleInputChange}
                  style={{width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #444', background: '#1a1a1a', color: '#fff'}}
                />
             </div>
             <div>
                <label style={{display: 'block', marginBottom: '5px', color: '#aaa'}}>Telefone</label>
                <input 
                  type="text" name="phone" required placeholder="(XX) 99999-9999"
                  value={formData.phone} onChange={handleInputChange}
                  style={{width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #444', background: '#1a1a1a', color: '#fff'}}
                />
             </div>
          </div>

          <div className="form-group">
            <label style={{display: 'block', marginBottom: '5px', color: '#aaa'}}>Quantidade de Ingressos</label>
            <select 
              name="ticketQuantity"
              value={formData.ticketQuantity} onChange={handleInputChange}
              style={{width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #444', background: '#1a1a1a', color: '#fff'}}
            >
              {[1,2,3,4,5,6].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </div>

          <button 
            type="submit" 
            className={styles.buyButton}
            disabled={processing}
            style={{marginTop: '20px', width: '100%', backgroundColor: processing ? '#666' : ''}}
          >
            {processing ? 'Processando...' : 'Confirmar e Pagar'}
          </button>
        </form>
        
        <p style={{textAlign: 'center', marginTop: '15px', fontSize: '0.8rem', color: '#666'}}>
          🔒 Seus dados estão seguros. Processamento via Premier Pass.
        </p>
      </div>
    </div>
  );
}
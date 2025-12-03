import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Users, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X,
  Ticket
} from 'lucide-react';

// --- DADOS DE EXEMPLO (FALLBACK) ---
const mockEventsData = [
  {
    id: 1,
    name: "Festival de Verão 2024",
    start_date: "2024-12-15 14:00:00",
    tickets_sold: 450,
    revenue: 22500.00,
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    name: "Workshop de Marketing Digital",
    start_date: "2024-11-20 09:00:00",
    tickets_sold: 120,
    revenue: 18000.00,
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    name: "Conferência Tech 2024",
    start_date: "2024-12-05 08:30:00",
    tickets_sold: 800,
    revenue: 120000.00,
    image: "https://images.unsplash.com/photo-1505373877841-8d43f7d3473d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }
];

// --- SERVER SIDE PROPS (INTEGRAÇÃO SYMPLA - OPCIONAL) ---
// Nota: Em ambiente de Preview, esta função pode não ser executada automaticamente.
// O componente Home foi ajustado para funcionar mesmo sem estes dados.
export async function getServerSideProps() {
  const symplaApiKey = process.env.SYMPLA_API_KEY || "014cf4943f3a9b94c869b53618ac1ca69539e239a563630ce0844e309c280e1a";
  
  let eventsData = [];
  let fetchError = null;

  if (!symplaApiKey) {
      eventsData = mockEventsData;
  } else {
    try {
      const response = await fetch('https://api.sympla.com.br/public/v3/events', {
        headers: {
          's_token': symplaApiKey
        }
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      eventsData = data.data ? data.data : mockEventsData; 
      
      if (eventsData.length === 0) {
        eventsData = mockEventsData;
      }

    } catch (error) {
      console.error("Falha ao buscar eventos da Sympla:", error);
      fetchError = error.message;
      eventsData = mockEventsData;
    }
  }

  return {
    props: {
      initialEvents: eventsData,
      error: fetchError
    }
  };
}

// --- COMPONENTES DA UI ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">SymplaProfit</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#recursos" className="text-gray-600 hover:text-blue-600 transition-colors">Recursos</a>
            <a href="#eventos" className="text-gray-600 hover:text-blue-600 transition-colors">Meus Eventos</a>
            <a href="#calculadora" className="text-gray-600 hover:text-blue-600 transition-colors">Calculadora</a>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
              Começar Agora
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#recursos" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Recursos</a>
            <a href="#eventos" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Meus Eventos</a>
            <a href="#calculadora" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Calculadora</a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 -z-10" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Nova Integração API V3 Disponível
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Maximize o Lucro dos seus <span className="text-blue-600">Eventos</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Analise vendas em tempo real, calcule projeções financeiras e otimize seus preços com nossa dashboard inteligente integrada à Sympla.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
            Ver Dashboard
            <ArrowRight className="h-5 w-5" />
          </button>
          <button className="flex items-center justify-center gap-2 bg-white text-gray-700 border-2 border-gray-200 px-8 py-3.5 rounded-full font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all">
            Simular Lucros
          </button>
        </div>
      </div>
    </div>
  </div>
);

const StatsCard = ({ icon: Icon, label, value, trend, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      {trend && (
        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{label}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const EventCard = ({ event }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
    <div className="h-48 overflow-hidden relative">
      <img 
        src={event.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"} 
        alt={event.name} 
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-lg">
        Vendas Abertas
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
        <Calendar className="h-4 w-4" />
        {new Date(event.start_date).toLocaleDateString('pt-BR')}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">{event.name}</h3>
      
      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-50">
        <div>
          <p className="text-xs text-gray-500 mb-1">Ingressos</p>
          <div className="flex items-center gap-1.5 font-bold text-gray-900">
            <Ticket className="h-4 w-4 text-blue-500" />
            {event.tickets_sold}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Receita</p>
          <div className="flex items-center justify-end gap-1.5 font-bold text-green-600">
            <DollarSign className="h-4 w-4" />
            {event.revenue ? event.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProfitCalculator = () => {
  const [ticketPrice, setTicketPrice] = useState(150);
  const [expectedSales, setExpectedSales] = useState(500);
  const [costs, setCosts] = useState(20000);
  
  const revenue = ticketPrice * expectedSales;
  const symplaFee = revenue * 0.10; // Taxa estimada de 10%
  const netProfit = revenue - symplaFee - costs;

  return (
    <div id="calculadora" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Simule seu <span className="text-blue-600">Lucro Real</span>
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Não tente adivinhar. Use nossa calculadora inteligente para prever custos, taxas da plataforma e seu lucro líquido antes mesmo de lançar o evento.
            </p>
            
            <div className="space-y-6">
              {[
                "Cálculo automático de taxas Sympla",
                "Previsão de Break-even",
                "Análise de cenários otimista/pessimista"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-green-100 p-1 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preço do Ingresso (R$)</label>
                <input 
                  type="range" 
                  min="50" 
                  max="1000" 
                  value={ticketPrice} 
                  onChange={(e) => setTicketPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="mt-2 text-right font-bold text-blue-600">R$ {ticketPrice},00</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expectativa de Vendas</label>
                <input 
                  type="range" 
                  min="100" 
                  max="5000" 
                  value={expectedSales} 
                  onChange={(e) => setExpectedSales(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="mt-2 text-right font-bold text-blue-600">{expectedSales} ingressos</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custos Fixos (R$)</label>
                <input 
                  type="number"
                  value={costs}
                  onChange={(e) => setCosts(Number(e.target.value))}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Receita Bruta</span>
                <span>R$ {revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Taxas Estimadas (10%)</span>
                <span className="text-red-500">- R$ {symplaFee.toLocaleString()}</span>
              </div>
               <div className="flex justify-between text-sm text-gray-600">
                <span>Custos Operacionais</span>
                <span className="text-red-500">- R$ {costs.toLocaleString()}</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                <span className="font-bold text-gray-900">Lucro Líquido</span>
                <span className="text-2xl font-bold text-green-600">R$ {netProfit.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home(props) {
  // Ajuste para Preview: Usa as props se existirem (Vercel), senão usa o mock direto
  const events = props.initialEvents || mockEventsData;
  const error = props.error;

  // Substituto para <Head>
  useEffect(() => {
    document.title = "SymplaProfit - Maximize seus Resultados";
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      
      <Navbar />
      
      <main>
        <Hero />

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard 
                icon={DollarSign} 
                label="Receita Total" 
                value="R$ 142.5k" 
                trend="+12%" 
                color="bg-green-500" 
              />
              <StatsCard 
                icon={Ticket} 
                label="Ingressos Vendidos" 
                value="1.450" 
                trend="+5%" 
                color="bg-blue-500" 
              />
              <StatsCard 
                icon={Users} 
                label="Check-ins Realizados" 
                value="92%" 
                color="bg-purple-500" 
              />
              <StatsCard 
                icon={BarChart3} 
                label="Ticket Médio" 
                value="R$ 98,50" 
                trend="+2%" 
                color="bg-orange-500" 
              />
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section id="eventos" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Seus Eventos Ativos</h2>
                <p className="text-gray-600">Gerencie a performance de vendas em tempo real.</p>
              </div>
              <button className="hidden sm:flex text-blue-600 font-bold hover:text-blue-700 items-center gap-1">
                Ver todos <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {error && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl mb-8 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></div>
                <span>Nota: Exibindo dados de demonstração ({error})</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        <ProfitCalculator />
        
      </main>

      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-500" />
              <span className="font-bold text-xl">SymplaProfit</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 SymplaProfit Analytics. Todos os direitos reservados.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Termos</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Suporte</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
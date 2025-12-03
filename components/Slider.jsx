import React, { useState, useEffect } from 'react';

// Mock data para os slides de destaque
const slidesData = [
    { 
        id: 1, 
        title: 'Festival de Música do Verão', 
        subtitle: 'Ingressos limitados! Garanta o seu agora.', 
        imageUrl: 'https://placehold.co/1200x450/1c313a/ffffff?text=FESTIVAL+DE+VERAO',
        link: '/eventos/summer-fest'
    },
    { 
        id: 2, 
        title: 'Congresso de Tecnologia 2026', 
        subtitle: 'Conecte-se com os maiores inovadores do mercado.', 
        imageUrl: 'https://placehold.co/1200x450/0b3633/ffffff?text=CONGRESSO+TECH',
        link: '/eventos/tech-congress'
    },
    { 
        id: 3, 
        title: 'Peça Teatral Clássica: O Retorno', 
        subtitle: 'Uma noite de arte e emoção. Únicas apresentações.', 
        imageUrl: 'https://placehold.co/1200x450/292b2c/ffffff?text=PECA+TEATRAL',
        link: '/eventos/classic-play'
    },
];

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = slidesData.length;

    // Lógica para a transição automática dos slides
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
        }, 5000); // Muda o slide a cada 5 segundos

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, [totalSlides]);

    const goToNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    const goToPrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    };

    return (
        <div className="sliderContainer">
            {slidesData.map((slide, index) => (
                <a 
                    key={slide.id} 
                    href={slide.link} 
                    // Aplica as classes CSS do módulo selecionado
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${slide.imageUrl})` }}
                    // Adiciona um placeholder de imagem no caso de falha de carregamento
                    onError={(e) => { e.target.style.backgroundImage = 'url(https://placehold.co/1200x450/404040/ffffff?text=SLIDE+INDISPONIVEL)' }}
                >
                    <div className="slideContent">
                        <h2>{slide.title}</h2>
                        <p>{slide.subtitle}</p>
                    </div>
                </a>
            ))}

            {/* Botões de navegação manual (Setas) */}
            <button 
                className="navButton prev" 
                onClick={goToPrev}
                aria-label="Slide anterior"
            >
                &#10094;
            </button>
            <button 
                className="navButton next" 
                onClick={goToNext}
                aria-label="Próximo slide"
            >
                &#10095;
            </button>

            {/* Indicadores de slide (Dots) */}
            <div className="dotsContainer">
                {slidesData.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Ir para o slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* CSS EMBUTIDO - Contém os estilos que você selecionou */}
            <style>{`
                /* Estilos aprimorados para o componente Slider.jsx */

                :root {
                    --accent-color: #00bcd4; /* Azul ciano para destaque */
                    --text-color-light: #ffffff;
                    --background-dark: rgba(0, 0, 0, 0.7);
                }

                .sliderContainer {
                    width: 100%;
                    max-width: 1200px; /* Limita a largura máxima do slider */
                    height: 450px; /* Aumentado ligeiramente para um impacto visual maior */
                    margin: 3rem auto; /* Aumenta a margem para destaque */
                    overflow: hidden;
                    position: relative;
                    border-radius: 16px; /* Bordas mais arredondadas */
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05); /* Sombra mais suave e borda sutil */
                }

                .slide {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                    transition: opacity 0.7s ease-in-out; /* Transição levemente mais rápida */
                    background-size: cover;
                    background-position: center;
                    display: flex;
                    align-items: flex-end;
                    cursor: pointer;
                }

                .slide.active {
                    opacity: 1;
                    z-index: 10;
                }

                .slideContent {
                    /* Gradiente mais intenso na base para melhor legibilidade */
                    background: linear-gradient(to top, var(--background-dark) 0%, rgba(0, 0, 0, 0) 100%);
                    color: var(--text-color-light);
                    padding: 3rem; /* Aumenta o padding do conteúdo */
                    width: 100%;
                    z-index: 20;
                }

                .slideContent h2 {
                    margin: 0 0 0.5rem 0;
                    font-size: 2.5rem; /* Título maior */
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
                }

                .slideContent p {
                    margin: 0;
                    font-size: 1.25rem; /* Subtítulo maior */
                    color: var(--accent-color); 
                    font-weight: 600; /* Peso da fonte ajustado */
                }

                /* Controles de Navegação (Setas) */
                .navButton {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(0, 0, 0, 0.3); /* Fundo mais sutil */
                    color: var(--text-color-light);
                    border: none;
                    padding: 1.25rem 0.75rem; /* Botões maiores */
                    cursor: pointer;
                    z-index: 30;
                    font-size: 2rem; /* Seta maior */
                    opacity: 0.8;
                    transition: opacity 0.3s, background 0.3s, transform 0.2s;
                }

                .navButton:hover {
                    opacity: 1;
                    background: var(--background-dark); /* Fundo mais escuro no hover */
                    transform: translateY(-50%) scale(1.05); /* Efeito de zoom sutil no hover */
                }

                .prev {
                    left: 0;
                    border-radius: 0 16px 16px 0;
                }

                .next {
                    right: 0;
                    border-radius: 16px 0 0 16px;
                }

                /* Indicadores (Dots) */
                .dotsContainer {
                    position: absolute;
                    bottom: 20px; /* Movido um pouco para cima */
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    z-index: 40;
                }

                .dot {
                    height: 12px; /* Dots maiores */
                    width: 12px;
                    margin: 0 6px;
                    background-color: rgba(255, 255, 255, 0.4); /* Fundo mais transparente */
                    border-radius: 50%;
                    display: inline-block;
                    cursor: pointer;
                    transition: background-color 0.3s, transform 0.2s;
                }

                .dot:hover {
                    background-color: rgba(255, 255, 255, 0.7);
                }

                .dot.active {
                    background-color: var(--accent-color); /* Cor de destaque para o dot ativo */
                    transform: scale(1.2); /* Dot ativo com leve aumento de tamanho */
                }

                /* Responsividade Aprimorada */
                @media (max-width: 1024px) {
                    .sliderContainer {
                        height: 350px;
                        margin: 2rem auto;
                    }
                    .slideContent {
                        padding: 2rem;
                    }
                    .slideContent h2 {
                        font-size: 2rem;
                    }
                    .slideContent p {
                        font-size: 1.1rem;
                    }
                }

                @media (max-width: 768px) {
                    .sliderContainer {
                        height: 300px; 
                        border-radius: 8px;
                    }
                    .slideContent {
                        padding: 1rem;
                    }
                    .slideContent h2 {
                        font-size: 1.75rem;
                    }
                    .slideContent p {
                        font-size: 1rem;
                    }
                    .navButton {
                        padding: 0.75rem 0.5rem;
                        font-size: 1.5rem;
                    }
                }

                @media (max-width: 480px) {
                    .sliderContainer {
                        height: 250px;
                        margin: 1rem 0.5rem; /* Menos margem nas laterais */
                        border-radius: 6px;
                    }
                    .navButton {
                        display: none; /* Oculta as setas em telas muito pequenas, focando na navegação por dots/swipe (implícito) */
                    }
                    .slideContent {
                        padding: 0.75rem;
                    }
                    .slideContent h2 {
                        font-size: 1.3rem;
                    }
                    .slideContent p {
                        font-size: 0.9rem;
                    }
                    .dot {
                        height: 10px;
                        width: 10px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Slider;
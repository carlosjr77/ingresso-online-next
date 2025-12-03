// components/EventCard.jsx
import React from 'react';
import styles from '../styles/EventCard.module.css'; 

const EventCard = ({ title, subtitle, dateLocation, imageSrc, isFeatured }) => {
    // Escolhe a classe CSS baseada na prop isFeatured
    const cardClassName = isFeatured ? styles.eventCardHighlight : styles.eventCardGrid;
    
    return (
        <a href="#" className={cardClassName}>
            {/* O caminho deve ser relativo a public/ */}
            <img 
                src={`/${imageSrc}`} 
                alt={title} 
                loading="lazy"
            />
            <div className={styles.cardInfoOverlay}>
                <h3>{title}</h3>
                <p>{subtitle}</p>
                <span>{dateLocation}</span>
            </div>
        </a>
    );
};

export default EventCard;
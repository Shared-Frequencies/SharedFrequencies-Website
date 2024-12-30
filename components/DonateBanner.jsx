import styles from '../styles/DonateBanner.module.css';

const DonateBanner = () => {
  const text = "SUPPORT OUR MISSION";
  
  return (
    <a 
      href="https://www.patreon.com/c/sharedfrequenciesradio" 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.donateBanner}
    >
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className={styles.wiggleChar}
          style={{ 
            animationDelay: `${index * 0.1}s`,
            marginLeft: char === ' ' ? '0.5em' : '0.1em'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </a>
  );
};

export default DonateBanner; 
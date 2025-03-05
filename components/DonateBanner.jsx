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
      {text.split(' ').map((word, wordIndex) => (
        <span 
          key={`word-${wordIndex}`}
          style={{ 
            marginRight: '0.5em',
            display: 'inline-block'
          }}
        >
          {word.split('').map((char, charIndex) => (
            <span 
              key={`${wordIndex}-${charIndex}`}
              className={styles.wiggleChar}
              style={{ 
                animationDelay: `${(wordIndex * word.length + charIndex) * 0.1}s`,
                marginLeft: '0.1em'
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </a>
  );
};

export default DonateBanner; 
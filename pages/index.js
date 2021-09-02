import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'


export default function Home() {
    let twitch = ''

  return (
    <div className={styles.container}>
      <Head>
        <title>Shared Frequencies</title>
        <meta name="description" content="Shared Frequencies" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className={styles.header}>
        <Image className={styles.logo} src="/logo.png" alt="Shared Frequencies Logo" width={236} height={111} />
        <div className={styles.oval}>
            <img className={styles.playButton} src="/smallPlay.png" alt="play button" width={25} height={25} />
        </div>
      </header>

      <main className={styles.main}>
        <div>
          <div className="twitch">
            <div className="twitch-video">
              <iframe
                  src="https://player.twitch.tv/?collection=38qoa9pThxWR5A&video=462690692&parent=sharedfrequencies.live"
                  frameBorder="0"
                  scrolling="no"
                  parent="sharedfrequencies.live"
                  allowFullScreen="true"
                  height="378"
                  width="620"
                  >
              </iframe>
            </div>
            <div className="twitch-chat d-none d-lg-block">
              <iframe
                  frameBorder="0"
                  scrolling="no"
                  src="https://www.twitch.tv/embed/sharedfrequenciesradio/chat?darkpopout&parent=sharedfrequencies.live"
                  height="378"
                  width="620">
              </iframe>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

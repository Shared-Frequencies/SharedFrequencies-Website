import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shared Frequencies</title>
        <meta name="description" content="Shared Frequencies" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className={styles.header}>
        <Image className={styles.logo} src="/logo.png" alt="Shared Frequencies Logo" width={236} height={111} />
        <div className={styles.headerSpacer}></div>
        <div className={styles.oval}>
            <Image className={styles.playButton} src="/smallPlay.png" alt="play button" width={25} height={25}></Image>
        </div>
      </header>

      <main className={styles.main}>
        <div>
          <div className="twitch">
            <div className="twitch-video">
              <iframe
                  src="https://player.twitch.tv/?channel=sharedfrequenciesradio&parent=www.sharedfrequencies.com&parent=sharedfrequencies.com"
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen="true"
                  height="100%"
                  width="100%">
              </iframe>
            </div>
            <div className="twitch-chat d-none d-lg-block">
              <iframe
                  frameBorder="0"
                  scrolling="no"
                  src="https://www.twitch.tv/embed/sharedfrequenciesradio/chat?darkpopout&parent=www.sharedfrequencies.com&parent=sharedfrequencies.com"
                  height="100%"
                  width="100%">
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

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

      <main className={styles.main}>
        <header className={styles.header}>
          <Image className={styles.logo} src="/logo.png" alt="Shared Frequencies Logo" width={236} height={111} />

          <div className={styles.oval}></div>
        </header>


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


        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'

export default function Home({ nowPlaying, schedule }) {

    const sched = Object.values(schedule)
        .flat()
        .splice(0, Object.values(schedule).flat().length-1)
        .map((show) => JSON.stringify({id: show.id, name: show.name, time: show.starts}))

    console.log(sched)
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
            <marquee className={styles.nowPlaying}>{nowPlaying !== null ? nowPlaying.name : 'Shared Frequencies Radio'}</marquee>
        </div>
      </header>

      <main className={styles.main}>
          <iframe
              className={styles.twitchVideo}
              src="https://player.twitch.tv/?collection=38qoa9pThxWR5A&video=462690692&parent=localhost"
              frameBorder="0"
              scrolling="no"
              parent="sharedfrequencies.live"
              allowFullScreen="true"
              height="378"
              width="100%"
          >
          </iframe>
          <iframe
              className={styles.twitchChat}
              frameBorder="0"
              scrolling="no"
              src="https://www.twitch.tv/embed/sharedfrequenciesradio/chat?darkpopout&parent=localhost"
              height="378"
              width="100%">
          </iframe>

      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export async function getStaticProps(context) {
    const nowPlayingRes = await fetch(`https://sharedfrequencies.airtime.pro/api/live-info`)
    const nowPlayingData = await nowPlayingRes.json()
    const nowPlayingResult = await nowPlayingData.current

    const scheduleRes = await fetch(`https://sharedfrequencies.airtime.pro/api/week-info`)
    const scheduleData = await scheduleRes.json()
    const scheduleResult = await scheduleData

    if (!nowPlayingData) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            nowPlaying: nowPlayingResult,
            schedule: scheduleResult
        }, // will be passed to the page component as props
    }
}
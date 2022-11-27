export default async function handler(req, res) {
    const nowPlayingRes = await fetch(`https://sharedfrequencies.airtime.pro/api/live-info-v2`)
    const nowPlayingData = await nowPlayingRes.json()
    const nowPlayingResult = await nowPlayingData.shows

    res.status(200).json(nowPlayingResult)
}

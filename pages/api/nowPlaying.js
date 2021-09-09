export default async function handler(req, res) {
    const nowPlayingRes = await fetch(`https://sharedfrequencies.airtime.pro/api/live-info`)
    const nowPlayingData = await nowPlayingRes.json()
    const nowPlayingResult = await nowPlayingData.current

    res.status(200).json(nowPlayingResult)
}

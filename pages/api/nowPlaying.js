export default async function handler(req, res) {
    try {
        const nowPlayingRes = await fetch(`https://sharedfrequencies.airtime.pro/api/live-info-v2`);
        if (!nowPlayingRes.ok) {
            throw new Error('Network response was not ok');
        }
        const nowPlayingData = await nowPlayingRes.json();
        // const nowPlayingResult = nowPlayingData.shows;
        const nowPlayingResult = nowPlayingData.tracks;

        res.status(200).json(nowPlayingResult);
    } catch (error) {
        console.error('Error fetching now playing data:', error);
        res.status(600).json({ error: 'Failed to fetch now playing data' });
    }
}

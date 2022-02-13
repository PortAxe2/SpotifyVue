import request from "../request"

export default {
    pausePlayback()  {
        return request.put("me/player/pause")
    },

    startPlayback()  {
        return request.put("me/player/play")
    },

    skipTrack()  {
        return request.post("me/player/next")
    },

    previousTrack()  {
        return request.post("me/player/previous")
    },

    setTrackTime(rangeSliderValue)  {
        return request.put(`me/player/seek?position_ms=${rangeSliderValue}`)
    },

    playSelectedTrack(trackId) {
        request
            .post(`me/player/queue?uri=spotify:track:${trackId}`)
            .then(response => {
                this.skipTrack();
            })
    },
}
<template>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <div class="smallTrack">
        <img src="./images/Spotify_Icon_RGB_White.png" style="height:22px;width:22px;margin-right:8px" alt="">
        <div class="trackData">
            <div class="albumArt" @click="$emit('play-selected-track', id)">
                <span class="material-icons">play_arrow</span>
                <img v-bind:src="coverArtUrl" width="50" height="50" alt="">
            </div>
            <div class="smallTrackData">
                <span class="title">{{ title }}</span>
                <span class="artistAndAlbum">{{ artist }} - {{ album }}</span>
            </div>
        </div>
        <div class="addToQueue">
            <span @click="$emit('add-to-queue', id)" class="material-icons">queue</span>
        </div>
    </div>
</template>

<style scoped>
@import '@/assets/style/smalltrack.css';
</style>

<script>

export default {

    emits: [
        'play-selected-track',
        'add-to-queue',
        ],

    props: {
        title: String,
        artist: String,
        album: String,
        coverArtUrl: String,
        id: String,
    },

    methods: {

    },
}

</script>
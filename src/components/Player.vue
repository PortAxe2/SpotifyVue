<template>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <div class="wrapper">

        <div ref="albumImageElement" class="albumDiv">
            <img :src="currentCoverArt" alt="">
        </div>

        <div class="playbackControl">

            <div class="timeTrack">
                <span>{{ this.getCurrentTrackTime }}</span>
                <input @change="setTrackTime" type="range" ref="trackProgressBar" class="trackTime" name="trackProgress" min="0" v-bind:max="currentTrackLength" v-bind:value="currentTrackTime" step="1000">
                <span>{{ this.getCurrentTrackLength }}</span>
            </div>

            <div>
                <span class="buttonControl material-icons" @click="previousTrack">skip_previous</span>
                <span class="buttonControl material-icons" v-if="playing" @click="pausePlayback">pause_circle_filled</span>
                <span class="buttonControl material-icons" v-if="!playing" @click="startPlayback">play_arrow</span>
                <span class="buttonControl material-icons" @click="skipTrack">skip_next</span>
            </div>

            <div class="trackMeta">
                <div class="nameArtist">
                    <div class="nameExplicit">
                        <p class="trackName">{{ currentSongName }}</p>
                        <span class="material-icons explicit" v-if="explicit">explicit</span>
                    </div>
                    <p>by {{ currentSongArtist }}</p>
                </div>
                
                <div class="trackName">
                    <p>{{ currentAlbumName }}</p>
                </div>

                <!-- <img src="./images/Spotify_Icon_RGB_White.png" style="height:30px; width:30px" alt=""> -->
            </div>

        </div>
        
    </div>
</template>

<style scoped>
@import '@/assets/style/player.css';
</style>

<script>
import api from '@/api'

    export default {
        methods: {

            msToTime: function(duration_ms) {
                var seconds = Math.floor((duration_ms/1000)%60);
                var minutes = Math.floor((duration_ms/1000/60)%60);
                return ( seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`);
            },

            pausePlayback: function() { api.player.pausePlayback(); },
            startPlayback: function() { api.player.startPlayback(); },
            skipTrack: function() { api.player.skipTrack(); },
            previousTrack: function() { api.player.previousTrack(); },
            setTrackTime: function() { api.player.setTrackTime(this.$refs.trackProgressBar.value); },

        },

        data() {
            return {
                rangeSliderValue: this.getRangeValue,
            }
        },

        props: {
                currentSongName: String,
                currentSongArtist: String,
                currentCoverArt: String,
                currentAlbumName: String,
                explicit: Boolean,
                playing: Boolean,
                currentTrackLength: Number,
                currentTrackTime: Number,
        },

        computed: {

            getCurrentTrackTime() {
                return this.msToTime(this.currentTrackTime);
            },

            getCurrentTrackLength() {
                return this.msToTime(this.currentTrackLength);
            },

            bgImageStyle () {
                console.log(this.currentCoverArt);
                return {
                    'background-image': `url (${this.currentCoverArt})`
                };
            },

        },
    }

</script>
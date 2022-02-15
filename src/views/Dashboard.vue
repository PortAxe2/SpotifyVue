<template>
    <div class="wrapper">

        <div ref="queuePopUp" class="queuePopUp">
            <p>Added to queue!</p>
        </div>
        
        <player

        ref="playerComponent"

        v-bind:currentSongName="currentSongName"
        v-bind:currentSongArtist="currentSongArtist"
        v-bind:currentAlbumName="currentAlbumName"
        v-bind:currentCoverArt="currentCoverArt"

        v-bind:explicit="explicit"
        v-bind:playing="playing"

        v-bind:currentTrackLength="currentTrackLength"
        v-bind:currentTrackTime="currentTrackTime"
        />

        <!-- <div class="playlists">
            <playlist v-for="playlist in playlists" :key="playlist.id"
            :coverURL="playlist.coverArtUrl"
            :name="playlist.name"
            :owner="playlist.owner"
            :id="playlist.id"
            @select-playlist="selectPlaylist"
            />
        </div> -->

        <div class="queuedSongs">
            <h2>{{ playlistName }}</h2>
            <div class="searchDiv">
                <span class="material-icons">search</span>
                <input class="searchInput" type="text" @keyup="filterList" v-model="searchQuery" placeholder="Type search here...">
            </div>
            <hr>
            <ul class="trackList">
                <!-- Full Lists -->
                <li v-for="queueTrack in queueTracks" :key="queueTrack.id">
                    <small-track v-if="(queueTrack.name.toLowerCase().includes(searchQuery.toLowerCase()) || queueTrack.artist.toLowerCase().includes(searchQuery.toLowerCase())) || searchQuery.length == 0"
                    :title="queueTrack.name"
                    :artist="queueTrack.artist"
                    :album="queueTrack.album"
                    :coverArtUrl="queueTrack.coverArtUrl"
                    :id="queueTrack.id"
                    @play-selected-track="playSelectedTrack"
                    @add-to-queue="addToQueue"
                    />
                </li>
            </ul>
            <span @click="loadMore" class="loadMore">Load More</span>
        </div>

    </div>
</template>

<style scoped>
@import '@/assets/style/dashboard.css';
</style>

<script>

import Player from '../components/Player.vue'
import SmallTrack from '../components/SmallTrack.vue'
import Playlist from '../components/Playlist.vue'

import axios from 'axios'
import api from '@/api'

export default {
    components: { 
        Player ,
        SmallTrack,
        Playlist,
    },

    methods: {

        filterList: function() {
            //console.log(this.searchQuery);
        },

        getPlaylistFirstTrack: function(playlistId) {
            return api.playlists.getPlaylistFirstTrack(playlistId);
        },

        selectPlaylist: function(playlistId, playlistName) {
            if(playlistName == this.playlistName) {return;}
            this.playlistName = playlistName;
            this.playlistURL = `https://open.spotify.com/playlist/${playlistId}`;
            this.queueTracks = [];
            this.generateQueue(this.getPlaylistFirstTrack(playlistId));
        },

        addToQueue: function(trackId) {
            axios
                .post(`/v1/me/player/queue?uri=spotify:track:${trackId}`)
                .then(console => {
                    this.$refs.queuePopUp.classList += " queuePopUp-show";
                    setTimeout(() => {
                        this.$refs.queuePopUp.classList.remove("queuePopUp-show");
                    },2000)
                })
        },

        playSelectedTrack: function(trackId) { api.player.playSelectedTrack(trackId); },
        getPlaylists: function() {
            this.playlists = api.playlists.getPlaylists();
            console.log(this.playlists);
        },

        generateQueue: function(url) {
            //console.log(this.nextUrlContext);
            axios
                .get(url)
                .then(response => {
                    //console.log(response);
                    var tracks = (this.isPlaylist ? response.data.tracks.items : response.data.items);
                    tracks.map(track => {
                        this.queueTracks.push({
                            id: track.track.id,
                            name: track.track.name,
                            artist: track.track.artists[0].name,
                            album: track.track.album.name,
                            coverArtUrl: track.track.album.images[2].url,
                        });
                    });
                    this.nextUrlContext = (this.isPlaylist ? response.data.tracks.next : response.data.next);
                })
        },

        loadMore: function() {
            if(this.nextUrlContext){
                this.generateQueue(this.nextUrlContext);
            }
        },

        getCurrentTrack: function() {
            axios
                .get("/v1/me/player/currently-playing")
                .then(response => {
                    //console.log(response);
                    
                    this.currentTrackTime = response.data.progress_ms;
                    this.currentTrackLength = response.data.item.duration_ms;

                    this.currentSongName = response.data.item.name;
                    this.currentSongArtist = response.data.item.artists[0].name;
                    this.currentAlbumName = response.data.item.album.name;
                    this.currentCoverArt = response.data.item.album.images[0].url;
                    this.currentSongId = response.data.item.id;
                    
                    this.explicit = response.data.item.explicit;
                    this.playing = response.data.is_playing;

                    this.isPlaylist = (response.data.context ? true : false);

                    if(this.playlistName == "Your Library" && response.data.context == null) { return; }

                    try{
                        if(this.playlistURL == response.data.context.href) {
                            return;
                        }
                    }catch(err){
                        //console.log(err);
                    }

                    //We need to clear the current queue since the context has changed
                    this.queueTracks = [];

                    if(this.isPlaylist) {
                        axios
                            .get(response.data.context.href)
                            .then(responseInner => {
                                this.playlistURL = responseInner.data.href;
                                this.playlistName = responseInner.data.name;
                                this.nextUrlContext =  this.playlistURL;
                                //console.log(responseInner);
                                this.generateQueue(this.nextUrlContext);
                            })
                    } else {
                        this.playlistName = 'Your Library';
                        this.nextUrlContext = "/v1/me/tracks";
                        this.generateQueue(this.nextUrlContext);
                    }

                })
        },

        refreshTrack: function() {
            setInterval(this.getCurrentTrack,1000);
        },
    },

    data() {
        return {
            accessToken: localStorage.getItem('spotifyToken'),
            refreshToken: localStorage.getItem('refreshSpotifyToken'),

            currentSongName: null,
            currentSongArtist: null,
            currentAlbumName: null,
            currentCoverArt: null,
            currentSongId: null,

            explicit: false,
            playing: false,

            playlists: [],

            currentTrackLength: 0,
            currentTrackTime: 0,

            isPlaylist: false,
            playlistName: '',
            playlistURL: '',

            nextUrlContext: '',

            allSongs: [],
            queueTracks: [],

            searchQuery: '',
        }
    },

    mounted() {
        axios.defaults.baseURL = "https://api.spotify.com",
        axios.defaults.headers.common['Authorization'] =  `Bearer ${this.accessToken}`;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        this.getCurrentTrack();
        //this.getPlaylists();
        this.refreshTrack();
    },
    
}
</script>

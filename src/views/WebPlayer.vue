<template>
    <html>
        <head>
            <title>Spotify Mini Player</title>
        </head>

        <body>
            <h1>Web</h1>
            <button @click="requestAuth">Sign in</button>
        </body>

    </html>
</template>

<style scoped>

</style>

<script>

import axios from 'axios'

export default {
    methods: {
        
    },

    created() {

        var searchParams = {
            client_id: this.client_id,
            response_type: 'code',
            redirect_uri: this.redirect_uri,
            state: this.state,
            scope: this.scope,
        }

        var params = new URLSearchParams(searchParams);

        window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
    },

    data() {
        return {
            token: null,
            refreshToken: null,
            client_id: '',
            client_secret: '',
            redirect_uri: 'http://localhost:3000/callback',
            stateKey: 'spotify_auth_state',
            state: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2), 
            scope: 'user-read-private user-read-email app-remote-control streaming playlist-read-collaborative user-read-currently-playing user-library-read',
        }
    },

    mounted() {

    }
}

</script>

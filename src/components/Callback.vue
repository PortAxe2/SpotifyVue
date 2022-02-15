<template>
    <div>
        <div v-if="signedIn">
            <h1>Signed In</h1>
        </div>

        <div v-if="!signedIn">
            <h1>Error Occured</h1>
            <RouterLink to="/">
                <button>Go Home</button>
            </RouterLink>
        </div>
    </div>
</template>


<script>

import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'

export default {
    methods: {
    },
    data() {
        return {
            code: '',
            state: '',
            client_id: '',
            client_secret: '',
            signedIn: null,
        }
    },
    mounted() {
        this.client_id     = localStorage.getItem('client_id_spotify');
        this.client_secret = localStorage.getItem('client_secret_spotify');
        var querySearch = window.location.search;
        var queryParams = new URLSearchParams(querySearch);
        this.code        = queryParams.get('code');
        this.state       = queryParams.get('state');

        console.log(this.code);
        console.log(this.state);


        var data = new URLSearchParams ({
            grant_type: 'authorization_code',
            code: this.code,
            redirect_uri: 'http://localhost:3000/callback',
            show_dialog: true
        });

        var headers = {
            headers: {
                'Authorization': `Basic ${btoa(this.client_id + ":" + this.client_secret)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        axios
            .post('https://accounts.spotify.com/api/token', data.toString(), headers)
            .then(response => {
                this.signedIn = true;
                console.log(response)
                localStorage.setItem('spotifyToken', response.data.access_token);
                localStorage.setItem('refreshSpotifyToken', response.data.refresh_token);
                // window.location.href = "http://localhost:3000/dashboard";
                window.open("http://localhost:3000/dashboard", 'popup', 'width=320,height=700');
            })
            .catch(() => {
                this.signedIn = false;
            })


    }
}

</script>
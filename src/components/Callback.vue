<template>
    <div>
        <h1>Signed In</h1>
        <p>{{ token }}</p>
        <p>{{ refreshToken }}</p>
    </div>
</template>


<script>

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
        }
    },
    mounted() {
        this.client_id     = prompt("Pleaser Enter User Client ID");
        this.client_secret = prompt("Pleaser Enter User Client Secret");
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
                console.log(response)
                localStorage.setItem('spotifyToken', response.data.access_token);
                localStorage.setItem('refreshSpotifyToken', response.data.refresh_token);
                // window.location.href = "http://localhost:3000/dashboard";
                window.open("http://localhost:3000/dashboard", 'popup', 'width=320,height=700');
            })


    }
}

</script>
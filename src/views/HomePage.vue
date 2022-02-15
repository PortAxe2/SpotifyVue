<template>
<div class="wrapper">
  <div class="hello">
    <h1>Mini Player for Spotify</h1>

    <br>

    <div class="textDiv">
      <h3>Project Description</h3>
      <hr>
      <br>
      <p>This Mini Player for Spotify allows the user to listen to control playback and queue tracks
        with minimal screen space.
      </p>
      <br>

      <form @submit.prevent>
        <div class="clientForm">
          <div class="inputDiv">  
            <label for="clientId">Client ID</label>
            <input type="text" name="clientID" v-model="client_id" placeholder="Client ID...">
          </div>

          <div class="inputDiv">
            <label for="clientSecret">Client Secret</label>
            <input type="text" name="clientSecret"  v-model="client_secret" placeholder="Client secret...">
          </div>
        </div>
      </form>


      <green-button buttonText="Continue" @click="buttonRedirect"/>
    </div>

  </div>

</div>
</template>

<style scoped>
@import '@/assets/style/homepage.css';
</style>

<script>

import GreenButton from '@/components/GreenButton.vue';

export default {

  components: {
    GreenButton,
  },

  methods: {
    buttonRedirect: function() {
      localStorage.setItem('client_id_spotify', this.client_id);
      localStorage.setItem('client_secret_spotify', this.client_secret);

      var searchParams = {
        client_id: this.client_id,
        response_type: 'code',
        redirect_uri: 'http://localhost:3000/callback',
        state: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2), 
        scope: 'user-read-private user-read-email app-remote-control streaming playlist-read-collaborative user-read-currently-playing user-library-read',
      }

      var params = new URLSearchParams(searchParams);
      window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;

    }
  },
  data() {
    return {
      client_id: '',
      client_secret: '',
    }
  },
  
}
</script>


<style scoped>

</style>

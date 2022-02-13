<template>
<div class="wrapper">
  <div class="hello">
    <h1>Mini Player for Spotify</h1>

    <br>

    <div class="textDiv">
      <h3>Project Description</h3>
      <hr>
      <br>
      <p>The desktop app for Spotify takes up plenty of screen space, even when it's reduced to its smallest width.
        The web version of the Spotify player includes a mini player, but it active device has to be the web player instance.
        This is where Mini Player comes in, it will allow you to control playback and queue songs on whatever device you want.
        By pressing "Continue", you will be redirected to the spotify authentication page, where you will be able to view 
        the needed permissions of the app. Should you choose to agree with those terms, a new popup window will open. Play any 
        song from your device and the mini should be active.
      </p>
      <br>
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
      var client_id     = prompt("Pleaser Enter User Client ID");
      var client_secret = prompt("Pleaser Enter User Client Secret");
      var searchParams = {
        client_id: client_id,
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

    }
  },
  
}
</script>


<style scoped>

</style>

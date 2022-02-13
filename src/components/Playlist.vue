<template>
    <div @click="$emit('select-playlist', id, name)" class="playlist">
        <img v-bind:src="coverURL" alt="playlist image">
        <div class="info">
            <p style="font-weight: 600;">{{ name }}</p>
            <p>By {{ owner }}</p>
        </div>
    </div>
</template>

<style scoped>
@import '@/assets/style/playlist.css';
</style>

<script>

import SmallTrack from '@/components/SmallTrack.vue'

export default {

    emits: [
        'select-playlist'
    ],

    components: {
        SmallTrack,
    },


    props: {
        coverURL: String,
        name: String,
        owner: String,
        id: String,
    },

}

</script>
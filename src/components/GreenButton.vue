<template>
    <button class="interactBtn">
        {{ buttonText }}
    </button>
</template>


<style scoped>

.interactBtn{
    width: 150px;
    height: 45px;

    transition: 0.2s ease-out;

    border-radius: 32px;
    border: none;
    border: 2px solid #1DB954;


    color: #1DB954;

    background: none;
    background-color: #1db95400;

    font-weight: 600;
    font-size: 12pt;
}

.interactBtn:hover {
        transition: 0.2s ease-in;
        background-color: #1DB954;
        color: white;
        cursor: pointer;
}

</style>


<script>

export default {

    props: {
        buttonText: String,
    },

    methods: {

    },

    data() {
        return {

        }
    },
}

</script>

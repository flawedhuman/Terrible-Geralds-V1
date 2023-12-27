<template>
    <button @click="getPosts">
        THIS IS A BUTTON. GET POSTS.
    </button>
</template>

<script>
export default {
    data() {
        return {
            
        };
    },
    mounted() {

    },
    methods: {
        async getPosts() {
            await fetch('https://api-us.storyblok.com/v2/cdn/stories/?token=0DfayINfNQIq9uKpkTvTZwtt')
                .then(response => response.json())
                .then(data => console.log(data))
        }
    },
}
</script>

<style>
    
</style>
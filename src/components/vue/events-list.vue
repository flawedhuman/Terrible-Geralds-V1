<template>
    <div class="event-item" v-for="event in events">
        <h4>{{ event.content.event_title }}</h4>
        <p class="event-item-description">
            {{ getDayOnly(event.content.event_start_time) }}, {{ formatDate(event.content.event_start_time) }}<br>
            {{ formatTime(event.content.event_start_time) }} - {{ formatTime(event.content.event_end_time) }}<br>
            Location: {{ event.content.event_location }}<br>
        </p>
        <div class="event-item-buttons d-flex">
            <a class="btn btn-secondary" :href="event.content.event_google_map_link.url" target="_blank">LOCATION MAP</a>
            <a class="btn btn-secondary" :href="event.content.event_facebook_link.url" target="_blank">EVENT PAGE</a>
        </div>
    </div>
</template>
  
<script>

export default {
    props: ['token'],
    data() {
      return {
        events: [],
      };
    },
    mounted() {
        this.getEvents();
    },
    methods: {
        async getEvents() {
            await fetch(`https://api-us.storyblok.com/v2/cdn/stories/?token=${this.token}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.events = data.stories || [];
            })
        },
        getDayOnly(dateString) {
            const options = { weekday: 'long' };
            const date = new Date(dateString);
            return date.toLocaleString('en-US', options);
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const date = new Date(dateString);
            return date.toLocaleString('en-US', options);
        },
        formatTime(dateString) {
            const options = { hour: 'numeric', minute: 'numeric', hour12: true };
            const date = new Date(dateString);
            return date.toLocaleString('en-US', options);
        },
    },
};

</script>

<style>

    .event-item {
        margin-bottom: 2rem;
        align-items: center;
        border-bottom: 5px rgb(194, 12, 33) solid;
    }

    .event-item:last-child {
        border-bottom: none;
    }

    .event-item-description {
        margin: 0;
        padding-left: 1.5rem;
        font-size: 1.6rem;
        font-family: "Bebas Neue", Arial, Helvetica, sans-serif;
        line-height: 1.5;
    }

    .event-item-buttons {
        font-size: 0.8rem;
        gap: 1.5rem;
    }
    
    @media (max-width: 600px) {

        .event-item-buttons {
            margin: 0.5rem 0;
            gap: 0rem;
            flex-direction: column;
        }

        .event-item-buttons .btn {
            margin-inline: initial;
            text-align: center;
        }

    }
</style>
  
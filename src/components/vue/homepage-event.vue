<template>
    <div v-if="events.length > 0" class="event-item">
        <h4>{{ events[0].content.event_title }}</h4>
        <p class="event-item-description">
            <span>{{ getDayOnly(events[0].content.event_start_time) }}, {{ formatDate(events[0].content.event_start_time) }}</span><br>
            {{ formatTime(events[0].content.event_start_time) }} - {{ formatTime(events[0].content.event_end_time) }}<br>
            Location: {{ events[0].content.event_location }}<br>
        </p>
        <div class="event-item-buttons d-flex">
            <a class="btn btn-secondary" :href="events[0].content.event_google_map_link.url" target="_blank">LOCATION MAP</a>
            <a class="btn btn-secondary" :href="events[0].content.event_facebook_link.url" target="_blank">EVENT PAGE</a>
        </div>
    </div>
    <div v-else>
        There are no scheduled events at this time!
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
                this.events = data.stories && data.stories.length > 0 ? [data.stories[0]] : [];
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
        margin-bottom: 2.2rem;
        align-items: center;
        border-bottom: 5px rgb(194, 12, 33) solid;
    }

    .event-item:last-child {
        border-bottom: none;
    }

    .event-item-description {
        margin-bottom: 10px;
        font-size: 1.3rem;
        font-family: "Roboto", Arial, Helvetica, sans-serif;
        line-height: 1.5;
    }

    .event-item-description span {
        font-weight: 800;
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
  
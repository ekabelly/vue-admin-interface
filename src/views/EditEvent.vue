<template>
    <div class="edit-event">
        editing event: {{ eventId ? eventId : 'new event' }}
    </div>
</template>

<script>

export default {
    name: 'editEvent',
    data(){
        return {
            eventId: null
        }
    },
    watch: {
        $route(){
            this.setComponenetData();
        }
    },
    mounted(){
        this.setComponenetData();
    },
    methods: {
        async setComponenetData(){
            this.eventId = this.$route.params.id;
            const event = await this.$store.dispatch('fetchEvent', this.eventId);
            console.log(event);
        }
    }
}
</script>


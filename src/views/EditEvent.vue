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
            this.eventId = this.$route.params.id;
        }
    },
    created(){
        this.eventId = this.$route.params.id;
    }
}
</script>


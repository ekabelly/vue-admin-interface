<template>
  <div class="dev-">
      <div class="volunteers">
          <select v-model="selectedVolunteer">
              <option v-for="volunteer of volunteers" :key="volunteer.user_id" >
                  {{ volunteer }}
              </option>
          </select>
          <div class="selected-volunteer">
              {{ selectedVolunteer }}
          </div>
      </div>
      <div class="event">
          <select v-model="selectedEvent">
              <option v-for="event of events" :key="event.id" >
                  {{ event }}
              </option>
          </select>
          <div class="selected-event">
              {{ selectedEvent }}
          </div>
      </div>
      <div>
          <button @click="onClickAssignVolunteer">assign seleted volunteer to selected selected event</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import eventService from '@/services/events-service';
import appApi from '../config/app-api.json5';

export default {
    name:'DevArea',
    data(){
        return {
            selectedVolunteer: {},
            selectedEvent: {},
            volunteers: [],
            events: []
        }
    },
    mounted(){
        this.setComponentData();
    },
    methods: {
        async setComponentData(){
            const volunteersPromise = axios.get('https://admin-interface-dev.firebaseio.com/users.json');
            const eventsPromise = eventService.fetchEvents();
            const res = await Promise.all([eventsPromise, volunteersPromise]);
            this.volunteers = res[1].data;
            this.events = res[0].data.data;
        },
        async onClickAssignVolunteer(){
            const eventId = JSON.parse(this.selectedEvent).id;
            const userId = JSON.parse(this.selectedVolunteer).user_id;
            const res = await axios.get(`${appApi.serverUrl}/api/events/event-register/${userId}/${eventId}`);
            console.log({ res });
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
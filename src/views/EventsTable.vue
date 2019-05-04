<template>
    <div class="events-table">
        <div class="table-head flex space-evenly">
            <div class="table-title table-item">
                סטטוס
            </div>
            <div class="table-title table-item">
                רשומים/קהל רחב
            </div>
            <div class="table-title table-item" @click="sortByDate(filteredEventsArr, dateSortDir)">
                תאריך
            </div>
            <div class="table-title table-item">
                מיקום
            </div>
            <div class="table-title table-item event-name">
                שם האירוע
            </div>
        </div>
        <div class="table-body" v-if="isData">
            <div class="event-item flex" v-for="event of filteredEventsArr" :key="event.key" @click="navigateToEvent(event.key)">
                <div class="table-item">
                    {{ handleVolunteersStatus(event) }}
                </div>
                <div class="table-item">
                    {{ handleEventType(event.type) }}
                </div>
                <div class="table-item">
                    {{ parseDate(event.time.date) }}
                </div>
                <div class="table-item">
                    <div class="location" v-for="(location, index) of event.locations" :key="index">
                        - {{ location.city }}
                    </div>
                </div>
                <div class="table-item event-name" :title="event.title">
                    {{ handleEventName(event.title) }}
                    <!-- {{ event.title }} -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import eventConfig from '@/config/eventConfig.json';

export default {
    data(){
        return {
            eventConfig,
            eventsObj: {},
            eventsArr: [],
            filteredEventsArr: [],
            isData: false,
            dateSortDir: false
        }
    },
    created(){
        this.fetchInitialData();
    },
    methods: {
        async fetchInitialData(){
            const data = await this.$store.dispatch('fetchEvents');
            if(data){
                this.eventsObj = data;
                // retanfost the obj to arr, add to every itiration its key and sort if bt date.
                this.eventsArr = this.sortByDate(Object.keys(data).map(eventKey => 
                    ({...data[eventKey], key: eventKey})));
                this.filteredEventsArr = [...this.eventsArr];
                this.isData = true;
            }
        },
        handleVolunteersStatus(event){
            if(event.personal && event.personal.length >= event.volunteers.max){
                return eventConfig.full;
            }
            return eventConfig.notFull;
        },
        handleEventType(eventType){
            return eventConfig.types[eventType];
        },
        sortByDate(eventsArr){
            if(this.sortDir){
                this.sortDir = false;
                return eventsArr.sort((a, b) => new Date(a.time.date) - new Date(b.time.date));
            }
            this.sortDir = true;
            return eventsArr.sort((a, b) => new Date(b.time.date) - new Date(a.time.date));
        },
        handleEventName(eventName){
            // this size has been tested and checked to be the best.
            const max = 44;
            if(eventName.length > max){
                return eventName.slice(0, max) + '...'
            }
            return eventName;
        },
        parseDate(date){
            moment.locale('he');
            return moment(date).format('DD.MM.YYYY');
        },
        navigateToEvent(eventKey){
            this.$router.push(`/event/${eventKey}`);
        },
        search(text){
            if(!text || text === ''){
                this.filteredEventsArr = [...this.eventsArr];
                return;
            }
            this.filteredEventsArr = this.filteredEventsArr.filter(event => {
                const titleFlag = event.title.includes(text); 
                let locationsFlag = false;
                for (const location of event.locations) {
                    if(location.city.includes(text)){
                        locationsFlag = true;
                    }
                }
                return locationsFlag || titleFlag;
            })
            console.log(text);
            
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

    .table-body {
        max-height: calc(100vh - 165px);
        overflow: auto;
    }

    .table-head {
        background-color: rgb(235, 235, 235);
        padding: 10px 0;
        padding-right: 4px;
    }

    .table-title {
        border-left: 1px solid $border-color;
    }

    .table-item {
        direction: rtl;
        text-align: right;
        width: -webkit-fill-available;
        padding: 0 15px;
        overflow: hidden;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .event-item {
        cursor: pointer;
        padding: 5px 0;
        margin: 10px 20px;
        border-radius: 5px;
        background-color: #f8f8f8;
        transition: box-shadow .3s;

        &:hover {
            box-shadow: 0 0 11px rgba(33,33,33,.4); 
        }
    }
</style>


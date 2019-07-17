<template>
    <div class="events-table">
        <div class="table-head flex space-evenly">
            <div class="table-title last-table-title event-table-cell">
                סטטוס
            </div>
            <div class="table-title event-table-cell">
                רשומים/קהל רחב
            </div>
            <div class="table-title table-sort-title event-table-cell pointer" @click="sortByDate">
               <span> תאריך </span>
               <img class="arrow-down" :class="{ down: dateSortDir }" src="../assets/img/arrow-down.png" alt="">
            </div>
            <div class="table-title event-table-cell">
                מיקום
            </div>
            <div class="table-title event-table-cell event-name">
                שם האירוע
            </div>
        </div>
        <div class="table-body" v-if="isData">
            <div class="event-table-row flex" v-for="event of filteredEventsArr" :key="event.key" @click="navigateToEvent(event.key)">
                <div class="event-table-cell event-status">
                    <img class="volunteer-status-icon" :src="handleStatusIcon(event)" />
                    <span>{{ handleVolunteersStatus(event) }}</span>
                    <!-- <img class="arrow-down" src="../assets/img/arrow-down.png" alt=""> -->
                </div>
                <div class="event-table-cell">
                    {{ handleEventType(event.type) }}
                </div>
                <div class="event-table-cell">
                    {{ parseDate(event.time.date) }}
                </div>
                <div class="event-table-cell">
                    <div class="location" v-for="(location, index) of event.locations" :key="index">
                        - {{ location.city }}
                    </div>
                </div>
                <div class="event-table-cell event-name" :title="event.title">
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
                // transform the obj to arr, add to every itiration its key and sort if bt date.
                this.eventsArr = Object.keys(data).map(eventKey => 
                    ({...data[eventKey], key: eventKey}));
                this.filteredEventsArr = [...this.eventsArr];
                this.isData = true;
            }
        },
        handleStatusIcon(event){
            let imgName = 'x-red';
            if(this.handleVolunteersStatus(event) === eventConfig.full){
                imgName = 'check-green';
            }
            return require(`@/assets/img/${imgName}.png`);
        },
        handleVolunteersStatus(event){
            if(event.personal){
                if( event.personal.length >= event.volunteers.max){
                    return eventConfig.full;
                }
                if(event.length === 0){
                    return eventConfig.notFull;
                }
                // if there are personal but not full or empty,
                return `התנדבו ${event.personal.length}, חסרים ${event.volunteers.max - event.personal.length}`
            }
            // if event.personal doesn't exists or is empty, return not full
            return eventConfig.notFull;
        },
        handleEventType(eventType){
            return eventConfig.types[eventType];
        },
        sortByDate(){
            if(this.dateSortDir){
                this.dateSortDir = false;
                return this.filteredEventsArr.sort((a, b) => new Date(a.time.date) - new Date(b.time.date));
            }
            this.dateSortDir = true;
            return this.filteredEventsArr.sort((a, b) => new Date(b.time.date) - new Date(a.time.date));
        },
        handleEventName(eventName){
            // this size has been tested and checked to be the best.
            const max = 35;
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
$table-mragin: 20px;

    .events-table {
        font-size: $text-font-size;
        @media (max-width: 768px){
            font-size: 16px;
        }
    }

    .table-body {
        max-height: calc(100vh - 210px);
        
        @media (max-width: 768px){
            max-height: calc(100vh - 272px);
        }
        overflow: auto;
    }

    .table-head {
        background-color:#eeeeee;
        padding: 10px 0;
        padding-right: 4px + $table-mragin; // scroll size 4px + table items margin 20px
        padding-left: $table-mragin;
    }

    .table-title {
        border-left: 1px solid $border-color;
        font-weight: bold;
        &.last-table-title {
            border-left: none;
        }
    }

    .event-table-cell {
        direction: rtl;
        text-align: right;
        width: -webkit-fill-available;
        padding: 5px 15px;
        overflow: hidden;

        display: flex;
        flex-direction: column;
        justify-content: center;

        .volunteer-status-icon {
            width: 20px;
            margin-left: 10px;
        }

        &.event-name {
            word-break: break-all;
        }
        &.event-status {
            border-radius: 5px 0 0 5px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: row;
            // background-color: yellow;
            // &.empty {
            // background-color: red;
            // }
            // &.full {
            // background-color: green;
            // }
        }
    }
    
    .event-table-row {
        cursor: pointer;
        margin: 10px $table-mragin;
        border-radius: 5px;
        background-color: #f8f8f8;
        transition: box-shadow .3s;

        &:hover {
            // box-shadow: 0 0 11px rgba(33,33,33,.4);
            box-shadow: 0px 0 7px 0 rgba(0, 0, 0, 0.17); 
        }
    }

    .arrow-down {
        height: 4px;
        margin-right: 3px;
        width: 7.5px;
    }

    .table-sort-title  {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        img {
            // height: 4px;
            // margin-right: 3px;
            // width: 7.5px;
            transition: transform .3s;
            &.down {
                transform: rotate(180deg);
            }
        }
    }
</style>


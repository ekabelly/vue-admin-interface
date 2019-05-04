<template>
    <div class="main">
        <div class="header flex space-between">
            <div class="search flex">
                <div v-if="$route.name === appConfig.routes.eventsTable" class="flex">
                    <input type="search" v-model="searchInput" @input="search">
                    <img src="@/assets/img/search.png" alt="" v-if="!searchInput || searchInput === ''">
                </div>
            </div>
            <div class="btns-container flex">
                <div class="btn general-messages">
                    הודעות כלליות
                </div>
                <router-link class="btn events" to="/events">
                    אירועים
                </router-link>
            </div>
        </div>
        <div class="content">
            <router-view/>
            <!-- <EventsTable ref="eventsTable" /> -->
        </div>
    </div>
</template>

<script>
import appConfig from '@/config/config';

export default {
    name: 'Main',
    data(){
        return {
            appConfig,
            searchInput: null
        }
    },
    methods: {
        search(event){   
            this.$refs.eventsTable.search(event.target.value);
        }
    }
}
</script>


<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

    .main {
        padding: 10px $padding;
    }

    .content {
        margin-top: 10px;
    }

    .btn {
        padding: 5px 0;
        width: 120px;
        text-align: center;
        border-radius: 40px;
        cursor: pointer;
        
        &.events {
            margin-left: 20px;
            background-color: $app-blue;
        }

        &.general-messages {
            background-color: $app-green;
        }
    }

    .search {
        position: relative;

        input:focus ~ img {
            display: none;
        }

        img {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 0;
            top: 7px;
        }
    }
</style>

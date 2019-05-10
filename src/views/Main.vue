<template>
    <div class="main" :class="{ 'showing-events-table': $route.name === appConfig.routes.eventsTable }">
        <div class="header flex space-between">
            <div class="search flex">
                <div v-if="$route.name === appConfig.routes.eventsTable" class="flex">
                    <input type="search" v-model="searchInput" @input="search">
                    <img src="@/assets/img/search.png" alt="" v-if="!searchInput || searchInput === ''">
                </div>
            </div>
            <div 
                class="btns-container flex" 
                :class="{ 'justify-center': $route.name !== appConfig.routes.eventsTable && $store.getters.isMobile }"
            >
                <div class="btn volunteers-btn">
                   מתנדבים
                </div>
                <div class="btn general-messages">
                    הודעות כלליות
                </div>
                <router-link class="btn events" to="/events">
                    אירועים
                </router-link>
            </div>
        </div>
        <div class="main-content" :class="{ 'fade-enter': fadeEnder, 'fade-leave': fadeLeave }">
            <router-view ref="eventsTable" />
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
            fadeEnder: true,
            fadeLeave: false,
            searchInput: null
        }
    },
    beforeRouteUpdate(to, from, next){
        this.fadeEnter = false;
        this.fadeLeave = true;
        setTimeout(() => {
            this.fadeLeave = false;
            this.fadeEnter = true;
            next();
        }, 300)
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

    .main-content {
        margin-top: 10px;
        transition: opacity .3s;
        opacity: 1;
    }

    .fade-enter {
        opacity: 1;
    }

    .fade-leave {
        opacity: 0;
    }

    .btns-container {
        width: -webkit-fill-available;
        justify-content: flex-end;

        &.justify-center {
            justify-content: center;
        }
    }

    .btn {
        padding: 5px 0;
        width: 120px;
        @media (max-width: 768px){
            width: 150px;
            font-size: 16px;
        }
        text-align: center;
        // border-radius: 40px;
        border: 1px solid $app-blue;
        cursor: pointer;
        
        
        &.events {
            margin-left: 20px;
            background-color: $app-blue;
        }

        &.general-messages,
        &.volunteers-btn {
            background-color: #fff;
            color: $app-blue;
        }
        
        &.general-messages {
            margin-left: 20px;
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

    @media (max-width: 768px){
        .main {

            &.showing-events-table {
                width: max-content;
            }
            overflow: auto;
            position: relative;
            top: 62px;
        }
    }
</style>

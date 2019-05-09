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
        <div class="main-content" :class="{ 'fade-enter': fadeEnder, 'fade-leave': fadeLeave }">
            <!-- <transition name="fade" mode="out-in"> -->
                <router-view />
            <!-- </transition> -->
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

    @media (max-width: 768px){
        .main {
            width: max-content;
            overflow: auto;
            position: relative;
            top: 62px;
        }
    }
</style>

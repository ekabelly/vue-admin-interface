<template>
    <div class="side-nav">
        <div @click="$router.push('/events')" class="logo border-bottom pointer">
            <img src="@/assets/img/logo.png" alt="">
        </div>
        <router-link to="/event">
            <div class="create-new-event side-nav-btn border-bottom flex align-center justify-center">
                יצירת אירוע חדש
            </div>
        </router-link>
        <div class="disabled side-nav-btn border-bottom flex align-center justify-center">
            <div>
                אירועים פעילים
            </div>
        </div>
        <div class="disabled side-nav-btn border-bottom flex align-center justify-center">
            <div>
                ארכיון אירועים
            </div>
        </div>
        <router-link to="/new-feed">
            <div class="side-nav-btn border-bottom flex align-center justify-center">
                יצירת הודעה חדש
            </div>
        </router-link>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

$navbar-height: 55px;

    .side-nav {
        // padding-top: $navbar-height;
        // width: 25vw;
        background-color: #fff;
        // border-left: 1px solid $border-color;
        height: -webkit-fill-available;
        a, div {
            text-align: center;
        }
    }

    .logo img {
        width: 195px;
    }

    .border-bottom {
        border-bottom: 1px solid grey;
        height: 70px;

        &.logo {
            height: auto;
        }
    }

    .side-nav-btn {
        font-size: 16px;
        color: black;
        &.disabled {
            color: $border-color;
            cursor: default;
        }
    }

    .create-new-event {
        color: #fff;
        background-color: $app-blue;
    }
</style>

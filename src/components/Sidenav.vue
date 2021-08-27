<template>
    <div class="side-nav">
        <div @click="$router.push('/events')" class="logo border-bottom pointer">
            <img src="@/assets/img/logo.png" alt="">
        </div>
        <router-link to="/event" class="create-new-event side-nav-btn border-bottom flex align-center justify-center">
            יצירת אירוע חדש
        </router-link>
        <router-link to="/events" class="side-nav-btn border-bottom flex align-center justify-center">
            אירועים פעילים
        </router-link>
        <router-link to="/finished-events" class="side-nav-btn border-bottom flex align-center justify-center">
            ארכיון אירועים
        </router-link>
        <router-link to="/new-feed" class="side-nav-btn border-bottom flex align-center justify-center">
            יצירת הודעה חדשה
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

        &.router-link-exact-active {
            background-color: $app-blue;
            color: #fff;
        }
    }
</style>

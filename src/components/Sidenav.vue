<template>
    <div class="side-nav">
        <div class="logo border-bottom">
            <img src="@/assets/img/logo.png" alt="">
        </div>
        <div class="create-new-event btn border-bottom flex align-center justify-center">
            <router-link to="/event">
                יצירת אירוע חדש
            </router-link>
        </div>
        <div class="btn border-bottom flex align-center justify-center">
            <div>
                אירועים פעילים
            </div>
        </div>
        <div class="btn border-bottom flex align-center justify-center">
            <div>
                ארכיון אירועים
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

$navbar-height: 55px;

    .side-nav {
        // padding-top: $navbar-height;
        // width: 25vw;
        background-color: #fff;
        border-left: 1px solid $border-color;
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

    .btn {
        font-size: 16px;
    }

    .create-new-event {
        color: #fff;
        background-color: $app-blue;
    }
</style>

<template>
    <div class="navbar" :class="{ black: menuOpen }">
        <div class="hamburger" @click="toggleMenu">
            <div class="hamburger-line" :class="{ 'rotate reverse white': menuOpen }"></div>
            <div class="hamburger-line" :class="{ 'white': menuOpen }"></div>
            <div class="hamburger-line" :class="{ 'rotate white': menuOpen }"></div>
        </div>
        <div class="links-container flex" :class="{ 'open': menuOpen }">
            <div class="user-state link">
                שלום עידו, התנתק 
            </div>
            <div class="config link">
                הגדרות
            </div>
            <div class="volunteers link">
                מתנדבים
            </div>
            <div class="volunteers link mobile-only">
                יצירת אירועי חדש
            </div>
            <div class="volunteers link mobile-only">
                אירועים פעילים
            </div>
            <div class="volunteers link mobile-only">
                ארכיון אירועים
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data(){
        return {
            menuOpen: false
        }
    },
    methods: {
        toggleMenu(){
            this.menuOpen = !this.menuOpen;
        }
    }
}
</script>


<style lang="scss" scoped>

@import '@/assets/scss/style.scss';

    $link-padding: 15px;
    
    .links-container {
        width: fit-content;
        margin-left: calc(#{$padding} - #{$link-padding});
    }
    
    .link {
        font-size: $links-font-size;
        @media (max-width: 768px){
            font-size: 22px;
        }
        padding: $link-padding;
        cursor: pointer;
    }

    .mobile-only {
        display: none;
    }

    @media (min-width: 768px){
        .navbar {
            border-bottom: 1px solid $border-color;
        }
    }

    @media (max-width: 768px){
        .navbar {
            position: fixed;
            z-index: 1000;
            transition:  right 0.3s ease-out;
            right: -100vw;
            color: white;
            width: 100vw;
            height: 100vh;
            background-color: rgba($color: #000000, $alpha: 0.8);

            &.black {
                right: 0;
            }
        }

        .mobile-only {
            display: inherit;
        }

        .links-container {
            transition: right .3s ease-out;
            flex-direction: column;
            align-items: flex-end;
            width: 100vw;
            margin-top: 62px;
            overflow: hidden;
            position: absolute;
        }

        .hamburger {
            z-index: 1001;
            position: fixed;
            top: 20px;
            right: 20px;
        }

        .hamburger-line {
            width: 45px;
            height: 5px;
            background-color: black;
            margin: 8px 0;
            transition: transform .3s ease-in, width .3s ease-in, background-color .3s;
            
            &.white {
                background-color: white;
            }

            &.rotate {
                width: 35px;
                transform: rotate(-25deg);
                transform-origin: 30% -500%;
            }

            &.reverse {
                transform-origin: 25% 650%;
                transform: rotate(25deg);
            }
        }
    }
</style>


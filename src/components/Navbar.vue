<template>
    <div class="navbar">
        <div class="links-container flex">
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

<style lang="scss" scoped>

@import '@/assets/scss/style.scss';

$link-padding: 15px;

    .navbar {
        border-bottom: 1px solid $border-color;
    }
    
    .links-container {
        width: fit-content;
        margin-left: calc(#{$padding} - #{$link-padding});
    }
    
    .link {
        padding: $link-padding;
        cursor: pointer;
    }

    .mobile-only {
        display: none;
    }

    @media (max-width: 768px){
        .mobile-only {
            display: inherit;
        }
    }
</style>


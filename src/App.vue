<template>
  <div id="app">
    <div class="login" v-if="!loggedIn">
      <Login v-model="loggedIn" />
    </div>
    <div class="app-content flex" v-if="loggedIn">
      <div class="content">
        <app-navbar />
          <router-view  />
      </div>
      <div class="side-nav-container">
        <app-sidenav />
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@/views/Login.vue';

export default {
  name: 'App',
  components: {
    Login
  },
  data(){
    return {
      loggedIn: false
    }
  },
  created(){
    this.$store.commit('setIsMobile');
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

  .side-nav-container {
    width: 18vw;
    border-left: 1px solid $border-color;
    box-sizing: border-box;
    height: 100vh;
  }

  .content {
    width: -webkit-fill-available;
  }

  .fading-view {
    opacity: 1;
    transition: opacity 0.5s;
  }

  .fade-enter {
    opacity: 1;
  }

  .fade-leave {
    opacity: 0;
  }

  // .fading-view:hover {
  //   opacity: 0;
  // }



// .fade-enter-active, .fade-leave-active {
//   transition: opacity .5s;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   opacity: 0;
// }

    @media (max-width: 768px){
        // #app {
        //     width: max-content;
        // }

        .content {
          height: -webkit-fill-available;
        }

        .side-nav {
          display: none;
        }
    }
</style>

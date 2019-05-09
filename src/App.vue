<template>
  <div id="app" class="flex">
    <div class="content">
      <app-navbar />
      <!-- <transition name="fade"> -->
        <router-view  />
      <!-- </transition> -->
    </div>
    <div class="side-nav">
      <app-sidenav />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  // watch: {
  //   $route(){
  //     this.fadeEnter = false;
  //     this.fadeLeave = true;
  //     setTimeout(() => {
  //       this.fadeLeave = false;
  //       this.fadeEnter = true;
  //     }, 500)
  //   }
  // }
}
</script>


<style lang="scss" scoped>
  .side-nav {
    width: 18vw;
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

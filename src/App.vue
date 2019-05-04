<template>
  <div id="app" class="flex">
    <div class="content">
      <app-navbar />
      <router-view/>
    </div>
    <div class="side-nav">
      <app-sidenav />
    </div>
  </div>
</template>

<style lang="scss">
  .side-nav {
    width: 18vw;
  }

  .content {
    width: -webkit-fill-available;
  }
</style>

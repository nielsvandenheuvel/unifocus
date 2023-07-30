<template>
  <div id="app">
    <SideBar />
    <div class="body" :style="{ 'margin-left': sideBarWidth }">
      <router-view />
    </div>
  </div>

</template>

<script>
  import SideBar from '@/components/sidebar/SideBar.vue';
  import { sideBarWidth } from '@/components/sidebar/state';

  export default {
    components: { SideBar },
    setup() {
      return { sideBarWidth };
    },
  };
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Catamaran');
#app {
  font-family: 'Catamaran', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root {
    --bg-color: #f3f5fa;

    --primary-color: #2e3b7e;
    --primary-light-color: #5a6ed1;
    --primary-dark-color: #131c4b;

    --secondary-color: #d6ad60;

    --subtitle-font: 'Century Schoolbook W01', 'Times New Roman', times, serif;
}
.body {
  transition: 0.3s ease;

  padding: 2em;

  float: top;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;

  background-color: var(--bg-color);
}
</style>


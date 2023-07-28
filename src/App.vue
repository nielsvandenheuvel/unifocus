<template>
  <SideBar />
  <div class="body" :style="{ 'margin-left': sideBarWidth }">
    <BreadCrumb />
    <router-view />
  </div>

</template>

<script>
  import SideBar from '@/components/sidebar/SideBar.vue';
  import { sideBarWidth } from '@/components/sidebar/state';
  import BreadCrumb from '@/components/BreadCrumb.vue';

  export default {
    components: { SideBar, BreadCrumb },
    setup() {
      return { sideBarWidth };
    },
  };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

:root {
    --bg-color: white;

    --primary-color: #2e3b7e;
    --primary-light-color: #5a6ed1;
    --primary-dark-color: #1b286b;

    --secondary-color: #d6ad60;
}

.body {
  transition: 0.3s ease;
  margin: 0 0.5em 0 0.5em;

  background-color: #f3f5fa;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
router-view {
  background-color: #f3f5fa;
}
</style>


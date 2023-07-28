<template>
      <ul class="breadcrumb">
          <li v-for="page in route.path.split('/').slice(1)">
            <a :href="route.path" :style="{ 'pointer-events': page === route.path.split('/').splice(-1).join() ? 'none' : 'auto' }">{{ page.charAt(0).toUpperCase() + page.substring(1) }}</a>
          </li>
      </ul>
</template>

<script>
    import { sideBarWidth } from './sidebar/state';
    import { useRoute } from 'vue-router';

    export default {
        setup() {
          const route = useRoute();
          return { sideBarWidth, route };
        },
    };
</script>

<style scoped>
/* Style the list */
ul.breadcrumb {
  padding: 10px 16px;
  list-style: none;
  color: black;
}

/* Display list items side by side */
ul.breadcrumb li {
  display: inline;
  font-size: 12px;
}

/* Add a slash symbol (/) before/behind each list item */
ul.breadcrumb li+li:before {
  padding: 8px;
  color: black;
  content: "\007c";
}

/* Add a color to all links inside the list */
ul.breadcrumb li a {
  color: black;
  text-decoration: none;
}

/* Add a color on mouse-over */
ul.breadcrumb li a:hover {
  color: var(--secondary-color);
}
</style>
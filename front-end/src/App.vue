<template>
  <NavBar />
  <div class="page-wrap">
    <router-view :user="user" />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return {
      user: '12345',
    }
  },
}
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeRouteEnter(to, from, next) {
    console.log(to, from, next)
    next()
  },
  components: {

  },
  data() {
    return {
      islogout: false
    }
  },
  computed: {

  },
  watch: {

  },
  created() { },
  mounted() { },
  methods: {

  }
}
</script>

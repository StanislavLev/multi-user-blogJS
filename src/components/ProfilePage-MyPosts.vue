<template>
  <div>
    <h2 class="text-center">Welcome to My Posts Page, {{username}}</h2>
  </div>
</template>

<script>

export default {
  name: 'ProfilePage-MyPosts',
  computed: {
    username(){
      return this.$store.state.username;
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

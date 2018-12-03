<template>
  <div>
    <nav-bar></nav-bar>
    <h2 class="text-center">{{post.title}}</h2>
    <article>
      {{post.post}} 
    </article>
  </div>
</template>

<script>

import NavBar    from '@/components/NavBar.vue';

export default {


  name: 'Post',
  components: {
    'nav-bar': NavBar,
  },
  computed: {
    post() {
      return this.$store.state.postsAndAvatar.find(obj => { return obj.post._id == this.$route.params.id }).post;
    }
  }
}

</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

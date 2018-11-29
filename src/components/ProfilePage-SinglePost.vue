<template>
  <div>
    <h2 class="text-center">{{post.title}}</h2>
    <h2 class="text-center">{{post._id}}</h2>
    <article>
      {{post.post}} 
    </article>
  </div>
</template>

<script>

export default {

  name: 'ProfilePage-SinglePost',
  data() {
    return{
      post: this.$store.state.userPosts.find(obj => { return obj._id == this.$route.params.id })
    }
  }
}

</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

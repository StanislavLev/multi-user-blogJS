<template>
  <div>
    <h2 class="text-center">{{post.title}}</h2>
    <h2 class="text-center">{{post._id}}</h2>
    <article>
      {{post.post}} 
    </article>
    <button type="button" class="btn btn-primary">Edit post</button>
    <button type="button" class="btn btn-danger" @click="deletePost">Delete post</button>
  </div>
</template>

<script>

import axios  from 'axios';

export default {

  name: 'ProfilePage-SinglePost',
  data() {
    return{
      post: this.$store.state.userPosts.find(obj => { return obj._id == this.$route.params.id })
    }
  },
  methods: {
    deletePost(){
      console.log(this.post._id);
      axios.delete('profile/post/' + this.post._id)
      .then(() => {
        this.$router.push('/profile/myposts');
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
}

</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

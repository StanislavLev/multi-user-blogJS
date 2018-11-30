<template>
  <div>
    <h2>Edit Post</h2>
    {{post}}
    <form @submit.prevent="editPost">
      <h3>Title:</h3>
      <input type="text" name="title" v-model="post.title" />
      <h3>Post:</h3>
      <textarea name="post" rows="10" cols="100" v-model="post.post" />
      <button type="submit" class="btn btn-primary">Edit post</button>
    </form>
  </div>
</template>

<script>

import axios  from 'axios';

export default {
  name: 'EditPost',
  computed: {
    post: {
      get () {
        return this.$store.state.userPosts.find(obj => { return obj._id == this.$route.params.id });
      },
      set (value) {
        this.$store.commit('editPost', value);
      }
    }
  },
  methods: {
    editPost(){
      axios.put('/profile/post/'+this.post._id , {post_title: this.post.title, post_text: this.post.post})
      .then((response) => {
        this.$router.push('/profile/post/' + this.post._id);
      })  
      .catch((error) => {this.msg = "Error: " + error})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

button {
  display: block;
}

</style>

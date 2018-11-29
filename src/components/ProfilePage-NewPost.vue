<template>
  <div>
    <h2>New Post</h2>
    <form action="/profile/newpost" method="post">
      <h3>Title:</h3>
      <input type="text" name="title" placeholder="Post Title" v-model="post_title" />
      <h3>Post:</h3>
      <textarea name="post" rows="10" cols="100" placeholder="Post Text" v-model="post_text" />
      <button type="button" class="btn btn-info" @click="createNewPost">Create a new post</button>
    </form>
  </div>
</template>

<script>

import axios  from 'axios';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'NewPost',
  components: {
    'nav-bar': NavBar
  },
  data () {
    return {
      msg: '',
      post_title: '',
      post_text: ''
    }
  },
  computed: {
    username(){
      return this.$store.state.username;
    }
  },
  methods: {
    createNewPost(){
      axios.post('/profile/newpost', {post_title: this.post_title, post_text: this.post_text})
      .then((response) => {
        
        this.$router.push('/profile');
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

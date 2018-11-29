<template>
  <div>
    <h2 class="text-center">Welcome to My Posts Page, {{username}}</h2>
    <div v-for="item in userPosts">
      <router-link :to="'/profile/post/' + item._id"><h4>{{item.title}}</h4></router-link> 
    </div>
  </div>
</template>

<script>

import axios     from 'axios';

export default {
  name: 'ProfilePage-MyPosts',
  computed: {
    username(){
      return this.$store.state.username;
    },
    userPosts(){
      return this.$store.state.userPosts;
    }
  },
  created(){
    axios.get('/profile/myposts')
    .then((response) => {
      this.$store.state.userPosts = response.data;
    })  
    .catch((error) => {
      console.log(error);
    })
  }
}

</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

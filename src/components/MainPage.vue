<template>
  <div>
    <nav-bar></nav-bar>
    <div v-if="alertMsg" class="alert alert-primary" role="alert" >
      {{alertMsg}}
    </div>
    <h2 class="text-center">Welcome to Home Page, {{username}}</h2>
    <div class="posts-container">
      <div v-for="(item, index) in postsAndAvatar">
        <router-link :to="`/post/${item.post._id}`"><post-card :index="index"></post-card></router-link>
      </div>
    </div>  
      
  </div>
</template>

<script>

import NavBar    from '@/components/NavBar.vue';
import PostCard  from '@/components/PostCard.vue';
import axios     from 'axios';

export default {
  name: 'MainPage',
  components: {
    'nav-bar': NavBar,
    'post-card': PostCard
  },
  computed: {
    username(){
      return this.$store.state.username;
    },
    postsAndAvatar(){
      return this.$store.state.postsAndAvatar;
    },
    alertMsg(){
      return this.$store.state.alertMsg;
    }
  },
  created(){
    axios.get('/posts')
    .then((response) => {
      this.$store.state.postsAndAvatar = response.data;
    })  
    .catch((error) => {
      console.log(error);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.posts-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.posts-container > * {
  margin: 5px;
}


</style>

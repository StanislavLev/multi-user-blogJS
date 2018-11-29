<template>
  <div>
    <div v-if="alertMsg" class="alert alert-primary" role="alert" >
      {{alertMsg}}
    </div>
    <nav-bar></nav-bar>
    <h2 class="text-center">Welcome to Profile Page, {{username}}</h2>
    <pro-nav-bar></pro-nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>

import axios  from 'axios';
import NavBar from '@/components/NavBar.vue';
import ProfilePageNavBar from '@/components/ProfilePage-NavBar.vue';

export default {
  name: 'Profile',
  data(){
    return {
      avatarImg: null,
      errMsg: ''
    }
  },
  components: {
    'nav-bar': NavBar,
    'pro-nav-bar': ProfilePageNavBar
  },
  computed: {
    username(){
      return this.$store.state.username;
    },
    alertMsg(){
      return this.$store.state.alertMsg;
    },
    avatarURL() {
      return this.$store.state.avatarURL;
    }
  },
  created(){
    this.$store.state.username = '';
    axios.post('/profile')
    .then((response) => {
      if(response.data.username){
        this.$store.state.username = response.data.username;
        this.$store.state.avatarURL = response.data.avatarURL;
      }
      else {
        this.$store.state.alertMsg = response.data.message;
        setTimeout(()=> {
          this.$store.state.alertMsg = '';
          this.$router.push('/login')
        }, 2000);
        
      }
    })  
    .catch((error) => {console.log(error);})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.alert {
  width: 400px;
  position: fixed;
  top: 0;
  right: calc(50% - 150px);
}
</style>

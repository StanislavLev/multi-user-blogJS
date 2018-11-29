<template>
  <div>
    <nav-bar></nav-bar>
    <h1>{{ msg }}</h1>
    <form action="#" method="POST" @submit.prevent="login">
      <div class="form-group">
        <label for="loginUsername">Username</label>
        <input type="text" class="form-control" id="loginUsername" placeholder="Username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="loginPassword">Password</label>
        <input type="password" class="form-control" id="loginPassword" placeholder="Password" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue';
import axios  from 'axios';

export default {
  name: 'Login',
  components: {
    'nav-bar': NavBar
  },
  data () {
    return {
      msg: 'Welcome Guest, please login!',
      password: '',
      username: ''
    }
  },
  methods: {
    login(){
      axios.post('/login', {username: this.username, password: this.password})
      .then((response) => {
        this.$store.state.alertMsg = response.data.message;
        setTimeout(()=> {this.$store.state.alertMsg = '';}, 2000);
        this.$store.state.username = response.data.username;
        this.$router.push('/profile');
      })  
      .catch((error) => {this.msg = "Error: " + error})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

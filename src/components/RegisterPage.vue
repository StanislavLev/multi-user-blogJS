<template>
  <div>
    <nav-bar></nav-bar>
    <h1 class="text-center">{{ msg }}</h1>
    <form  @submit.prevent="register">
      <div class="form-group">
        <label for="regUsername">Username</label>
        <input type="text" class="form-control" id="regUsername" placeholder="Username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="regPassword">Password</label>
        <input type="password" class="form-control" id="regPassword" placeholder="Password" v-model="password" required>
      </div>
      <div class="form-group">
        <label for="regConfirmPassword">Confirm Password</label>
        <input type="password" class="form-control" id="regConfirmPassword" placeholder="Password" v-model="confirmPassword" required>
      </div>
      <div class="form-group">
        <label for="regUserEmail">Email address</label>
        <input type="email" class="form-control" id="regUserEmail" placeholder="user@example.com" v-model="email" required>
        <small class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue';
import axios  from 'axios';

export default {
  name: 'Register',
  components: {
    'nav-bar': NavBar
  },
  data(){
    return {
      msg: 'Register form',
      password: '',
      username: '',
      confirmPassword: '',
      email: ''
    }
  },
  methods:{
    register(){
      axios.post('/register', {
        username: this.username, 
        password: this.password, 
        confirmPassword: this.confirmPassword,
        email: this.email
      })
      .then((response) => {
        if(response.data.username){
          this.$store.state.username = response.data.username;
          this.$router.push('/profile');
        }
        else {
          this.$store.username = '';
          this.msg = response.data.message;
        }
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

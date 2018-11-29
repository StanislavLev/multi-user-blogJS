<template>
  <div>
    <nav class="s-navbar">
      <div class="s-nav-group">
        <router-link class="s-nav-item" to="/">Home <i class="fas fa-home"></i></router-link>
      </div>
      <div class="s-nav-group">  
        <router-link class="s-nav-item" v-if="!username" to="/register">Join <i class="fas fa-user-plus"></i></router-link>
        <router-link class="s-nav-item" v-if="!username" to="/login">Sign In <i class="fas fa-sign-in-alt"></i></router-link>
        <router-link class="s-nav-item" v-if="username" to="/profile">Profile <i class="far fa-user-circle"></i></router-link>
        <a  class="s-nav-item" v-if="username" @click.prevent="logout">Sign Out <i class="fas fa-sign-out-alt"></i></a>
        <span id="nav-username" class="text-center" v-if="username">{{username}}</span>
        <img id="img-avatar"  v-if="username" :src="this.avatarURL" alt="avatar image" />
      </div>
    </nav>
  </div>
</template>

<script>

import axios  from 'axios';

export default {
  name: 'NavBar',
  computed: {
    username(){
      return this.$store.state.username;
    },
    avatarURL() {
      return this.$store.state.avatarURL;
    }
  },
  methods: {
    logout(){
      axios.post('/logout')
      .then((response) => {
          this.$store.state.username = '';
          this.$store.state.alertMsg = response.data.message;
          console.log(response.data.message);
          setTimeout(()=> {this.$store.state.alertMsg = '';}, 3000);
          this.$router.push('/');
      })  
      .catch((error) => {console.log(error);})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


a {
 color: inherit;
}

a:hover {
 text-decoration: none;
}

i{
  padding: 0 2px;
}

.s-navbar{
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(205, 133, 63);
  color: rgb(40,23,0);
  padding: 3px;
  font-size: 1.2rem;
}

.s-nav-group {
  display: flex;
}

.s-nav-group > *{
  display: flex;
	align-items: center;
  height: 64px;
  padding: 0 10px;
}


.s-nav-item {
  cursor: pointer;
}

.s-nav-item:hover {
  background-color: rgb(190, 125, 55);
}

#img-avatar {
  border-radius: 50%;
  padding: 0;
}

#nav-username {
  padding-right: 2px;
}

</style>

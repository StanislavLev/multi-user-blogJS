<template>
  <div>
    <nav class="s-navbar">
      <router-link class="s-nav-item" to="/profile/myposts">My posts</router-link>
      <router-link class="s-nav-item" to="/profile/newpost">Create a new post</router-link>
      <router-link class="s-nav-item" to="/profile/update">Update profile</router-link>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'ProfilePage-NavBar',
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

.s-navbar{
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: rgb(40,23,0);
  color: rgb(205, 133, 63);
  padding: 3px;
}

.s-navbar > *{
  display: flex;
	align-items: center;
  height: 48px;
  padding: 0 10px;
}


.s-nav-item {
  cursor: pointer;
}

.s-nav-item:hover, .router-link-active {
  background-color: rgb(80, 46, 0);
}

.alert {
  width: 400px;
  position: fixed;
  top: 0;
  right: calc(50% - 150px);
}
</style>

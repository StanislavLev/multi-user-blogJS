<template>
  <div>
    <form  enctype="multipart/form-data" @submit.prevent="updateAvatar">
      <div class="form-group">
        <label for="updateAvatarImg">Upload Avatar</label>
        <input type="file" class="form-control-file" id="updateAvatarImg" ref="avatarImgFile" @change="onSelectFile" accept="image/jpeg, image/png, image/gif">
        <h4 class="alert alert-danger" v-if="errMsg">{{errMsg}}</h4>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="errMsg.length!=0">Update avatar</button>
    </form>
    <router-view></router-view>
  </div>
</template>

<script>

import axios  from 'axios';

export default {
  name: 'ProfileUpdate',
  data(){
    return {
      avatarImg: null,
      errMsg: ''
    }
  },
  computed: {
    avatarURL() {
      return this.$store.state.avatarURL;
    }
  },
  methods:{
    onSelectFile(){
      const imgFile = this.$refs.avatarImgFile.files[0];
      const allowedImgTypes = ["image/jpeg", "image/png", "image/gif"];
      const MAX_IMG_SIZE = 300000;
      const tooLarge = imgFile.size > MAX_IMG_SIZE;
      this.avatarImg = imgFile;
      if(allowedImgTypes.includes(imgFile.type) && !tooLarge){
        this.errMsg = '';
      }
      else {
        this.errMsg = tooLarge ? `FE: Too large file. Max size is ${MAX_IMG_SIZE/1024}Kb` : "FE: Only .jp(e)g, .png, .gif files are allowed.";
      }
    },
    updateAvatar(){
      const formData = new FormData();
      formData.append('avatarImg', this.avatarImg);
      axios.post('/upload', formData)
      .then((response) => {
        console.log(response);
        this.$store.state.avatarURL = response.data.avatarURL
      })
      .catch((error) => {
        console.log(error);
        this.errMsg = error.response.data.error || '';
      });
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

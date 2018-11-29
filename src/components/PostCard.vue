<template>
  <div class="card">
    <img class="card-img-top" :src="placeHolderImg" alt="Card image cap"/>
    <div class="card-body">
      <h3 class="card-title overflow-ellipsis text-center">{{postsAndAvatar.post.title}}</h3>
      <p class="card-text">{{postsAndAvatar.post.post.substr(0, 200)}}...</p>
    </div>
    <div class="card-footer row">
      <div class="col-4 text-center" >
        <img class="img-avatar" :src="authorAvatar" alt="author's avatar"/>
        <small class="text-muted d-block overflow-ellipsis"><em>{{postsAndAvatar.post.author}}</em></small>
      </div>
      <div class="col-8">
        <div class="time-stamp text-center">
          <small class="text-muted d-block">Created: {{dateCreated}}</small>
          <small class="text-muted d-block">Updated: {{dateCreated}}</small>
        </div>
        <div class="feedback-grid">
          <span>
            <img src="https://emoji.fileformat.info/gemoji/thumbsup.png" alt="Gemoji image for :thumbsup:" style="width:1rem; height:1rem;" />
            <small class="text-muted">17</small>
          </span>
          <span>
            <img src="https://emoji.fileformat.info/gemoji/thumbsdown.png" alt="Gemoji image for :thumbsdown" style="width:1rem;height:1rem;" />
            <small class="text-muted">2</small>
          </span>
          <span>
            <img src="https://emoji.fileformat.info/gemoji/speech_balloon.png" alt="Gemoji image for :speech_balloon" style="width:1rem;height:1rem;"/>
            <small class="text-muted">27</small>
          </span>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>

export default {
  name: 'PostCard',
  props: {
    index: Number
  },
  computed: {
    postsAndAvatar(){
      return this.$store.state.postsAndAvatar[this.index];
    },
    dateCreated() {
      let dateCreated = new Date(this.postsAndAvatar.post.createdAt);
      return `${dateCreated.getMonth()}/${dateCreated.getDate()}/${dateCreated.getFullYear()}`;
    },
    dateUpdated() {
      let dateUpdated = new Date(this.postsAndAvatar.post.updatedAt);
      return `${dateUpdated.getMonth()}/${dateUpdated.getDate()}/${dateUpdated.getFullYear()}`;
    },
    placeHolderImg() {
      return "http://www.placepuppy.net/"+(this.index+1)+"p/200/125";
    },
    authorAvatar() {
      return this.postsAndAvatar.authorAvatar;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card {
  width: 300px;
  box-shadow: 3px 3px 20px 0 #888;
}

.row {
  margin: 0;
  padding: 0;
}

[class^="col-"] {
  padding: 5px;
}

.card-text {
  line-height: 1.2em;
  height: 8.4em;
}

.img-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.time-stamp {
  font-family: "Lucida Console", Monaco, monospace;
}

.feedback-grid {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: space-evenly;
}

.overflow-ellipsis {
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>

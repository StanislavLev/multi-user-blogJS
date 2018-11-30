import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    username: '',
    alertMsg: '',
    postsAndAvatar: [],
    avatarURL: '',
    userPosts: []
  },
  mutations: {
    editPost (state, post) {
      let curPost = state.userPosts.find(obj => { return obj._id == post._id });
      curPost.title = post.title;
      curPost.post = post.post;
    }
  }
});
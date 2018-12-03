import Vue               from 'vue';
import Router            from 'vue-router';
import MainPage          from '@/components/MainPage';
import RegisterPage      from '@/components/RegisterPage';
import LoginPage         from '@/components/LoginPage';
import ProfilePage       from '@/components/ProfilePage';
import NewPost           from '@/components/ProfilePage-NewPost';
import EditPost          from '@/components/ProfilePage-EditPost';
import ProfileUpdate     from '@/components/ProfilePage-Update';
import ProfileMyPosts    from '@/components/ProfilePage-MyPosts';
import ProfileSinglePost from '@/components/ProfilePage-SinglePost';
import Post              from '@/components/Post';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post
    },
    {
      path: '/profile',
      name: 'ProfilePage',
      component: ProfilePage,
      children: [
            {
              path: 'newpost',
              name: 'NewPost',
              component: NewPost
            },
            {
              path: 'editpost/:id',
              name: 'EditPost',
              component: EditPost
            },
            {
              path: 'update',
              name: 'ProfileUpdate',
              component: ProfileUpdate
            },
            {
              path: 'myposts',
              name: 'ProfileMyPosts',
              component: ProfileMyPosts
            },
            {
              path: 'post/:id',
              name: 'ProfileSinglePost',
              component: ProfileSinglePost
            }
            
            
      ]
    }
  ]
})

<template>
  <div class="ui center aligned basic segment">
    <app-header></app-header>
    <h1>Post Edit Page</h1>
    <div class="ui form">
      <div class="field">
        <label class="left">Post Title</label>
        <input type="text" v-model="post.title">
      </div>
      <div class="field">
        <label class="left">Content</label>
        <textarea v-model="post.content"/>
      </div>
      <div class="field">
        <label class="left">Author</label>
        <input type="text" v-model="post.author">
      </div>
    </div>
    <div class="ui hidden divider"></div>
    <div class="ui primary button" @click="handleUpdate">Update</div>
    <div class="ui cancel button" @click="$router.go(-1)">Cancel</div>
  </div>
</template>

<script>
import axios from 'axios';
import Header from '@/components/shared/Header';

export default {
  name: 'Postedit',
  components: {
    AppHeader: Header
  },
  data() {
    return {
      post: {
        id: this.$route.params.id,
        title: '',
        content: '',
        author: ''
      }
    };
  },
  beforeCreate() {
    if (!window.localStorage.getItem('seven_test_auth_token')) {
      this.$router.push({ path: '/' });
    }
  },
  beforeMount() {
    axios
      .get(`https://seven-test-vue.firebaseio.com/posts/${this.post.id}.json`)
      .then(res => {
        this.post.title = res.data.title;
        this.post.content = res.data.content;
        this.post.author = res.data.author;
      })
      .catch(e => console.log(e));
  },
  methods: {
    handleUpdate() {
      axios
        .put(
          `https://seven-test-vue.firebaseio.com/posts/${this.post.id}.json`,
          this.post
        )
        .then(res => {
          this.$router.push({ path: '/posts' });
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<style>
label.left {
  text-align: left;
}
</style>

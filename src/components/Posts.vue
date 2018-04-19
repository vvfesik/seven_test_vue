<template>
  <div class="ui center aligned basic segment">
    <h1>Posts Page</h1>
    <div class="ui primary button" @click="showModal = true">Add New</div>
    <div class="ui hidden divider"></div>
    <div class="ui middle aligned divided list">
      <div class="item" v-for="(post, index) in posts" :key="index">
        <div class="left floated content">
          <p class="ui small header">{{ post.title }}</p>
          <p>by {{ post.author }}</p>
        </div>
        <div class="right floated content">
          <div class="ui icon primary button" @click="handleEdit(post.id)"><i class="edit icon"/></div>
          <div class="ui icon red button" @click="handleDelete(post.id)"><i class="trash icon"/></div>
        </div>
      </div>
    </div>
    <div class="ui dimmer modals page transition" :class="showModal ? 'visible active' : ''">
      <div class="ui fullscreen modal transition" :class="showModal ? 'visible active' : ''">
        <div class="header">Add new post</div>
        <div class="content">
          <div class="ui form">
            <div class="field">
              <label>Post Title</label>
              <input type="text" v-model="newPost.title">
            </div>
            <div class="field">
              <label>Content</label>
              <textarea v-model="newPost.content"/>
            </div>
            <div class="field">
              <label>Author</label>
              <input type="text" v-model="newPost.author">
            </div>
          </div>
        </div>
        <div class="actions">
          <div class="ui approve primary button" @click="handleAddNew">Add</div>
          <div class="ui cancel button" @click="showModal = false">Cancel</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: 'Posts',
  data() {
    return {
      showModal: false,
      newPost: {
        title: '',
        content: '',
        author: ''
      },
      posts: []
    };
  },
  beforeMount() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      axios
        .get('https://seven-test-vue.firebaseio.com/posts.json')
        .then(res => {
          let postsArray = [];
          for (const key in res.data) {
            postsArray.push({ ...res.data[key], id: key });
          }
          this.posts = postsArray;
        })
        .catch(e => console.log(e));
    },
    handleEdit(id) {
      router.push({
        path: `/postedit/${id}`
      });
    },
    handleDelete(id) {
      axios
        .delete(`https://seven-test-vue.firebaseio.com/posts/${id}.json`)
        .then(res => {
          this.fetchPosts();
        })
        .catch(e => console.log(e));
    },
    handleAddNew() {
      axios
        .post('https://seven-test-vue.firebaseio.com/posts.json', this.newPost)
        .then(res => {
          this.newPost = {
            title: '',
            content: '',
            author: ''
          };
          this.showModal = false;
          this.fetchPosts();
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<style>
.item .left.floated.content {
  text-align: left;
}
</style>

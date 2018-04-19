<template>
  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <h1>Log in to your account</h1>
      <form class="ui large form" @submit.prevent="handleSubmit" :class="errorMessage ? 'error' : ''">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="userlogin" placeholder="Login" v-model="userLogin">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="userpassword" placeholder="Password" v-model="userPassword">
            </div>
          </div>
          <button type="submit" class="ui fluid large primary submit button">Login</button>
        </div>
        <div class="ui error message">
          <p>{{ errorMessage }}</p>
        </div>
      </form>
      <div class="ui message">Login: seven | Password: test</div>
    </div>
  </div>
</template>

<script>
import router from '../router';

export default {
  name: 'Login',
  data() {
    return {
      userLogin: '',
      userPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    handleSubmit() {
      this.errorMessage = '';
      if (this.userLogin === 'seven' && this.userPassword === 'test') {
        router.push({ path: '/posts' });
      } else {
        this.errorMessage = 'Please enter valid credentials';
      }
    }
  }
};
</script>

<style scoped>
.grid {
  height: 100%;
}
.column {
  max-width: 400px;
}
</style>

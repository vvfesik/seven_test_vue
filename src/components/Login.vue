<template>
  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <h1>Log in to your account</h1>
      <form class="ui large form" @submit.prevent="handleSubmit" :class="errorMessage ? 'error' : ''">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="useremail" placeholder="Email" v-model="user.email">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="userpassword" placeholder="Password" v-model="user.password">
            </div>
          </div>
          <button type="submit" class="ui fluid large primary submit button" 
            :class="this.user.email && this.user.password ? '' : 'disabled'">Login</button>
        </div>
        <div class="ui error message">
          <p>{{ errorMessage }}</p>
        </div>
      </form>
      <div class="ui message">Email: seven@test.com | Password: test</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      errorMessage: ''
    };
  },
  beforeCreate() {
    if (window.localStorage.getItem('seven_test_auth_token')) {
      this.$router.push({ path: '/posts' });
    }
  },
  methods: {
    handleSubmit() {
      this.errorMessage = '';
      if (this.validateEmail(this.user.email) && this.user.password) {
        axios
          .post(
            'https://fesik.pp.ua/directus/api/1.1/auth/request-token',
            this.user
          )
          .then(res => {
            if (res.data.success) {
              window.localStorage.setItem(
                'seven_test_auth_token',
                res.data.data.token
              );
              this.$router.push({ path: '/posts' });
            } else {
              this.errorMessage = res.data.error.message;
            }
          })
          .catch(e => console.log(e));
      } else {
        this.errorMessage = 'Please enter valid credentials';
      }
    },
    validateEmail(email) {
      const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
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

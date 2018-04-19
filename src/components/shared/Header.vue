<template>
  <div class="ui fixed wide menu">
    <div class="right item">
      <a class="ui button" @click="logout">Log out</a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      window.localStorage.removeItem('seven_test_auth_token');
      this.$router.push({ path: '/' });
    }
  }
};
</script>

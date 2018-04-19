<template>
  <div id="app" class="ui centered container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  height: calc(100% - 2rem);
  padding-top: 2rem;
}
</style>

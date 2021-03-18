<template>
  <div>
    <h1 id="header">BEST FOOD BY SHARMA - MICHELIN STAR</h1>
    <ul>
      <li><router-link to="/" exact>Home</router-link></li>
      <li><router-link to="/orders" exact>Orders</router-link></li>
      <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
//import PageContent from "./components/PageContent.vue";

export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
#header {
  background-color: aqua;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  color: brown;
  text-align: center;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
</style>

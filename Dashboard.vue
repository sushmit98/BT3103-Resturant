<template>
  <div id="app">
    <barchart></barchart>
    <h1 id="dashboard">Third Party API's Line</h1>
    <callApi></callApi>
  </div>
</template>

<script>
import BarChart from "./charts/BarChart.vue";
import CallApi from "./CallApi.js";
export default {
  components: {
    barchart: BarChart,
    callApi: CallApi,
  },
};
</script>

<style>
#dashboard {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

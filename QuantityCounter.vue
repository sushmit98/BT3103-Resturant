<template>
  <div id="counter">
    <button v-on:click="decrement">-</button>
    {{ count }}
    <button v-on:click="increment">+</button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment: function() {
      if (this.count >= 10) {
        alert("You cannot buy more than 10 items");
      } else {
        this.count++;
      }
      this.$emit("counter", this.item, this.count);
    },
    decrement: function() {
      if (this.count > 0) {
        this.count--;
      } else {
        this.count = 0;
      }
      this.$emit("counter", this.item, this.count);
    }
  }
};
</script>

<style scoped>
#counter {
  font-family: "Avenir", Arial, Helvetica, sans-serif;
  text-align: center;
  color: brown;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>

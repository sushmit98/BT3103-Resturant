<template>
  <div>
    Menu:
    <br />
    <ul>
      <li v-for="item in itemsSelected" v-bind:key="item[0]">
        {{ item[0] }} x {{ item[1] }}
      </li>
    </ul>
    <button
      v-on:click="
        findTotal();
        sendOrder();
      "
    >
      Calculate Total
    </button>
    <p v-if="this.subtotal > 0">Subotal: ${{ this.subtotal }}</p>
    <p v-if="this.subtotal > 0">
      Total: ${{ Number(this.subtotal * 1.07).toFixed(2) }}
    </p>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  props: {
    itemsSelected: {
      type: Array,
    },
  },
  data() {
    return {
      subtotal: 0,
    };
  },
  methods: {
    findTotal: function() {
      if (this.itemsSelected.length > 0) {
        for (let i = 0; i < this.itemsSelected.length; i++) {
          this.subtotal += this.itemsSelected[i][1] * this.itemsSelected[i][2];
        }
        return this.subtotal;
      }
    },
    sendOrder: function() {
      var items = {
        "Prawn omelette": {
          name: "Prawn omelette",
          count: 0,
        },
        "Dry Beef Hor Fun": {
          name: "Dry Beef Hor Fun",
          count: 0,
        },
        "Sambal KangKung": {
          name: "Sambal KangKung",
          count: 0,
        },
        "Pork Fried Rice": {
          name: "Pork Fried Rice",
          count: 0,
        },
        "Mapo Tofu": {
          name: "Mapo Tofu",
          count: 0,
        },
        "Cereal Prawn": {
          name: "Cereal Prawn",
          count: 0,
        },
      };

      for (let i = 0; i < this.itemsSelected.length; i++) {
        const current = this.itemsSelected[i];
        const arr = { name: current[0], count: current[1] };
        this.$set(items, current[0], arr);
      }
      database
        .collection("orders")
        .add(items)
        .then(() => location.reload());
    },
  },
};
</script>

<style></style>

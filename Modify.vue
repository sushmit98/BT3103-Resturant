<template>
  <div>
    <ul id="box">
      <li id="style1" v-for="(order, index) in this.datapacket" v-bind:key="index">
        {{order[1].name}} : {{order[1].count}}
        <br />
        <input type="text" placeholder="0" min="0" />
      </li>
    </ul>
    <button v-on:click="updateOrder">Update Order</button>
  </div>
</template>

<script>
import database from "../firebase.js";
export default {
  props: {
    docID: String
  },
  data() {
    return {
      datapacket: [],
      inputs: [],
      values: [],
      copy: []
    };
  },
  methods: {
    fetchItems: function() {
      database
        .collection("orders")
        .doc(this.docID)
        .get()
        .then(snapShot => {
          for (const [key, value] of Object.entries(snapShot.data())) {
            this.datapacket.push([key, value]);
          }
        });
    },
    updateOrder: function() {
      this.inputs = document.getElementsByTagName("input");
      for (var i of this.inputs) {
        this.values.push(i.values);
      }

      this.copy = this.datapacket;

      for (let i = 0; i < this.copy.length; i++) {
        if (this.values[i] != this.copy[i][1].count) {
          database
            .collection("orders")
            .doc(this.docID)
            .update({ count: this.values[i] });
        }
      }

      this.$router.push({ path: "/orders" });
    }
  },
  created() {
    this.fetchItems();
  }
};
</script>

<style scoped>
#foodlist {
  padding: 0;
}

#boxed {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
#box {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}

#style1 {
  text-align: center;
  padding: 10px;
  list-style-type: none;
}
</style>

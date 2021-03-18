<template>
  <div>
    <ul id="boxed">
      <li id="box" v-for="order in orders" v-bind:key="order[0]">
        <ul>
          <li
            id="style1"
            v-for="foodItem in order[1]"
            v-bind:key="foodItem.name"
          >{{ foodItem.name }} : {{ foodItem.count }}</li>
        </ul>
        <button v-bind:id="order[0]" v-on:click="deleteItem($event)">Delete</button>
        <button v-bind:id="order[0]" v-on:click="route($event)">Modify</button>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../firebase.js";
export default {
  data() {
    return {
      orders: []
    };
  },
  methods: {
    fetchItems: function() {
      database
        .collection("orders")
        .get()
        .then(snapShot => {
          let order = [];
          snapShot.docs.forEach(doc => {
            order = [doc.id, doc.data()];
            this.orders.push(order);
          });
        });
    },
    deleteItem: function(event) {
      let doc_id = event.target.getAttribute("id");
      database
        .collection("orders")
        .doc(doc_id)
        .delete();
    },
    route: function(event) {
      let doc_id = event.target.getAttribute("id");
      this.$router.push({ name: "modify", params: { docID: doc_id } });
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

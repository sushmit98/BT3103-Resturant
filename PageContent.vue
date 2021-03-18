<template>
  <div>
    <ul id="itemsList">
      <li v-for="item in items" v-bind:key="item.id">
        <p id="itemName">{{ item.name }}</p>
        <img v-bind:src="item.imageURL" />
        <p id="price">${{ item.price }}</p>
        <quantCount v-bind:item="item" v-on:counter="onCounter"></quantCount>
      </li>
    </ul>
    <basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected"></basket>
  </div>
</template>

<script>
import QuantityCounter from "./QuantityCounter";
import Basket from "./Basket";
import database from "../firebase.js";

export default {
  data() {
    return {
      items: [],
      itemsSelected: [],
    };
  },
  components: {
    quantCount: QuantityCounter,
    basket: Basket,
  },
  methods: {
    onCounter: function(item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        var found = false;
        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];

          if (item_name === item.name && count > 0) {
            found = true;
            this.itemsSelected.splice(i, 1);
            this.itemsSelected.push([item.name, count, item.price]);
          } else if (item_name === item.name && count === 0) {
            found = true;
            this.itemsSelected.splice(i, 1);
          }
        }
        if (found == false && count > 0) {
          this.itemsSelected.push([item.name, count, item.price]);
        }
      }
    },
    fetchItems: function() {
      database
        .collection("menu")
        .get()
        .then((snapShot) => {
          snapShot.docs.forEach((doc) => {
            this.items.push(doc.data());
          });
        });
    },
  },

  created: function() {
    this.fetchItems();
  },
};
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
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
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>

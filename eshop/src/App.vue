<template>
  <div id="app">
    <Header @toggle-cart="toggleCartStatus" @filter-goods="filterGoods" />
    <main>
      <GoodsList @add-to-cart="addToCart" :goods="filteredGoods" />
      <br />
      <Cart
        :makePOSTRequest="makePOSTRequest"
        :getCart="getCart"
        :cartGoods="cartGoods"
        :isVisibleCart="isVisibleCart"
      />
    </main>
  </div>
</template>

<script>
import GoodsList from "./components/GoodsList";
import Header from "./components/Header";
import Cart from "./components/Cart";
const API_URL = "http://localhost:3000";
export default {
  components: {
    GoodsList,
    Header,
    Cart,
  },
  data: () => ({
    goods: [],
    cartGoods: [],
    filteredGoods: [],
    isVisibleCart: false,
  }),
  mounted() {
    this.getGoods();
    this.getCart();
  },
  methods: {
    addToCart(item) {
      console.log(item);
      this.makePOSTRequest(`${API_URL}/addToCart`, item).then(() =>
        this.getCart()
      );
    },
    makeGETRequest(url) {
      return fetch(url).then((data) => data.json());
    },
    makePOSTRequest(url, data) {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((data) => data.json());
    },
    getGoods() {
      this.makeGETRequest(`${API_URL}/catalogData`).then((data) => {
        this.goods = data;
        this.filteredGoods = data;
      });
    },
    getCart() {
      this.makeGETRequest(`${API_URL}/cartData`).then((data) => {
        this.cartGoods = data;
      });
    },
    filterGoods(value) {
      const regexp = new RegExp(value, "i");
      this.filteredGoods = this.goods.filter((good) =>
        regexp.test(good.product_name)
      );
    },
    toggleCartStatus() {
      this.isVisibleCart = !this.isVisibleCart;
    },
  },
};
</script>

<style>
* {
  outline: unset;
}
body {
  margin: unset;
}
header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 5px 8px 0px rgba(34, 60, 80, 0.2);
}
main {
  padding: 20px 5%;
}
.cart-button {
  font-size: 16px;
  padding: 10px 20px;
  border: unset;
  border-radius: 10px;
  background-color: white;
  transition: 0.3s;
  box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
  cursor: pointer;
}
.cart-button:hover {
  color: white;
  background-color: black;
}
.cart-list {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.goods-search,
.search-button {
  height: 100%;
}
.goods-item-image-container {
  width: 100%;
  height: 200px;
}
.cart {
  box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
  padding: 20px;
  width: 800px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  overflow: auto;
}
</style>
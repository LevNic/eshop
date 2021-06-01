<template>
  <header>
    <input v-model="searchValue" type="text" class="goods-search" />
    <button class="search-button" type="button" @click="onClick">Искать</button>
    <button class="cart-button" type="button" @click="$emit('toggle-cart')">
      Корзина
    </button>
  </header>
</template>

<script>
export default {
  data: () => ({
    searchValue: "",
  }),
  methods: {
    onClick() {
      this.$emit("filter-goods", this.searchValue);
    },
  },
  watch: {
    searchValue() {
      this.onClick();
    },
  },
};
</script>
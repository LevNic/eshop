<template>
  <div v-show="isVisibleCart" class="cart">
    Корзина:
    <div class="cart-list"></div>
  </div>
</template>

<script>
export default {
  props: {
    isVisibleCart: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<template>
  <ul>
    <productCard v-for="(product, index) in products" v-bind:key="index" :product="product"/>
  </ul>
</template>

<script>
import ProductCard from "./ProductCard";

export default {
  name: 'ViewList',
  components: {
    productCard: ProductCard
  },
  data() {
    return {
      products: []
    };
  },
  methods: {
    getProducts: function () {
      this.$http
          .get(`${process.env.VUE_APP_API_URL}products`)
          .then(function (data) {
            this.products = data.body;
          });
    }
  },
  created: function () {
    this.getProducts();
  }
};
</script>

<style scoped lang="scss">
@import "../scss/variables.scss";
</style>
<template>
  <SearchBox @search-title="filterTitle"></SearchBox>
  <ProductList :products="displayProducts" :enableDelete="false" :enable-forgive="false"/>
</template>

<script>
import ProductList from "../components/ProductList";
import SearchBox from "../components/SearchBox";

export default {
  name: "Home",
  components: {
    SearchBox,
    ProductList,
  },
  data() {
    return {
      products: [],
      displayProducts:[],
    }
  },
  methods: {
    async getProducts() {
      const res = await fetch('api/products');
      const data = await res.json();
      //console.log(data);
      return data;
    },
    filterTitle(key,domain){
      this.displayProducts=[];
      for (const product of this.products) {
        if(domain==="title"){
          if(product.title.includes(key)){
            this.displayProducts.push(product);
          }
        }
        else if(domain==="owner"){
          if(product.owner.includes(key)){
            this.displayProducts.push(product);
          }
        }
      }
    }
  },
  async created() {
    this.products = await this.getProducts();
    this.displayProducts=this.products;
  },
}
</script>

<style scoped>
@import "../css/bulma.css";
</style>
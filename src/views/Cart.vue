<template>
  <ProductList :products="products" :enableDelete="false" :enableForgive="true" :name="this.name" @forgive-product="forgiveProduct"/>
</template>

<script>
import ProductList from "../components/ProductList";
export default {
  name: "Cart",
  components:{
    ProductList,
  },
  data() {
    return {
      products: [],
      loggedIn: "",
      product:Object,
      name:String,
    };
  },
  methods:{
    async getProducts() {
      const res = await fetch('api/products');
      const data = await res.json();
      const myproducts=[];
      for(const product of data){
        if(product.buyer===localStorage.name){
          myproducts.push(product);
        }
      }
      return myproducts;
    },
    async forgiveProduct(productId){
      for(const k in this.products){
        if(this.products[k].id===productId){
          this.product=this.products[k];
          break;
        }
      }
      this.product.vacant=true;
      this.product.buyer="";
      if (confirm('确定不要该商品了吗？')) {
        const res = await fetch(`api/products/${productId}`, {
          method: 'put',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(this.product)
        })
        if (res.status === 200) {
          this.products = this.products.filter((product) => product.id !== productId)
        } else {
          alert('移除商品失败');
        }
      }

    }
  },
  async created() {
    this.loggedIn = localStorage.loggedIn;
    if (!this.loggedIn) {
      this.$router.push({path: "/login"});
    }
    this.products=await this.getProducts();
    this.name=localStorage.name;
  },
}
</script>

<style scoped>
@import "../css/bulma.css";
</style>
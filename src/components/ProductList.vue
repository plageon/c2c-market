<template>
  <div class="container">
    <div class="section">
      <div class="columns">
        <div v-if="!enableForgive" class="column has-text-centered">
          <h1 class="title" style="color: black;" v-if="!enableDelete">{{name}}最近发布的商品</h1><br>
          <h1 class="title" style="color: black;" v-if="enableDelete">{{name}}最近发布的商品</h1><br>
        </div>
        <div v-if="enableForgive" class="column has-text-centered">
          <h1 class="title" style="color: black;" >{{name}}的购物车</h1><br>
        </div>
      </div>
      <div id="app" class="row columns is-multiline">
        <div v-for="product in products" :key="product.id" class="column is-4">
          <ProductCard :product="product" :enableDelete="enableDelete" :enableForgive="enableForgive" @delete-product="$emit('delete-product',product.id)" @forgive-product="$emit('forgive-product',product.id)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard";
export default {
  name: "ProductList",
  props:{
    products:Array,
    enableDelete:Boolean,
    enableForgive:Boolean,
    name:String,
  },
  data(){
    return{

    }
  },
  components:{
    ProductCard,
  },
  emits:["delete-product",'forgive-product'],
  created() {

  }
}
</script>

<style scoped>

</style>
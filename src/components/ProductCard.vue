<template>
  <!--  <li class="n-card">-->
  <!--    <div class="n-card__media">-->
  <!--      <img src="../assets/images/laptop.jpg"/>-->
  <!--    </div>-->

  <!--    <div class="n-card__text">-->
  <!--      <p class="router-link n-card__title">{{ product.title }}</p>-->
  <!--      &lt;!&ndash; <router-link-->

  <!--        class="router-link n-card__title"-->
  <!--        >{{ product.title }}</router-link-->
  <!--      > &ndash;&gt;-->
  <!--      &lt;!&ndash; <p class="n-card__desc">{{product.desc}}</p> &ndash;&gt;-->
  <!--      <p class="n-card__price">￥{{ product.price }}</p>-->
  <!--    </div>-->
  <!--  </li>-->
  <div class="card large" @dblclick="checkProduct">
    <div class="card-image">
      <figure class="image is-16by9">
        <img src="../assets/images/laptop.jpg" alt="Image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="../assets/logo.png" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4 no-padding">{{ product.title }}</p>
          <p><span class="title is-6"><router-link :to="{path:'/account/'+product.owner }"> {{ product.owner }} </router-link> </span></p>
          <p class="subtitle is-6">￥{{ product.price }}</p>
          <p class="subtitle is-6">{{ product.time }}</p>
          <p class="subtitle is-6">{{ product.desc }}</p>
          <button v-if="enableDelete" class="button is-small is-primary" @click="$emit('delete-product',product.id)" >下架商品</button>
          <button v-if="enableForgive" class="button is-small is-primary" @click="$emit('forgive-product',product.id)">移除商品</button>
        </div>
      </div>
      <div class="content">
        {{ product.content }}
        <div class="background-icon"><span class="icon-twitter"></span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product:Object,
    enableDelete:Boolean,
    enableForgive:Boolean,
  },
  methods:{
    checkProduct(){
      const id=this.product.id;
      //console.log(id);
      this.$router.push(`/products/${id}/detail`);
    },
  },
  emits:["delete-product","forgive-product"],
}
</script>

<style scoped>
@import "../css/bulma.css";
</style>